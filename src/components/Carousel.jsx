import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/Carousel.css";

const cardVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 24 : -24,
    filter: "blur(6px)",
    rotateX: direction > 0 ? 4 : -4,
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    rotateX: 0,
  }),
  exit: (direction) => ({
    opacity: 0,
    y: direction > 0 ? -24 : 24,
    filter: "blur(6px)",
    rotateX: direction > 0 ? -4 : 4,
  }),
};

export default function Carousel({
  items = [],
  autoplay = true,
  autoplayDelay = 2000,
  pauseOnHover = true,
  loop = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [items.length]);

  useEffect(() => {
    if (!pauseOnHover) return;
    const node = containerRef.current;
    if (!node) return;
    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);
    node.addEventListener("mouseenter", handleEnter);
    node.addEventListener("mouseleave", handleLeave);
    return () => {
      node.removeEventListener("mouseenter", handleEnter);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, [pauseOnHover]);

  const paginate = useCallback(
    (newDirection) => {
      if (!items.length) return;
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        if (loop) {
          const total = items.length;
          return (prev + newDirection + total) % total;
        }
        const next = prev + newDirection;
        if (next < 0) return 0;
        if (next >= items.length) return items.length - 1;
        return next;
      });
    },
    [items.length, loop]
  );

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;
    if (pauseOnHover && isHovered) return;
    const timer = setInterval(() => paginate(1), autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, items.length, pauseOnHover, paginate]);

  const jumpTo = (index) => {
    if (index === currentIndex) return;
    const dir = index > currentIndex ? 1 : -1;
    setDirection(dir);
    setCurrentIndex(() => index);
  };

  if (!items.length) return null;

  const activeItem = items[currentIndex];
  const displayIndex = String(currentIndex + 1).padStart(2, "0");
  const total = String(items.length).padStart(2, "0");

  return (
    <div className="articles-carousel" ref={containerRef}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.article
          key={activeItem.id ?? activeItem.title ?? currentIndex}
          custom={direction}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="articles-carousel-card"
        >
          <div className="articles-carousel-card__header">
            {activeItem.icon ? (
              <span className="articles-carousel-icon">{activeItem.icon}</span>
            ) : null}
            <div>
              {activeItem.tag && (
                <p className="articles-carousel-tag">{activeItem.tag}</p>
              )}
              {activeItem.meta && (
                <p className="articles-carousel-meta">{activeItem.meta}</p>
              )}
            </div>
          </div>

          <div className="articles-carousel-body">
            <h4>{activeItem.title}</h4>
            <p>{activeItem.description}</p>
          </div>

          <div className="articles-carousel-footer">
            {activeItem.link ? (
              <a
                href={activeItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="articles-carousel-cta"
              >
                {activeItem.cta || "Read more"}
              </a>
            ) : null}
            <div className="articles-carousel-counter">
              {displayIndex} / {total}
            </div>
          </div>
        </motion.article>
      </AnimatePresence>

      {items.length > 1 && (
        <div className="articles-carousel-controls">
          <button
            type="button"
            aria-label="Previous article"
            className="articles-carousel-nav"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next article"
            className="articles-carousel-nav"
            onClick={() => paginate(1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {items.length > 1 && (
        <div className="articles-carousel-dots">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`articles-carousel-dot ${
                index === currentIndex ? "active" : ""
              }`}
              aria-label={`Go to article ${index + 1}`}
              onClick={() => jumpTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
