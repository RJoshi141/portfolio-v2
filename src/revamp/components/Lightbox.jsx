// Click-to-expand viewer for the grey media panels on a case study.
// The panel grows out of its spot on the page and shrinks back into it on close;
// arrows / arrow keys step through every panel in page order.
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const Ctx = createContext(null);
const ease = [0.32, 0.72, 0, 1];
const DUR = 0.5;

const RoundBtn = ({ label, onClick, className = "", children }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={`w-11 h-11 md:w-12 md:h-12 rounded-full bg-neutral-900/90 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors ${className}`}
  >
    {children}
  </button>
);

const elFor = (id) => document.querySelector(`[data-zoom-id="${CSS.escape(id)}"]`);

// Biggest box of this shape that fits the screen, centered
const fit = (ratio) => {
  const vw = window.innerWidth, vh = window.innerHeight;
  const w = Math.min(vw * 0.88, vh * 0.8 * ratio);
  const h = w / ratio;
  return { w, h, left: (vw - w) / 2, top: (vh - h) / 2 };
};

// Transform that makes the centered box sit exactly on the element's rect on the page
const toRect = (rect, box) => ({
  x: rect.left + rect.width / 2 - (box.left + box.w / 2),
  y: rect.top + rect.height / 2 - (box.top + box.h / 2),
  scale: rect.width / box.w,
  opacity: 1,
});

// Only fly back if the panel is still (mostly) on screen; otherwise just fade out
const onScreen = (r) => r && r.bottom > 0 && r.top < window.innerHeight;

const panelVariants = {
  enter: ({ from, box }) => (from ? toRect(from, box) : { x: 0, y: 0, scale: 0.96, opacity: 0 }),
  center: { x: 0, y: 0, scale: 1, opacity: 1 },
  leave: ({ to, box }) => (to ? toRect(to, box) : { x: 0, y: 0, scale: 0.96, opacity: 0 }),
};

export function LightboxProvider({ children }) {
  const entries = useRef(new Map()); // id -> ref holding { content }
  const [view, setView] = useState(null); // { ids, index, from }
  const [hiddenId, setHiddenId] = useState(null); // source panel hidden while it's "lifted"
  const [exit, setExit] = useState({ to: null }); // where the leaving panel flies to
  const [, forceResize] = useState(0);
  const viewRef = useRef(null);
  viewRef.current = view;
  const lastBox = useRef(null); // panel geometry, kept so the closing animation knows where it was

  const register = useCallback((id, ref) => entries.current.set(id, ref), []);
  const unregister = useCallback((id) => entries.current.delete(id), []);

  const open = useCallback((id) => {
    const ids = [...document.querySelectorAll("[data-zoom-id]")].map((el) => el.dataset.zoomId);
    const from = elFor(id)?.getBoundingClientRect();
    setExit({ to: null });
    setHiddenId(id);
    setView({ ids, index: ids.indexOf(id), from });
  }, []);

  const close = useCallback(() => {
    const v = viewRef.current;
    if (!v) return;
    const id = v.ids[v.index];
    const r = elFor(id)?.getBoundingClientRect();
    const back = onScreen(r);
    // freeze the geometry the panel is closing from, so the fly-back maps onto the right box
    setExit({ to: back ? r : null, box: r && r.height ? fit(r.width / r.height) : lastBox.current });
    setHiddenId(back ? id : null);
    setView(null);
  }, []);

  // stepping crossfades in place (no fly-in)
  const step = useCallback((d) => {
    const v = viewRef.current;
    if (!v) return;
    const index = (v.index + d + v.ids.length) % v.ids.length;
    setExit({ to: null });
    setHiddenId(v.ids[index]);
    setView({ ...v, index, from: null });
  }, []);

  const isOpen = !!view;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onResize = () => forceResize((n) => n + 1);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen, close, step]);

  const id = view?.ids[view.index];
  const src = id && elFor(id);
  const rect = src?.getBoundingClientRect();
  // match the source panel's on-screen shape so the zoom is a clean uniform scale
  const ratio = rect && rect.height ? rect.width / rect.height : 16 / 9;
  const box = id ? fit(ratio) : lastBox.current || fit(ratio);
  if (id) lastBox.current = box;
  const content = id ? entries.current.get(id)?.current?.content : null;

  return (
    <Ctx.Provider value={{ register, unregister, open, hiddenId }}>
      {children}
      <AnimatePresence custom={{ to: exit.to, box: exit.box || box }} onExitComplete={() => !view && setHiddenId(null)}>
        {view && (
          <motion.div
            key="lightbox-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR * 0.8, ease }}
            className="fixed inset-0 z-[100] bg-black"
            onClick={close}
          >
            <RoundBtn label="Close" onClick={close} className="absolute top-4 right-4 md:top-6 md:right-6 z-[2]">
              <X className="w-5 h-5" />
            </RoundBtn>
            {view.ids.length > 1 && (
              <>
                <RoundBtn label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-[2]">
                  <ChevronLeft className="w-5 h-5" />
                </RoundBtn>
                <RoundBtn label="Next" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[2]">
                  <ChevronRight className="w-5 h-5" />
                </RoundBtn>
              </>
            )}
          </motion.div>
        )}
        {view && content && (
          <motion.div
            key={id}
            custom={{ from: view.from, to: exit.to, box }}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="leave"
            transition={{ duration: view.from || exit.to ? DUR : 0.25, ease }}
            className="fixed z-[101] flex items-center justify-center overflow-hidden bg-[#1a1a1a] will-change-transform"
            style={view ? { left: box.left, top: box.top, width: box.w, height: box.h } : undefined}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

// Grey panel that opens in the lightbox. `className` sizes it inline (aspect classes etc.).
// Children render in both places, so size them with percentages.
export function Zoomable({ className = "", children }) {
  const lb = useContext(Ctx);
  const id = useId();
  const ref = useRef();
  ref.current = { content: children };

  useEffect(() => {
    if (!lb) return;
    lb.register(id, ref);
    return () => lb.unregister(id);
  }, [lb?.register, lb?.unregister, id]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Expand"
      data-zoom-id={id}
      onClick={() => lb?.open(id)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), lb?.open(id))}
      className={`flex items-center justify-center overflow-hidden bg-[#1a1a1a] cursor-zoom-in ${className}`}
      // hidden while its copy is up in the lightbox, so it looks lifted off the page
      style={{ visibility: lb?.hiddenId === id ? "hidden" : "visible" }}
    >
      {children}
    </div>
  );
}
