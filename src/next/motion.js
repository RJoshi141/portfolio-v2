// GSAP setup + the attribute-driven motion every page uses.
//   data-split="lines" | "chars"   masked text reveal (data-delay="0.4", data-now = play on mount, not on scroll)
//   data-fade                      fade + rise on enter
//   data-clip                      media opens from an inset rectangle as it scrolls in (scrubbed)
//   data-speed="0.15"              parallax: the element drifts against the scroll
//   data-count="77"                number counts up on enter
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
export { gsap, ScrollTrigger, SplitText };

export const EASE = "expo.out";

// one goo filter per heading, sized to its font so small and huge headings bleed the same amount
let inkId = 0;
export function makeInk(el) {
  const id = `ink-${++inkId}`;
  const size = parseFloat(getComputedStyle(el).fontSize) || 80;
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  svg.innerHTML = `<filter id="${id}" x="-20%" y="-30%" width="140%" height="160%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="${(1.6 / size).toFixed(4)}" numOctaves="2" seed="${inkId}" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feGaussianBlur in="d" stdDeviation="0" result="b"/>
    <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"/>
  </filter>`;
  document.body.appendChild(svg);
  const disp = svg.querySelector("feDisplacementMap");
  const blurEl = svg.querySelector("feGaussianBlur");
  const state = { blur: 0, wobble: 0 };
  return {
    state,
    svg,
    blur: size * 0.14,
    wobble: size * 0.35,
    paint: () => { blurEl.setAttribute("stdDeviation", state.blur.toFixed(2)); disp.setAttribute("scale", state.wobble.toFixed(1)); },
    on: () => (el.style.filter = `url(#${id})`),
    off: () => { el.style.filter = ""; },
  };
}

// phase "now": the intro, wired as the page mounts: anything marked data-now plus anything
//   already on screen. It all waits for `ready` (the page slide finishing). Big ink headings
//   form first; the rest of the screen follows a beat later.
// phase "scroll": everything below the fold, wired once the page has settled.
const AFTER = 1; // how long the rest of the intro waits behind the ink headings

export function wire(root, { delay = 0, phase = "all", ready } = {}) {
  const vh = window.innerHeight;
  const intro = (el) => el.dataset.now != null || el.getBoundingClientRect().top < vh * 0.95;
  const want = (el) => {
    if (phase === "all") return true;
    if (phase === "now") { if (!intro(el)) return false; el.dataset.intro = "1"; return true; }
    return el.dataset.intro == null; // scroll phase: whatever the intro didn't take
  };
  const isIntro = (el) => phase !== "scroll" && el.dataset.intro != null;
  // play a paused animation once the slide is done, after `d` seconds
  const later = (anim, d) => (ready || Promise.resolve()).then(() => gsap.delayedCall(d, () => anim.play()));
  const scrollOnly = phase !== "now";
  const inks = [];
  // Below the fold, a section's ink heading leads: anything after it in the same section waits
  // until the heading has started forming (plus a beat), however the triggers happen to fire.
  const heads = new Map(); // heading el -> { started: Promise<ms>, go(ms) }
  const headFor = (el) => {
    const scope = el.closest("section, footer") || root;
    let lead = null;
    scope.querySelectorAll('[data-split="morph"]').forEach((h) => {
      if (h !== el && !h.contains(el) && h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) lead = h;
    });
    return lead && heads.get(lead);
  };
  // reveal `anim` when `el` scrolls in, but never before its section heading
  const onEnterAfterHead = (el, anim, d, start) => {
    const head = headFor(el);
    ScrollTrigger.create({
      trigger: el, start, once: true,
      onEnter: () => {
        if (!head) return gsap.delayedCall(d, () => anim.play());
        // fall back after a while in case the heading never triggers
        Promise.race([head.started, new Promise((r) => setTimeout(() => r(0), 2500))]).then((t) => {
          const since = t ? (performance.now() - t) / 1000 : AFTER;
          gsap.delayedCall(Math.max(0, AFTER - since) + d, () => anim.play());
        });
      },
    });
  };
  return gsap.context(() => {
    root.querySelectorAll("[data-split]").forEach((el) => {
      if (!want(el)) return;
      const d = delay + parseFloat(el.dataset.delay || 0);
      const first = isIntro(el);
      // "morph": ink. The heading starts as wet blobs that bleed together and pull themselves into
      // letters. An SVG goo filter does it: noise wobbles the edges, a blur melts neighbours into
      // each other, and a hard alpha threshold turns the soft mess back into crisp ink. Easing the
      // blur and wobble to zero leaves the real text.
      if (el.dataset.split === "morph") {
        const ink = makeInk(el);
        inks.push(ink);
        let mark;
        const started = new Promise((r) => (mark = r));
        heads.set(el, { started });
        SplitText.create(el, {
          type: "words,chars",
          autoSplit: true,
          onSplit: (self) => {
            const tl = gsap.timeline({ paused: true, onStart: () => { ink.on(); mark(performance.now()); }, onComplete: ink.off }); // filter off once done so the text is sharp
            // drops land in random order and spread out from a point
            tl.from(self.chars, {
              opacity: 0,
              scale: 0.15,
              yPercent: () => gsap.utils.random(-25, 25),
              duration: 1.3,
              ease: "power3.out",
              stagger: { each: 0.035, from: "random" },
            }, 0);
            tl.fromTo(ink.state, { blur: ink.blur, wobble: ink.wobble }, { blur: 0, wobble: 0, duration: 2, ease: "power2.inOut", onUpdate: ink.paint }, 0);
            if (first) later(tl, d);
            else ScrollTrigger.create({ trigger: el, start: "clamp(top 88%)", once: true, onEnter: () => gsap.delayedCall(d, () => tl.play()) });
            return tl;
          },
        });
        return;
      }
      const chars = el.dataset.split === "chars";
      SplitText.create(el, {
        type: chars ? "lines,chars" : "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true, // re-splits when fonts load or the width changes
        onSplit: (self) => {
          const tw = gsap.from(chars ? self.chars : self.lines, {
            yPercent: 115,
            rotate: chars ? 6 : 0,
            duration: chars ? 1.1 : 1.2,
            ease: EASE,
            stagger: chars ? 0.022 : 0.09,
            paused: true,
          });
          if (first) later(tw, d + AFTER);
          else onEnterAfterHead(el, tw, d, "clamp(top 90%)");
          return tw;
        },
      });
    });

    root.querySelectorAll("[data-fade]").forEach((el) => {
      if (!want(el)) return;
      const d = delay + parseFloat(el.dataset.delay || 0);
      const first = isIntro(el);
      const tw = gsap.from(el, { opacity: 0, y: 48, duration: 1.3, ease: EASE, paused: true });
      if (first) later(tw, d + AFTER);
      else onEnterAfterHead(el, tw, d, "clamp(top 92%)");
    });

    if (scrollOnly) root.querySelectorAll("[data-clip]").forEach((el) => {
      gsap.fromTo(el,
        { clipPath: "inset(14% 8% 14% 8%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top 98%", end: "top 30%", scrub: true } });
    });

    if (scrollOnly) root.querySelectorAll("[data-speed]").forEach((el) => {
      const s = parseFloat(el.dataset.speed);
      gsap.fromTo(el, { yPercent: -s * 100 }, {
        yPercent: s * 100, ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    if (scrollOnly) root.querySelectorAll("[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end, duration: 1.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => (el.textContent = Math.round(obj.v)),
      });
    });
    return () => inks.forEach((k) => k.svg.remove());
  }, root);
}
