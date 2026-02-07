"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User as UserIcon, Sparkles } from "lucide-react";
import { modalOverlay, modalContent } from "@/app/_styles/animations";
import { useClickOutside } from "../_hooks/useClickOutside";
import { useAIAssistant } from "../_context/AIAssistantContext";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

// Static data (multi-language)
const quickPromptsData = {
  en: [
    "How to pick a career?",
    "Is a medicine career good for me?",
    "Is engineering hard?",
  ],
  ar: [
    "كيف أختار مساري المهني؟",
    "هل دراسة الطب مناسبة لي؟",
    "هل الهندسة صعبة؟",
  ],
};

const translations = {
  en: {
    assistantTitle: "AI Career Assistant",
    welcomeTitle: "Welcome to Your AI Career Assistant!",
    welcomeDescription:
      "Ask me anything about college majors, career paths, and finding your perfect fit.",
    inputPlaceholder: "Ask me anything...",
    openAssistantLabel: "Open AI Assistant",
    openAssistantTooltip: "Ask AI Assistant",
    closeAssistantLabel: "Close AI Assistant",
    hintMessage: "Try my AI assistant here",
  },
  ar: {
    assistantTitle: "مساعد المسار المهني بالذكاء الاصطناعي",
    welcomeTitle: "مرحبًا بك في مساعدك المهني بالذكاء الاصطناعي!",
    welcomeDescription:
      "اطرح أي سؤال حول التخصصات الجامعية، المسارات المهنية، وإيجاد الأنسب لك.",
    inputPlaceholder: "اسألني أي شيء...",
    openAssistantLabel: "افتح مساعد الذكاء الاصطناعي",
    openAssistantTooltip: "اطرح سؤالًا على مساعد الذكاء الاصطناعي",
    closeAssistantLabel: "أغلق مساعد الذكاء الاصطناعي",
    hintMessage: "جرب مساعد الذكاء الاصطناعي هنا",
  },
};

export default function AIAssistant() {
  const params = useParams();
  const lang = params.lang as "en" | "ar";
  const isEnglish = lang === "en";
  const t = translations[lang] || translations.en;

  const { isAIOpen, setIsAIOpen, messages, isTyping, sendMessageToAI } =
    useAIAssistant();

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside([modalRef], () => setIsAIOpen(false), isAIOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (!isTyping) inputRef.current?.focus();
  }, [messages, isTyping, isAIOpen]);

  useEffect(() => {
    if (isAIOpen) inputRef.current?.focus();
  }, [isAIOpen]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (textToSend) {
      setInput("");
      await sendMessageToAI(textToSend);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    handleSendMessage(prompt);
  };

  useEffect(() => {
    if (isAIOpen) return;

    const timer = setTimeout(() => {
      toast(
        <div className="flex items-center gap-2 text-sm">
          <span>🤖</span>
          <span className="font-medium">{t.hintMessage}</span>
        </div>,
        {
          id: "ai-hint",
          duration: 5000,
          position: "bottom-right",
          style: {
            background: "linear-gradient(to right, #2563eb, #7c3aed)",
            color: "#fff",
            borderRadius: "9999px",
            padding: "10px 16px",
            marginBottom: "5.75rem",
            boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)",
            fontSize: "0.875rem",
          },
        },
      );
    }, 9000);

    return () => clearTimeout(timer);
  }, [isAIOpen, t]);

  const quickPrompts = quickPromptsData[lang] || quickPromptsData.en;

  return (
    <>
      {/* Floating Button */}
      {!isAIOpen && (
        <div
          className={`fixed bottom-6 z-40 ${isEnglish ? "right-6" : "left-6"}`}
        >
          <button
            onClick={() => setIsAIOpen(true)}
            className="w-17 h-17 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group cursor-pointer"
            aria-label={t.openAssistantLabel}
          >
            <span className="text-2xl" aria-hidden="true">
              🤖
            </span>
            <div
              className={`absolute bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${isEnglish ? "right-full mr-3" : "left-full ml-3"}`}
            >
              {t.openAssistantTooltip}
            </div>
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence mode="wait">
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
                      {t.assistantTitle}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setIsAIOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                  aria-label={t.closeAssistantLabel}
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 overscroll-y-contain">
                {messages.length === 0 && !isTyping && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles
                        className="w-10 h-10 text-blue-600"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl mb-2">{t.welcomeTitle}</h3>
                    <p className="text-gray-600">{t.welcomeDescription}</p>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user"
                        ? isEnglish
                          ? "flex-row-reverse"
                          : ""
                        : isEnglish
                          ? ""
                          : "flex-row-reverse"
                    }`}
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
                      className={`flex-1 ${
                        message.role === "user"
                          ? "text-right"
                          : isEnglish
                            ? ""
                            : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block max-w-[85%] p-4 rounded-2xl ${
                          message.role === "user"
                            ? "bg-blue-600 text-white rounded-tr-none"
                            : "bg-gray-100 text-gray-800 rounded-tl-none"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div
                    className={`flex ${isEnglish ? "" : "flex-row-reverse"} gap-3`}
                  >
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5" aria-hidden="true" />
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
              {messages.length === 0 && (
                <div className="px-6 py-2 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickPrompt(prompt)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-6 border-t border-gray-200"
              >
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder={t.inputPlaceholder}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
