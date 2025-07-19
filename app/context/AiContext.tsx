// context/AiContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import { IAiProvider, ChatMessage } from '@/types/ai';
import { OpenRouterAiProvider } from '@/app/providers/OpenRouterAiProvider';

type AiContextType = {
  provider: IAiProvider;
  sendMessage: (opts: {
    messages: ChatMessage[];
    stream?: boolean;
    onStream?: (chunk: string) => void;
  }) => Promise<ChatMessage>;
  abort: () => void;
};

const AiContext = createContext<AiContextType | null>(null);

export const AiProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [provider] = useState<IAiProvider>(new OpenRouterAiProvider());

  const sendMessage = async ({
    messages,
    stream,
    onStream
  }: {
    messages: ChatMessage[];
    stream?: boolean;
    onStream?: (chunk: string) => void;
  }) => {
    return provider.chat({ messages, stream, onStream });
  };

  const abort = () => provider.abort?.();

  return (
    <AiContext.Provider value={{ provider, sendMessage, abort }}>
      {children}
    </AiContext.Provider>
  );
};

export const useAi = () => {
  const ctx = useContext(AiContext);
  if (!ctx) throw new Error('useAi must be used within AiProviderWrapper');
  return ctx;
};
