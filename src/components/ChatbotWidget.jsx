import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BotMessageSquare, X, Send, RotateCw, Maximize2, Minimize2 } from "lucide-react";
import { getAnswerFromRitikaBrain } from "../utils/ritikaBrain";

const QUICK_QUESTIONS = [
  "What are Ritika's key skills and areas of expertise?",
  "Can you give a detailed summary of Ritika's past work experiences?",
  "What are some of Ritika's notable projects?",
];

const getInitialMessages = () => [];

const MARGIN = 24;
const BTN_SIZE = 56;

function getCornerPosition(corner) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  switch (corner) {
    case "tl": return { x: MARGIN, y: MARGIN };
    case "tr": return { x: w - BTN_SIZE - MARGIN, y: MARGIN };
    case "bl": return { x: MARGIN, y: h - BTN_SIZE - MARGIN };
    case "br":
    default:   return { x: w - BTN_SIZE - MARGIN, y: h - BTN_SIZE - MARGIN };
  }
}

function getNearestCorner(x, y) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const cx = x + BTN_SIZE / 2;
  const cy = y + BTN_SIZE / 2;
  const left = cx < w / 2;
  const top  = cy < h / 2;
  if (top  &&  left) return "tl";
  if (top  && !left) return "tr";
  if (!top &&  left) return "bl";
  return "br";
}

