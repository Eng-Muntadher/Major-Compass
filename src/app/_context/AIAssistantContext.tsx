// This context allows us to use the AI assistant in differetnt parts of the app with the same state

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { sendMessage } from "@/app/actions/aiActions";

// AI message structure
interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIAssistantContextType {
  isAIOpen: boolean;
  setIsAIOpen: (open: boolean) => void;
  messages: Message[];
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  isTyping: boolean;
  sendMessageToAI: (messageText: string) => Promise<void>;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(
  undefined,
);

export function AIAssistantProvider({ children }: { children: ReactNode }) {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessageToAI = async (messageText: string) => {
    if (!messageText.trim() || isTyping) return;

    // Add user message to chat
    const userMessage: Message = { role: "user", content: messageText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    // Open modal if not already open
    setIsAIOpen(true);

    try {
      const response = await sendMessage(updatedMessages);

      if (response.success && response.message) {
        const assistantMessage: Message = {
          role: "assistant",
          content: response.message,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              response.message ||
              "Sorry, I encountered an error. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AIAssistantContext.Provider
      value={{
        isAIOpen,
        setIsAIOpen,
        messages,
        setMessages,
        isTyping,
        sendMessageToAI,
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error("useAIAssistant must be used within AIAssistantProvider");
  }
  return context;
}
