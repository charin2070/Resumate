// providers/OpenRouterAiProvider.ts

import { IAiProvider, ChatMessage } from '@/types/ai';

export class OpenRouterAiProvider implements IAiProvider {
  name = 'OpenRouter';
  models = [
    'google/gemma-3-4b-it:free',
    'mistralai/mistral-7b-instruct',
    'meta-llama/llama-3-8b-instruct'
  ];
  defaultModel = 'google/gemma-3-4b-it:free';

  private controller: AbortController | null = null;

  async chat({
    messages,
    model = this.defaultModel,
    temperature = 0.7,
    maxTokens = 1024,
    stream = false,
    onStream
  }: {
    messages: ChatMessage[];
    model?: string;
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
    onStream?: (chunk: string) => void;
  }): Promise<ChatMessage> {
    this.controller = new AbortController();

    const body: any = {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    };
    if (stream) body.stream = true;

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      signal: this.controller.signal
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'AI response failed');
    }

    if (stream && onStream) {
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        // разбираем JSONL‑чанки
        buffer.split('\n\n').forEach(line => {
          if (!line.startsWith('data: ')) return;
          const json = JSON.parse(line.replace(/^data: /, ''));
          const delta = json.choices?.[0].delta?.content;
          if (delta) onStream(delta);
        });
      }
      // финальный ответ
      return { role: 'assistant', content: '' };
    }

    // без стриминга
    const json = await res.json();
    return json.choices[0].message;
  }

  abort() {
    this.controller?.abort();
  }
}