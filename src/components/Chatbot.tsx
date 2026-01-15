import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Navigation as NavIcon, Phone, Mail, Volume2, VolumeX, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useSiteContent } from '@/contexts/SiteContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { MCPClient } from '@/lib/mcp-client';
import { useTextToSpeech } from '@/hooks/use-tts';

interface Message {
  role: 'user' | 'bot' | 'system';
  content: string;
  toolCall?: string | null;
  toolResult?: any;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { content } = useSiteContent();
  const { language } = useLanguage();
  const { chatbot } = content;

  const { speak, cancel: cancelSpeech, toggleMute, isMuted, supported: ttsSupported } = useTextToSpeech({ language });
  const hasSpokenWelcome = useRef(false);

  // Initialize MCP client for navigation tools
  const mcpClient = new MCPClient(language, content);

  // Stop speech when closing chat
  useEffect(() => {
    if (!isOpen) {
      cancelSpeech();
    } else if (!hasSpokenWelcome.current) {
      // Speak welcome message on first open
      // We use a small timeout to ensure the voice is ready and it feels natural
      setTimeout(() => {
        speak(chatbot.greeting);
      }, 500);
      hasSpokenWelcome.current = true;
    }
  }, [isOpen, cancelSpeech, speak, chatbot.greeting]);

  // Load messages from persistent session (shared across tabs)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem('bohr_chat_messages');
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {
      // ignore parse errors and fall back to fresh session
    }

