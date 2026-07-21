import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";
import { playTapSound, playScanSound, playSuccessChime, playWarningSound } from "../utils/audio";

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Olá! Sou o seu Assistente Virtual de Nutrição. 🍉\n\nPosso ajudar a responder a perguntas sobre alimentos, benefícios nutricionais, dietas saudáveis ou dar sugestões para os seus objetivos de saúde. \n\nO que gostaria de saber hoje?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "A banana faz bem para diabéticos?",
    "Que frutas têm mais Vitamina C?",
    "Quais os benefícios da fuba de bombo?",
    "O que comer para ganhar massa muscular?",
    "Como reduzir a tensão arterial alta?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setError(null);
    playTapSound();
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Play a brief thinking/scanner sound
    playScanSound();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6), // Send last 6 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na comunicação com o servidor de IA.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      playSuccessChime();
    } catch (err: any) {
      console.error(err);
      setError("Não foi possível obter resposta da IA. Verifique se a sua chave API do Gemini está configurada.");
      playWarningSound();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[600px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" id="ai-assistant-container">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 bg-emerald-700 text-white">
        <div className="p-2 bg-emerald-600/50 rounded-lg">
          <Bot size={24} className="text-orange-300" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">Nutricionista IA</h2>
          <p className="text-xs text-emerald-100 flex items-center gap-1">
            <Sparkles size={12} className="text-amber-300 animate-pulse" />
            Baseado em Gemini 3.5 Flash
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                  msg.sender === "user" ? "bg-orange-500" : "bg-emerald-600"
                }`}
              >
                {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div>
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-orange-500 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-200/60 rounded-tl-none shadow-xs"
                  }`}
                >
                  {msg.text}
                </div>
                <p className="text-[10px] text-gray-400 mt-1 px-1">
                  {msg.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs flex items-start gap-2 max-w-lg mx-auto">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length === 1 && (
        <div className="px-6 py-3 bg-slate-50 border-t border-gray-100 overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-100 rounded-full transition-colors whitespace-nowrap shrink-0"
              id={`quick-prompt-${idx}`}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex items-center gap-2 p-4 bg-white border-t border-gray-100"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte sobre qualquer alimento ou nutriente..."
          className="flex-1 px-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-xl text-sm text-gray-800 outline-none transition-all"
          disabled={loading}
          id="ai-chat-input"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-emerald-600 cursor-pointer flex items-center justify-center shrink-0"
          id="ai-chat-send-btn"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
