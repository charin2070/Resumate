// types/ai.ts

export interface IAiProvider {
  name: string;
  models: string[];
  defaultModel?: string;

  chat(options: {
    messages: ChatMessage[];
    model?: string;
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
    onStream?: (chunk: string) => void;
  }): Promise<ChatMessage>;

  abort?: () => void;
}

  
  export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
  }
  