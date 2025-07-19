// components/Chat.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useAi } from '@/context/AiContext';
import { ChatMessage } from '@/types/ai';

export default function Chat() {
  const { sendMessage, abort } = useAi();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStreaming(true);
    setCurrentText('');

    await sendMessage({
      messages: [...messages, userMsg],
      stream: true,
      onStream: (chunk) => {
        setCurrentText(prev => prev + chunk);
        // падаун скролл
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
      }
    });

    setStreaming(false);
    setMessages(prev => [...prev, { role: 'assistant', content: currentText }]);
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-2 p-4"
      >
        {messages.map((m, i) => (
          <p key={i} className={m.role === 'assistant' ? 'italic' : ''}>
            <strong>{m.role}:</strong> {m.content}
          </p>
        ))}
        {streaming && (
          <p className="relative">
            <strong>assistant:</strong>{' '}
            <span className="inline-block animate-pulse bg-gray-200 rounded-md">
              {currentText || '…'}
            </span>
          </p>
        )}
      </div>

      <div className="p-4 border-t flex">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded p-2 mr-2"
          rows={2}
          placeholder="Спроси у Gemma…"
        />
        <button
          onClick={handleSend}
          disabled={streaming || !input.trim()}
          className="btn btn-primary mr-2"
        >
          {streaming ? 'Ждём ответ…' : 'Отправить'}
        </button>
        {streaming && (
          <button onClick={abort} className="btn btn-secondary">
            🛑
          </button>
        )}
      </div>
    </div>
  );
}
