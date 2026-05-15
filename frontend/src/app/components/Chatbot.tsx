import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, ChevronRight, Instagram, Mail, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Link } from "react-router";
import { fetchDaySlots, fetchServices } from "../../lib/api";
import { FALLBACK_SERVICES, normalizeServicesResponse } from "../../lib/services";

const INSTAGRAM_URL =
  "https://www.instagram.com/kosmicalign?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const WHATSAPP_NUMBER = "919876543210";
const WHATSAPP_DISPLAY = "+91 98765 43210";

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: 1,
    role: "bot",
    text: "Namaste. Ask me about services, prices, booking slots, or how to contact the KosmicAlign team.",
  },
];

const quickPrompts = [
  "What services do you offer?",
  "When are you free?",
  "How do I book?",
  "How can I contact admin?",
];

const normalize = (value: string) => value.toLowerCase().trim();

const formatSlot = (slot: any) => {
  const value = slot?.start || slot;

  if (typeof value === "string" && value.includes("T")) {
    return new Date(value).toLocaleString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return String(value);
};

const makeFallbackAvailability = () => {
  const slots: string[] = [];
  const date = new Date();

  while (slots.length < 4) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();

    if (day !== 0 && day !== 1) {
      const label = date.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      slots.push(`${label}: 11:00 AM, 2:00 PM, or 5:00 PM`);
    }
  }

  return slots;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [isThinking, setIsThinking] = useState(false);
  const [services, setServices] = useState<any[]>(FALLBACK_SERVICES);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageId = useRef(starterMessages.length + 1);

  useEffect(() => {
    fetchServices()
      .then((res) => setServices(normalizeServicesResponse(res)))
      .catch(() => setServices(FALLBACK_SERVICES));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  const serviceSummary = useMemo(
    () =>
      services
        .map((service) => `${service.title} (${service.durationMin || 90} min, Rs ${service.price})`)
        .join("; "),
    [services],
  );

  const findAvailableSlots = async () => {
    const serviceId = services[0]?.id || FALLBACK_SERVICES[0].id;
    const found: string[] = [];
    const date = new Date();

    for (let i = 1; i <= 10 && found.length < 5; i += 1) {
      date.setDate(date.getDate() + 1);
      const dateStr = date.toLocaleDateString("en-CA");

      try {
        const response = await fetchDaySlots(dateStr, serviceId);
        const openSlots = (response?.data?.slots || [])
          .filter((slot: any) => !slot.booked)
          .slice(0, 2)
          .map(formatSlot);

        found.push(...openSlots);
      } catch {
        break;
      }
    }

    return found.length > 0 ? found : makeFallbackAvailability();
  };

  const getBotReply = async (prompt: string) => {
    const query = normalize(prompt);

    if (query.includes("free") || query.includes("available") || query.includes("slot") || query.includes("time") || query.includes("coming")) {
      const slots = await findAvailableSlots();
      return `Upcoming availability usually opens around these times: ${slots.join(" | ")}. For the exact live slot, open Booking and choose your service.`;
    }

    if (query.includes("service") || query.includes("therapy") || query.includes("counselling") || query.includes("offer") || query.includes("price")) {
      return `KosmicAlign offers: ${serviceSummary}. Most sessions are 90 minutes and can be booked online or for the Delhi studio where available.`;
    }

    if (query.includes("book") || query.includes("appointment") || query.includes("session") || query.includes("payment")) {
      return "To book, choose a service, pick an available date and time, add your details, then complete the secure Razorpay payment. The booking page will guide you step by step.";
    }

    if (query.includes("contact") || query.includes("admin") || query.includes("whatsapp") || query.includes("instagram") || query.includes("dm") || query.includes("email")) {
      return `You can contact admin on WhatsApp at ${WHATSAPP_DISPLAY}, Instagram DM at @kosmicalign, or email hello@kosmicalign.com.`;
    }

    if (query.includes("location") || query.includes("delhi") || query.includes("online")) {
      return "Sessions are available online worldwide, with in-person support in Delhi when the selected service and schedule allow it.";
    }

    return "I can help with services, booking steps, upcoming availability, prices, session modes, and admin contact details. Try asking, 'When are you free this week?'";
  };

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    setInput("");
    setMessages((current) => [...current, { id: messageId.current++, role: "user", text: trimmed }]);
    setIsThinking(true);

    const reply = await getBotReply(trimmed);
    setMessages((current) => [...current, { id: messageId.current++, role: "bot", text: reply }]);
    setIsThinking(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-[1.25rem] sm:rounded-[1.75rem] shadow-[0_14px_50px_rgba(88,88,88,0.14)] w-[calc(100vw-2rem)] max-w-[23rem] mb-4 overflow-hidden border border-[#FFF5EA]"
          >
            <div className="bg-[#E84C3D] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg leading-tight">KosmicAlign</h3>
                  <p className="text-xs text-white/80">Care desk online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="p-4 bg-[#FFF5EA]/55 h-72 overflow-y-auto flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    message.role === "bot"
                      ? "self-start rounded-tl-sm bg-white text-[#585858] border border-[#E5BE90]/20"
                      : "self-end rounded-tr-sm bg-[#E84C3D] text-white"
                  }`}
                >
                  {message.text}
                </div>
              ))}
              {isThinking && (
                <div className="self-start rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-[#7A7A7A] shadow-sm border border-[#E5BE90]/20">
                  Checking...
                </div>
              )}
            </div>

            <div className="px-4 pt-4 bg-white border-t border-[#E5BE90]/20">
              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full bg-[#FFF5EA] px-3 py-2 text-left text-xs font-medium text-[#585858] transition-colors hover:bg-[#FDEBD0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84C3D]/30"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="p-4 bg-white flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 rounded-full bg-[#FFF5EA] px-4 py-3 text-sm text-[#585858] outline-none transition-shadow focus:ring-2 focus:ring-[#E84C3D]/25"
                placeholder="Ask a question..."
              />
              <button
                type="submit"
                className="h-11 w-11 shrink-0 rounded-full bg-[#E84C3D] text-white flex items-center justify-center transition-colors hover:bg-[#C0392B] disabled:opacity-50"
                disabled={!input.trim() || isThinking}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="px-4 pb-4 bg-white grid grid-cols-3 gap-2">
              <Link
                to="/booking"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-[#E84C3D] px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-[#C0392B] flex items-center justify-center gap-1"
              >
                <CalendarDays className="w-3.5 h-3.5" /> Book
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#FFF5EA] px-3 py-2 text-center text-xs font-semibold text-[#585858] transition-colors hover:bg-[#FDEBD0] flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WA
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#FFF5EA] px-3 py-2 text-center text-xs font-semibold text-[#585858] transition-colors hover:bg-[#FDEBD0] flex items-center justify-center gap-1"
              >
                <Instagram className="w-3.5 h-3.5" /> DM
              </a>
              <a
                href="mailto:hello@kosmicalign.com"
                className="col-span-3 rounded-full bg-white border border-[#E5BE90]/30 px-3 py-2 text-center text-xs font-semibold text-[#585858] transition-colors hover:bg-[#FFF5EA] flex items-center justify-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" /> hello@kosmicalign.com <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-[#E84C3D] text-white rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(232,76,61,0.4)] hover:bg-[#C0392B] hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
}