    // New session: show initial greeting
    setMessages([{ role: 'bot', content: chatbot.greeting }]);
  }, [chatbot.greeting]);

  // Persist messages for session continuity across reloads/tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('bohr_chat_messages', JSON.stringify(messages));
    } catch {
      // ignore storage errors
    }
  }, [messages]);

  // Clear API error when language or content changes
  useEffect(() => {
    setApiError(null);
  }, [language, content]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setApiError(null);
    cancelSpeech(); // Stop any current speech

    // Clear any existing debounce
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Add user message locally
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Build conversation history (last 10 messages)
      // Convert 'bot' to 'assistant' for OpenRouter API
      const history = messages.slice(-10).map(msg => ({
        role: (msg.role === 'bot' ? 'assistant' : msg.role) as 'user' | 'assistant' | 'system',
        content: msg.content,
      }));

      // Update MCP client with latest content/language
      mcpClient.currentLanguage = language;
      mcpClient.content = content;

      // Call MCP client (handles system prompt, tools, etc.)
      const response = await mcpClient.chat(userMessage, history);

      // Add bot response
      const botResponseContent = response.content || '';
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content: botResponseContent,
          toolCall: response.toolCall,
          toolResult: response.toolResult,
        },
      ]);

      // Trigger TTS if content exists
      if (botResponseContent) {
        speak(botResponseContent);
      }

    } catch (error: any) {
      console.error('Chatbot error:', error);

      let errorMessage = chatbot.fallbackResponse;
      let isError = true;

      // Handle specific error types
      if (error?.status === 429) {
        errorMessage = language === 'fr'
          ? "Désolé, trop de requêtes. Veuillez réessayer dans quelques secondes."
          : "عذراً، هناك طلبات كثيرة جداً. يرجى المحاولة مرة أخرى بعد بضع ثوانٍ.";
        isError = false; // Temporary error, not permanent
      } else if (error?.status === 429 || error?.message?.includes('Too Many Requests')) {
        errorMessage = language === 'fr'
          ? "Je suis un peu occupé. Attendez quelques secondes avant d'essayer."
          : "أنا مشغول قليلاً. انتظر بضع ثوانٍ قبل المحاولة مرة أخرى.";
        isError = false;
      } else if (error?.message?.includes('Rate limit')) {
        errorMessage = language === 'fr'
          ? "Veuillez patienter, nous traitons votre demande."
          : "يرجى الانتظار، نحن نعالج طلبك.";
        isError = false;
      } else if (error?.message?.includes('Network') || error?.message?.includes('fetch')) {
        errorMessage = language === 'fr'
          ? "Erreur de connexion. Vérifiez votre internet."
          : "خطأ في الاتصال. تحقق من اتصال الإنترنت الخاص بك.";
        isError = false;
      } else if (error?.message?.includes('API key')) {
        errorMessage = language === 'fr'
          ? "Erreur de configuration. Veuillez contacter l'administrateur."
          : "خطأ في الإعدادات. يرجى التواصل مع المسؤول.";
      }

      setMessages(prev => [...prev, {
        role: 'bot',
        content: errorMessage,
      }]);

      // Speak error message too
      speak(errorMessage);

      if (isError) {
        setApiError(errorMessage);
        setTimeout(() => setApiError(null), 5000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    setTimeout(() => handleSend(), 100);
  };

  const quickActions = [
    {
      icon: NavIcon,
      label: language === 'fr' ? 'Découvrir nos programmes' : 'اكتشف برامجنا',
      prompt: language === 'fr'
        ? 'Quels programmes proposez-vous ?'
        : 'ما هي البرامج التي تقدمونها؟',
    },
    {
      icon: Phone,
      label: language === 'fr' ? 'Contacter l\'école' : 'اتصل بالمدرسة',
      prompt: language === 'fr'
        ? 'Je veux contacter l\'école pour plus d\'informations'
        : 'أريد التواصل مع المدرسة للحصول على مزيد من المعلومات',
    },
    {
      icon: Mail,
      label: language === 'fr' ? 'Inscrire mon enfant' : 'سجل طفلي',
      prompt: language === 'fr'
        ? 'Comment puis-je inscrire mon enfant ?'
        : 'كيف يمكنني تسجيل طفلي؟',
    },
  ];

  return (
    <>
      {/* Chat button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl glass-card border-white/40 p-0 hover:scale-110 transition-all flex items-center justify-center group"
        aria-label="Open chat"
      >
        <Bot className="w-8 h-8 md:w-10 md:h-10 text-slate-800 group-hover:animate-pulse" />
        <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </motion.button>

      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[100] w-[350px] max-w-[calc(100vw-2rem)]"
          >
            <Card variant="glass" className="overflow-hidden glass-strong border-slate-200/50 shadow-xl ring-0 border-0">
              {/* Header */}
              <div className="p-4 bg-white/40 backdrop-blur-xl flex items-center gap-3 border-b border-slate-200/30">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-white/40 glass-card flex items-center justify-center shadow-md">
                    <Bot className="w-6 h-6 text-slate-800" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                </div>
                <div className="flex-1 text-slate-900">
                  <p className="font-bold">{chatbot.name}</p>
                  <p className="text-[10px] uppercase font-bold tracking-wider opacity-80 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                    {language === 'fr' ? 'En ligne' : 'متصل'}
                  </p>
                </div>

                {/* TTS Toggle */}
                {ttsSupported && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-slate-700 hover:bg-slate-200/50 mr-1 rounded-full w-9 h-9"
                    title={isMuted ? "Activer le son" : "Désactiver le son"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-700 hover:bg-slate-200/50 rounded-full w-9 h-9"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="p-3 bg-white/20 backdrop-blur-md border-b border-slate-200/20">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2 px-1">
                  {language === 'fr' ? 'Actions rapides' : 'إجراءات سريعة'}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {quickActions.map((action, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-white/20 border border-slate-200/30 transition-all min-h-[55px] shadow-none"
                    >
                      {action.icon && (
                        <action.icon className="w-5 h-5 text-slate-700" />
                      )}
                      <span className="text-[10px] font-bold text-center leading-tight text-slate-700 uppercase px-0.5">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-3 bg-black/10 backdrop-blur-sm">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                      ? 'bg-gradient-to-tr from-bohr-blue to-bohr-purple text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-2xl shadow-md border-0'
                      : 'glass-card border-0 text-slate-800 rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-2xl shadow-sm'
                      } font-quicksand rtl:font-tajawal ripple`}>
                      {msg.toolCall && (
                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase opacity-70 mb-1 text-slate-500">
                          <Sparkles className="w-3 h-3 text-bohr-blue" />
                          <span>
                            {msg.toolCall === 'scrollToSection'
                              ? (language === 'fr' ? 'Navigation' : 'تنقل')
                              : 'Action'
                            }
                          </span>
                        </div>
                      )}
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="glass-card border-0 p-3 rounded-2xl rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-2xl shadow-sm">
                      <div className="flex gap-1.5 px-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                              ease: 'easeInOut',
                            }}
                            className="w-1.5 h-1.5 rounded-full bg-slate-400"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/10 flex gap-2 bg-white/5 backdrop-blur-lg">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder={language === 'fr' ? 'Votre message...' : 'رسالتك...'}
                  className="flex-1 h-11 font-quicksand rtl:font-tajawal bg-white/20 border-slate-200/50 text-slate-800 placeholder:text-slate-400 focus:bg-white/30 focus:border-bohr-blue transition-colors rounded-xl shadow-none"
                  disabled={isLoading}
                />
                <Button
                  variant="gradient"
                  size="icon"
                  onClick={handleSend}
                  className="h-11 w-11 rounded-xl shadow-lg brightness-110"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <Send className="w-4 h-4 rtl:rotate-180" />
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
