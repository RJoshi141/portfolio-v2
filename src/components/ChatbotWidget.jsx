import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BotMessageSquare, X, Send, RotateCw, Maximize2, Minimize2 } from "lucide-react";
import { getAnswerFromRitikaBrain } from "../utils/ritikaBrain";

// Initial quick questions - all in third person about Ritika
const QUICK_QUESTIONS = [
  "What are Ritika's key skills and areas of expertise?",
  "Can you give a detailed summary of Ritika's past work experiences?",
  "What are some of Ritika's notable projects?",
];

/**
 * getInitialMessages() - Returns the initial welcome state
 * This function is used both on component mount and when resetting the conversation.
 * It returns an empty array to trigger the centered welcome UI.
 */
const getInitialMessages = () => {
  return [];
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayedTexts, setDisplayedTexts] = useState({});
  const [wasClosed, setWasClosed] = useState(true); // Start as true for first open animation
  const hasOpenedBeforeRef = useRef(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const typewriterIntervalsRef = useRef({});
  const typingMessagesRef = useRef(new Set());

  // Store scroll position when chat closes
  useEffect(() => {
    if (!isOpen && messagesContainerRef.current) {
      scrollPositionRef.current = messagesContainerRef.current.scrollTop;
    }
  }, [isOpen]);

  // Restore scroll position when chat opens
  useEffect(() => {
    if (isOpen && messagesContainerRef.current && scrollPositionRef.current > 0) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = scrollPositionRef.current;
        }
      }, 50);
    }
  }, [isOpen]);

  // Scroll to bottom only when new messages are added (not when opening)
  const previousMessagesLengthRef = useRef(0);
  useEffect(() => {
    if (isOpen && messagesEndRef.current && messages.length > 0) {
      // Only scroll if messages actually increased (new message added)
      if (messages.length > previousMessagesLengthRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
      previousMessagesLengthRef.current = messages.length;
    }
  }, [messages, isOpen]);

  // Initialize with empty messages to show centered welcome state
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages(getInitialMessages());
    }
  }, [isOpen]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Typewriter effect for assistant messages
  useEffect(() => {
    messages.forEach((message) => {
      if (
        message.role === "assistant" &&
        message.content &&
        !typingMessagesRef.current.has(message.id)
      ) {
        typingMessagesRef.current.add(message.id);
        const fullText = message.content;
        const words = fullText.split(" ");
        let currentIndex = 0;

        // Initialize with empty string
        setDisplayedTexts((prev) => ({
          ...prev,
          [message.id]: "",
        }));

        // Clear any existing interval for this message
        if (typewriterIntervalsRef.current[message.id]) {
          clearInterval(typewriterIntervalsRef.current[message.id]);
        }

        // Type each word
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
        }, 80); // 80ms per word for typing speed

        // Store interval reference
        typewriterIntervalsRef.current[message.id] = typeInterval;
      }
    });

    // Cleanup function
    return () => {
      Object.values(typewriterIntervalsRef.current).forEach((interval) => {
        clearInterval(interval);
      });
      typewriterIntervalsRef.current = {};
    };
  }, [messages]); // Only depend on messages

  // This is where we call the local knowledge base instead of an external API.
  // The answer is computed instantly in the browser using pattern matching.
  const sendMessage = (content) => {
    if (!content.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Get structured answer from the brain
    const answerData = getAnswerFromRitikaBrain(content.trim());

    // Add a delay to simulate "thinking" for better UX
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
    }, 3500); // 2500ms delay for natural thinking feel
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const handleFollowUpClick = (question) => {
    // Handle follow-up question click - behaves exactly like sending a new user message
    sendMessage(question);
  };

  /**
   * handleResetConversation() - Resets the chat to initial welcome state
   * Clears all messages and restores the centered welcome UI with bot icon and question chips.
   */
  const handleResetConversation = () => {
    setMessages(getInitialMessages());
    setDisplayedTexts({});
    typingMessagesRef.current.clear();
  };

  /**
   * Toggle expand/collapse state for the chat panel
   * When expanded, the panel height increases from ~60-70vh to ~80-90vh for better visibility.
   */
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const toggleOpen = () => {
    setIsOpen((prev) => {
      if (prev) {
        // If minimizing (chat was open), don't mark as closed - no animation on reopen
        setWasClosed(false);
      } else {
        // If opening and it's not the first time, don't animate
        if (hasOpenedBeforeRef.current && !wasClosed) {
          setWasClosed(false);
        }
      }
      return !prev;
    });
  };

  const handleClose = () => {
    // When closing with X button, mark as closed for animation on next open
    setWasClosed(true);
    setIsOpen(false);
  };

  const isInitialState = messages.length === 0;

  // Render a message bubble
  const renderMessage = (message) => {
    if (message.role === "user") {
      return (
        <div className="max-w-[80%] rounded-tl-2xl rounded-tr-none rounded-bl-2xl rounded-br-2xl px-4 py-2.5 bg-teal-600 dark:bg-cyan-400 text-white">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      );
    }

    // Assistant message - handle different answer types
    if (message.answerType === "bulleted" && message.bullets) {
      const displayedText = displayedTexts[message.id] ?? message.content;
      const isTextComplete = displayedText === message.content || !displayedTexts[message.id];
      return (
        <div className="max-w-[80%] rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-2.5 bg-gray-100 dark:bg-card-dark text-gray-900 dark:text-gray-100">
          {message.content && (
            <p className="text-sm leading-relaxed mb-3">{displayedText}</p>
          )}
          {isTextComplete && (
            <ul className="space-y-2.5 text-sm">
              {message.bullets.map((bullet, idx) => (
                <li key={idx} className="flex flex-col gap-1">
                  <div>
                    <strong className="font-semibold">{bullet.title}</strong>
                    <span className="text-gray-600 dark:text-gray-300"> — {bullet.description}</span>
                  </div>
                  {bullet.links && bullet.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {bullet.links.map((link, linkIdx) => (
                        <a
                          key={linkIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 dark:text-cyan-400 hover:underline text-xs font-medium transition-all duration-200"
                        >
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

    // Paragraph message or message with links at top level
    const displayedText = displayedTexts[message.id] ?? message.content;
    return (
      <div className="max-w-[80%] rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-2.5 bg-gray-100 dark:bg-card-dark text-gray-900 dark:text-gray-100">
        <p className="text-sm leading-relaxed whitespace-pre-wrap mb-2">
          {displayedText}
        </p>
        {message.links && message.links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.links.map((link, linkIdx) => (
              <a
                key={linkIdx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 dark:text-cyan-400 hover:underline text-xs font-medium transition-all duration-200"
              >
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
      {/* Floating Launcher Button - Always visible, toggles panel open/closed */}
      <motion.button
        onClick={toggleOpen}
        className="fixed bottom-16 right-6 z-[60] w-14 h-14 rounded-full 
                   bg-carnation text-white 
                   shadow-lg hover:shadow-xl 
                   flex items-center justify-center
                   transition-all duration-300 ease-in-out
                   focus:outline-none
                   border-0 outline-none
                   hover:bg-[#e05555] active:bg-[#cc4545]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Minimize chat" : "Open Portfolio Concierge"}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <BotMessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={wasClosed ? { opacity: 0, scaleX: 0, scaleY: 0.95 } : { opacity: 1, scaleX: 1, scaleY: 1 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleX: 0, scaleY: 0.95 }}
            transition={wasClosed ? { duration: 0.2, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
            style={{ transformOrigin: 'right' }}
            onAnimationComplete={() => {
              // Mark as opened before and reset wasClosed after animation completes
              hasOpenedBeforeRef.current = true;
              if (wasClosed) {
                setWasClosed(false);
              }
            }}
            className={`fixed bottom-32 right-6 z-[55] 
                       ${isExpanded ? 'w-[90vw] sm:w-[520px]' : 'w-[90vw] sm:w-[420px]'}
                       ${isExpanded ? 'h-[70vh] sm:h-[75vh]' : 'h-[60vh] sm:h-[70vh] max-h-[600px]'}
                        bg-white dark:bg-black
                       border border-gray-200 dark:border-card-dark 
                       rounded-[20px] shadow-2xl 
                       flex flex-col 
                       overflow-hidden
                       transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-card-dark bg-gray-50 dark:bg-black/50">
              <div className="flex items-center gap-3">
                {/* Bot Avatar with Status Dot */}
                <div className="relative w-10 h-10 rounded-full bg-teal-600 dark:bg-cyan-400 flex items-center justify-center">
                  <BotMessageSquare className="w-6 h-6 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Portfolio Concierge
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Built by Ritika Joshi
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Expand/Collapse Button */}
                <button
                  onClick={toggleExpand}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                           text-gray-500 dark:text-gray-400 
                           transition-all duration-200 ease-in-out
                           hover:-translate-y-0.5
                           focus:outline-none"
                  aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
                  title={isExpanded ? "Collapse chat" : "Expand chat"}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                {/* Refresh/Reset Button */}
                <button
                  onClick={handleResetConversation}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                           text-gray-500 dark:text-gray-400 
                           transition-all duration-200 ease-in-out
                           hover:-translate-y-0.5
                           focus:outline-none"
                  aria-label="Reset conversation"
                  title="Reset conversation"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                           text-gray-500 dark:text-gray-400 
                           transition-all duration-200 ease-in-out
                           hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-cyan-400"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 relative">
              {isInitialState ? (
                // Centered Welcome State with staggered fade-in animations
                <div className="flex flex-col items-center justify-center h-full pt-8">
                  {/* Bot Icon - fades in first */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                    className="mb-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-card-dark flex items-center justify-center">
                      <BotMessageSquare className="w-8 h-8 text-teal-600 dark:text-cyan-400" />
                    </div>
                  </motion.div>
                  {/* Greeting Text - fades in second */}
                  <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                    className="text-xs text-center text-gray-700 dark:text-gray-300 mb-6 max-w-sm leading-relaxed"
                  >
                    Hi! I'm here to help you learn about Ritika's work, experience, skills, and projects. Ask me anything or choose from the suggested questions!
                  </motion.p>
                  {/* Question Chips - fade in third, staggered */}
                  <div className="space-y-2 w-full max-w-sm">
                    {QUICK_QUESTIONS.map((question, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                        onClick={() => handleQuickQuestion(question)}
                        className="w-full text-left px-4 py-2.5 rounded-full 
                                 bg-gray-100 dark:bg-card-dark 
                                 text-gray-700 dark:text-gray-300 
                                 text-xs font-medium
                                 hover:bg-gray-200 dark:hover:bg-card-dark 
                                 transition-all duration-200 ease-in-out
                                 hover:-translate-y-0.5
                                 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-cyan-400"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                // Regular Messages
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="space-y-3">
                      <div
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {renderMessage(message)}
                      </div>

                      {/* Follow-up Questions - show after assistant messages */}
                      {message.role === "assistant" &&
                        message.followUpQuestions &&
                        message.followUpQuestions.length > 0 && (
                          <div className="mt-2 space-y-2">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-1">
                              Suggested follow-up questions:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {message.followUpQuestions.map((question, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleFollowUpClick(question)}
                                  className="px-3 py-1.5 rounded-full 
                                           bg-gray-100 dark:bg-card-dark 
                                           text-gray-700 dark:text-gray-300 
                                           text-xs font-medium
                                           hover:bg-gray-200 dark:hover:bg-card-dark 
                                           transition-all duration-200 ease-in-out
                                           hover:-translate-y-0.5
                                           focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-cyan-400
                                           text-left"
                                >
                                  {question}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}

                  {/* Loading Indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-card-dark rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-2.5">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex gap-1">
                            <motion.div
                              className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: 0,
                                ease: "easeInOut",
                              }}
                            />
                            <motion.div
                              className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: 0.4,
                                ease: "easeInOut",
                              }}
                            />
                            <motion.div
                              className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: 0.8,
                                ease: "easeInOut",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
              {/* Blurry fading effect at the bottom - bleeds into input area */}
              <div className="sticky -bottom-4 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-10" />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-white dark:bg-black"
            >
              <div className="relative flex items-end">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything…"
                  rows={1}
                  className="flex-1 resize-none rounded-full pl-4 pr-12 py-2.5 
                           bg-white dark:bg-card-dark 
                           text-gray-900 dark:text-gray-100 
                           placeholder-gray-400 dark:placeholder-gray-500
                           text-sm
                           focus:outline-none focus:ring-1 focus:ring-teal-600 dark:focus:ring-cyan-400
                           transition-all duration-200 ease-in-out"
                  style={{ maxHeight: "120px" }}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 bottom-2 p-1.5 rounded-full 
                           bg-teal-600 dark:bg-cyan-400 
                           text-white 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           hover:bg-[#d85555] dark:hover:bg-[#d85555] 
                           transition-all duration-200 ease-in-out
                           focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-cyan-400 focus:ring-offset-2"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
