"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User as UserIcon, Sparkles } from "lucide-react";
import { modalOverlay, modalContent } from "@/app/_styles/animations";
import { useClickOutside } from "../_hooks/useClickOutside";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Static data
const quickPrompts = [
  "What jobs can I get?",
  "How difficult is it?",
  "What skills do I need?",
  "Compare with similar majors",
];

export default function AIAssistant() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [messages] = useState<Message[]>([]);
  const selectedMajor = null;

  const [input, setInput] = useState("");
  const [isTyping] = useState(false);
  // Implement later
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside([modalRef], () => setIsAIOpen(false), isAIOpen);

  useEffect(() => {
    if (isAIOpen) {
      inputRef.current?.focus();
    }
  }, [isAIOpen]);

  if (!isAIOpen)
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAIOpen(true)}
          className="w-17 h-17 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group cursor-pointer"
          aria-label="Open AI Assistant"
        >
          <span className="text-2xl" aria-hidden="true">
            🤖
          </span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Ask AI Assistant
          </div>
        </button>
      </div>
    );

  return (
    <AnimatePresence>
      {isAIOpen && (
        <motion.div
          {...modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-assistant-title"
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            ref={modalRef}
            {...modalContent}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-150 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-7 h-7" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="ai-assistant-title" className="text-xl">
                    AI Career Assistant
                  </h2>
                  {selectedMajor && (
                    <p className="text-sm text-white/80">
                      Analyzing: {selectedMajor.name}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsAIOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              >
                <X
                  className="w-6 h-6"
                  aria-hidden="true"
                  aria-label="Close AI Assistant"
                />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && !isTyping && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles
                      className="w-10 h-10 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl mb-2">
                    Welcome to Your AI Career Assistant!
                  </h3>
                  <p className="text-gray-600">
                    Ask me anything about college majors, career paths, and
                    finding your perfect fit.
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {message.role === "user" ? (
                      <UserIcon className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Bot className="w-5 h-5" aria-hidden="true" />
                    )}
                  </div>
                  <div
                    className={`flex-1 ${message.role === "user" ? "text-right" : ""}`}
                  >
                    <div
                      className={`inline-block max-w-[85%] p-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-gray-100 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length > 0 && (
              <div className="px-6 py-2 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(prompt)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="p-6 border-t border-gray-200"
            >
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
