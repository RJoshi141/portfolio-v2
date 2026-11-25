// Contact (after titarvl.framer.website/contact): a small label on the left, the big
// heading and a short note on the right, then an underlined form with mono labels and
// a bracketed submit.
// Sends to VITE_FORM_ENDPOINT (Formspree / Web3Forms) when it's set; otherwise Submit
// opens the visitor's mail app with everything filled in.
import { useRef, useState } from "react";
import sendGlass from "../../assets/nav/send-glass.svg";
import { usePageMotion } from "../shared";
import { Footer } from "../NextApp";

const EMAIL = "ritikajoshi141@gmail.com";
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const TOPICS = ["A role on your team", "A freelance project", "A collaboration", "Just saying hi"];

const label = "mono uppercase text-[0.72rem] md:text-[0.8rem] tracking-[0.04em]";
const input = "mt-2 w-full bg-transparent border-b border-[var(--line)] focus:border-[var(--fg)] outline-none py-2 text-lg md:text-xl placeholder:text-[var(--muted)]/60 transition-colors";

export default function Contact() {
  const root = useRef(null);
  usePageMotion(root);
  const [f, setF] = useState({ name: "", email: "", company: "", topic: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [err, setErr] = useState("");
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr(""); };

  const send = async (e) => {
    e.preventDefault();
    if (!f.message.trim()) return setErr("Write a message first.");
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) return setErr("That email doesn't look right.");
    const subject = `${f.topic || "Hello"}${f.name ? ` from ${f.name}` : ""}`;
    if (!ENDPOINT) {
      const body = [f.message, "", f.name && `Name: ${f.name}`, f.email && `Email: ${f.email}`, f.company && `Company: ${f.company}`].filter((x) => x !== false && x !== "").join("\n");
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...f, subject }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setF({ name: "", email: "", company: "", topic: "", message: "" });
    } catch {
      setStatus("error");
      setErr("Couldn't send. Email me directly instead.");
    }
  };

  // quiet and left aligned, in the same column as the About copy (after rachelchen.tech):
  // a couple of plain lines, the ways to reach me, then a simple form. Everything is there on load.
  const field = "mt-1.5 w-full bg-transparent border-b border-[var(--line)] focus:border-[var(--fg)] outline-none py-2 text-[0.95rem] placeholder:text-[var(--muted)]/60 transition-colors";
  const small = "text-[0.8rem] text-[var(--muted)]";
  return (
    <main ref={root} className="soft-ink px-5 md:px-10 pt-28 md:pt-[calc(30vh-0.15rem)]">
      <div className="max-w-[32rem]">
        <h1 className="sr-only">Contact</h1>
        <section className="space-y-3.5 text-[0.85rem] md:text-[0.9rem] leading-[1.55] text-[var(--muted)]">
          <p>Got a role, a product idea, or just want to talk shop? I'd love to hear from you.</p>
          <p>Send a note below and I'll get back to you within a couple of days.</p>
        </section>

        <ul className="mt-10 space-y-2 text-[0.85rem] md:text-[0.9rem]">
          {[["Email", EMAIL, `mailto:${EMAIL}`], ["LinkedIn", "ritika-joshi", "https://www.linkedin.com/in/ritika-joshi-9395591a7/"], ["GitHub", "RJoshi141", "https://github.com/RJoshi141"]].map(([k, v, h]) => (
            <li key={k} className="grid grid-cols-[6rem_minmax(0,1fr)]">
              <span className="text-[var(--muted)]">{k}</span>
              <a href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:underline underline-offset-4">{v}</a>
            </li>
          ))}
        </ul>

        <form onSubmit={send} className="mt-14 grid sm:grid-cols-2 gap-x-6 gap-y-7">
          <label className="block">
            <span className={small}>Name</span>
            <input className={field} value={f.name} onChange={set("name")} placeholder="Jane Smith" autoComplete="name" />
          </label>
          <label className="block">
            <span className={small}>Email</span>
            <input className={field} type="email" value={f.email} onChange={set("email")} placeholder="you@email.com" autoComplete="email" />
          </label>
          <label className="sm:col-span-2 block relative">
            <span className={small}>Topic</span>
            <select className={`${field} appearance-none pr-8 ${f.topic ? "" : "text-[var(--muted)]/60"}`} value={f.topic} onChange={set("topic")}>
              <option value="">Select a topic</option>
              {TOPICS.map((t) => <option key={t} value={t} className="text-black">{t}</option>)}
            </select>
            <svg aria-hidden width="12" height="12" viewBox="0 0 14 14" className="pointer-events-none absolute right-1 bottom-3.5"><path d="M2 5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
          </label>
          <label className="sm:col-span-2 block">
            <span className={small}>Message</span>
            <textarea className={`${field} min-h-[6rem] resize-y`} value={f.message} onChange={set("message")} placeholder="Type here..." />
          </label>
          <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
            {/* a white glass tile like the dock, with the glass paper plane */}
            <button type="submit" disabled={status === "sending"} className="no-red inline-flex items-center gap-2 rounded-[12px] border border-[#dcdcd9] bg-white/80 backdrop-blur-md px-4 py-2 text-[0.92rem] text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:opacity-80 transition-opacity">
              <img src={sendGlass} alt="" className="w-5 h-5" draggable={false} />
              {status === "sending" ? "Sending…" : status === "sent" ? "Sent, thank you" : "Send"}
            </button>
            {err && <p className="text-[0.85rem] text-red-500">{err}</p>}
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}