function getPanelOrigin(corner) {
  switch (corner) {
    case "tl": return { bottom: "auto", top: "calc(100% + 12px)", right: "auto", left: 0 };
    case "tr": return { bottom: "auto", top: "calc(100% + 12px)", left: "auto", right: 0 };
    case "bl": return { top: "auto", bottom: "calc(100% + 12px)", right: "auto", left: 0 };
    case "br":
    default:   return { top: "auto", bottom: "calc(100% + 12px)", left: "auto", right: 0 };
  }
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayedTexts, setDisplayedTexts] = useState({});
  const [wasClosed, setWasClosed] = useState(true);

  // Drag state
  const [corner, setCorner] = useState("br");
  const [pos, setPos] = useState(() => getCornerPosition("br"));
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, bx: 0, by: 0 });
  // Ref to the launcher button only — drag only activates from this element
  const btnRef = useRef(null);

  const hasOpenedBeforeRef = useRef(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const typewriterIntervalsRef = useRef({});
  const typingMessagesRef = useRef(new Set());

  // Re-snap to corner on window resize
  useEffect(() => {
    const onResize = () => setPos(getCornerPosition(corner));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [corner]);

  // ── Drag handlers ──────────────────────────────────────────
  // pointerDownOnBtn tracks whether pointerdown started on the launcher button.
  // We cannot check e.target in onPointerUp because setPointerCapture redirects
  // all subsequent pointer events to the capturing element, changing e.target.
  const pointerDownOnBtn = useRef(false);

  const onPointerDown = useCallback((e) => {
    if (e.button !== undefined && e.button !== 0) return;
    pointerDownOnBtn.current = !!(btnRef.current && btnRef.current.contains(e.target));
    if (!pointerDownOnBtn.current) return; // ignore presses inside the chat panel
    isDragging.current = true;
    didDrag.current = false;
    dragStart.current = {
      mx: e.clientX,
      my: e.clientY,
      bx: pos.x,
      by: pos.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [pos]);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) didDrag.current = true;
    const nx = Math.max(0, Math.min(window.innerWidth  - BTN_SIZE, dragStart.current.bx + dx));
    const ny = Math.max(0, Math.min(window.innerHeight - BTN_SIZE, dragStart.current.by + dy));
    setPos({ x: nx, y: ny });
  }, []);

  const onPointerUp = useCallback((e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const nearest = getNearestCorner(pos.x, pos.y);
    setCorner(nearest);
    setPos(getCornerPosition(nearest));
    // Toggle open only if the gesture started on the button and no drag occurred
    if (!didDrag.current && pointerDownOnBtn.current) {
      setIsOpen((prev) => {
        if (!prev) hasOpenedBeforeRef.current = true;
        return !prev;
      });
    }
    pointerDownOnBtn.current = false;
  }, [pos]);
  // ───────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen && messagesContainerRef.current) {
      scrollPositionRef.current = messagesContainerRef.current.scrollTop;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messagesContainerRef.current && scrollPositionRef.current > 0) {
      setTimeout(() => {
        if (messagesContainerRef.current)
          messagesContainerRef.current.scrollTop = scrollPositionRef.current;
      }, 50);
    }
  }, [isOpen]);

  const previousMessagesLengthRef = useRef(0);
  useEffect(() => {
    if (isOpen && messagesEndRef.current && messages.length > 0) {
      if (messages.length > previousMessagesLengthRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
      previousMessagesLengthRef.current = messages.length;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) setMessages(getInitialMessages());
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    messages.forEach((message) => {
      if (
        message.role === "assistant" &&
        message.content &&
        !typingMessagesRef.current.has(message.id)
      ) {
        typingMessagesRef.current.add(message.id);
        const words = message.content.split(" ");
        let currentIndex = 0;
        setDisplayedTexts((prev) => ({ ...prev, [message.id]: "" }));
        if (typewriterIntervalsRef.current[message.id])
          clearInterval(typewriterIntervalsRef.current[message.id]);
        const typeInterval = setInterval(() => {
          if (currentIndex < words.length) {
            setDisplayedTexts((prev) => ({
              ...prev,
              [message.id]: words.slice(0, currentIndex + 1).join(" "),
            }));
            currentIndex++;
          } else {
            clearInterval(typeInterval);
            delete typewriterIntervalsRef.current[message.id];
          }
        }, 80);
        typewriterIntervalsRef.current[message.id] = typeInterval;
      }
    });
    return () => {
      Object.values(typewriterIntervalsRef.current).forEach(clearInterval);
      typewriterIntervalsRef.current = {};
    };
  }, [messages]);

  const sendMessage = (content) => {
    if (!content.trim() || isLoading) return;
    const userMessage = { id: Date.now().toString(), role: "user", content: content.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    const answerData = getAnswerFromRitikaBrain(content.trim());
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answerData.answerText,
        answerType: answerData.answerType,
        bullets: answerData.bullets,
        links: answerData.links,
        followUpQuestions: answerData.followUpQuestions,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 3500);
  };

  const handleQuickQuestion = (q) => sendMessage(q);
  const handleFollowUpClick = (q) => sendMessage(q);

  const handleResetConversation = () => {
    setMessages(getInitialMessages());
    setDisplayedTexts({});
    typingMessagesRef.current.clear();
  };

  const toggleExpand = () => setIsExpanded((p) => !p);

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(inputValue); };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); }
  };

  const handleClose = () => { setWasClosed(true); setIsOpen(false); };

  const isInitialState = messages.length === 0;
  const panelOffset = getPanelOrigin(corner);

  const renderMessage = (message) => {
    if (message.role === "user") {
      return (
        <div className="max-w-[80%] rounded-tl-2xl rounded-tr-none rounded-bl-2xl rounded-br-2xl px-4 py-2.5 bg-teal-600 dark:bg-cyan-400 text-white">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      );
    }

    if (message.answerType === "bulleted" && message.bullets) {
      const displayedText = displayedTexts[message.id] ?? message.content;
      const isTextComplete = displayedText === message.content || !displayedTexts[message.id];
      return (
        <div className="max-w-[80%] rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-2.5 bg-gray-100 dark:bg-card-dark text-gray-900 dark:text-gray-100">
          {message.content && <p className="text-sm leading-relaxed mb-3">{displayedText}</p>}
          {isTextComplete && (
            <ul className="space-y-2.5 text-sm">
              {message.bullets.map((bullet, idx) => (
                <li key={idx} className="flex flex-col gap-1">
                  <div>
                    <strong className="font-semibold">{bullet.title}</strong>
                    <span className="text-gray-600 dark:text-gray-300"> — {bullet.description}</span>
                  </div>
                  {bullet.links?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {bullet.links.map((link, li) => (
                        <a key={li} href={link.url} target="_blank" rel="noopener noreferrer"
                          className="text-teal-600 dark:text-cyan-400 hover:underline text-xs font-medium">
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    const displayedText = displayedTexts[message.id] ?? message.content;
    return (
      <div className="max-w-[80%] rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-2.5 bg-gray-100 dark:bg-card-dark text-gray-900 dark:text-gray-100">
        <p className="text-sm leading-relaxed whitespace-pre-wrap mb-2">{displayedText}</p>
        {message.links?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.links.map((link, li) => (
              <a key={li} href={link.url} target="_blank" rel="noopener noreferrer"
                className="text-teal-600 dark:text-cyan-400 hover:underline text-xs font-medium">
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Outer wrapper handles drag pointer events */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          zIndex: 60,
          touchAction: "none",
          userSelect: "none",
        }}
      >
        {/* Launcher button — btnRef scopes drag activation to this element only */}
        <motion.button
          ref={btnRef}
          className="w-14 h-14 rounded-full 
                     bg-carnation text-white 
                     shadow-lg hover:shadow-xl 
                     flex items-center justify-center
                     transition-shadow duration-300
                     focus:outline-none border-0 outline-none
                     hover:bg-[#e05555] active:bg-[#cc4545]"
          style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          aria-label={isOpen ? "Minimize chat" : "Open Portfolio Concierge"}
          onClick={(e) => e.preventDefault()}
        >
          <BotMessageSquare className="w-6 h-6 pointer-events-none" />
        </motion.button>

        {/* Chat panel — absolutely positioned relative to button wrapper */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={wasClosed ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={wasClosed ? { duration: 0.2, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
              style={{
                position: "absolute",
                ...panelOffset,
                zIndex: 55,
                transformOrigin: corner.includes("r") ? "right" : "left",
                width: isExpanded ? "min(520px, 90vw)" : "min(420px, 90vw)",
              }}
              onAnimationComplete={() => {
                hasOpenedBeforeRef.current = true;
                if (wasClosed) setWasClosed(false);
              }}
              className={`
                ${isExpanded ? "h-[75vh]" : "h-[65vh] max-h-[600px]"}
                bg-white dark:bg-black
                border border-gray-200 dark:border-card-dark
                rounded-[20px] shadow-2xl
                flex flex-col overflow-hidden
                transition-[width,height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-card-dark bg-gray-50 dark:bg-black/50">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full bg-teal-600 dark:bg-cyan-400 flex items-center justify-center">
                    <BotMessageSquare className="w-6 h-6 text-white" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Portfolio Concierge</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Built by Ritika Joshi</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={toggleExpand}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none"
                    aria-label={isExpanded ? "Collapse chat" : "Expand chat"}>
                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <button onClick={handleResetConversation}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none"
                    aria-label="Reset conversation">
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button onClick={handleClose}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-cyan-400"
                    aria-label="Close chat">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 relative">
                {isInitialState ? (
                  <div className="flex flex-col items-center justify-center h-full pt-8">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }} className="mb-6">
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-card-dark flex items-center justify-center">
                        <BotMessageSquare className="w-8 h-8 text-teal-600 dark:text-cyan-400" />
                      </div>
                    </motion.div>
                    <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="text-xs text-center text-gray-700 dark:text-gray-300 mb-6 max-w-sm leading-relaxed">
                      Hi! I'm here to help you learn about Ritika's work, experience, skills, and projects. Ask me anything or choose from the suggested questions!
                    </motion.p>
                    <div className="space-y-2 w-full max-w-sm">
                      {QUICK_QUESTIONS.map((question, idx) => (
                        <motion.button key={idx}
                          onClick={() => handleQuickQuestion(question)}
                          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                          className="w-full text-left px-4 py-2.5 rounded-full bg-gray-100 dark:bg-card-dark text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-200 dark:hover:bg-card-dark transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-cyan-400">
                          {question}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="space-y-3">
                        <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                          {renderMessage(message)}
                        </div>
                        {message.role === "assistant" && message.followUpQuestions?.length > 0 && (
                          <div className="mt-2 space-y-2">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-1">
                              Suggested follow-up questions:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {message.followUpQuestions.map((q, idx) => (
                                <button key={idx}
                                  onClick={() => handleFollowUpClick(q)}
                                  className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-card-dark text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-200 dark:hover:bg-card-dark transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-cyan-400 text-left">
                                  {q}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-card-dark rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-2.5">
                          <div className="flex gap-1">
                            {[0, 0.4, 0.8].map((delay, i) => (
                              <motion.div key={i} className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay, ease: "easeInOut" }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
                <div className="sticky -bottom-4 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-10" />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-black">
                <div className="relative flex items-end">
                  <textarea ref={inputRef} value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything…" rows={1}
                    className="flex-1 resize-none rounded-full pl-4 pr-12 py-2.5 bg-white dark:bg-card-dark text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600 dark:focus:ring-cyan-400 transition-all duration-200"
                    style={{ maxHeight: "120px" }} />
                  <button type="submit" disabled={!inputValue.trim() || isLoading}
                    className="absolute right-2 bottom-2 p-1.5 rounded-full bg-teal-600 dark:bg-cyan-400 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d85555] dark:hover:bg-[#d85555] transition-all duration-200 focus:outline-none"
                    aria-label="Send message">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}