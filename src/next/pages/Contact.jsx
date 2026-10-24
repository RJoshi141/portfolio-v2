// Contact (after titarvl.framer.website/contact): a small label on the left, the big
// heading and a short note on the right, then an underlined form with mono labels and
// a bracketed submit.
// Sends to VITE_FORM_ENDPOINT (Formspree / Web3Forms) when it's set; otherwise Submit
// opens the visitor's mail app with everything filled in.
import { useRef, useState } from "react";
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

  return (
    <main ref={root} className="px-5 md:px-10 pt-36 md:pt-52">
      <section className="grid md:grid-cols-2 gap-10">
        <p data-fade data-now className={label}>Contact</p>
        <div className="relative">
          <p data-fade data-now className={`${label} absolute right-0 top-0 hidden md:block`}>Inquiry</p>
          <h1 data-split="morph" data-now className="text-[17vw] md:text-[6.5vw] leading-[0.9] tracking-[-0.055em]">
            Say <span className="serif italic tracking-[-0.02em]">hello</span>
          </h1>
          <p data-fade data-now data-delay="0.4" className="mt-6 max-w-md text-base md:text-lg font-medium leading-[1.4]">
            Got a role, a product idea, or just want to talk shop? Send a note and I'll get back to you within a couple of days.
          </p>

          <form onSubmit={send} data-fade data-now data-delay="0.6" className="mt-16 md:mt-24 grid md:grid-cols-2 gap-x-6 gap-y-10">
            <label className="md:col-span-2 block">
              <span className={label}>Name</span>
              <input className={input} value={f.name} onChange={set("name")} placeholder="Jane Smith" autoComplete="name" />
            </label>
            <label className="block">
              <span className={label}>Email</span>
              <input className={input} type="email" value={f.email} onChange={set("email")} placeholder="you@email.com" autoComplete="email" />
            </label>
            <label className="block">
              <span className={label}>Company</span>
              <input className={input} value={f.company} onChange={set("company")} placeholder="Optional" autoComplete="organization" />
            </label>
            <label className="md:col-span-2 block relative">
              <span className={label}>Topic</span>
              <select className={`${input} appearance-none pr-8 ${f.topic ? "" : "text-[var(--muted)]/60"}`} value={f.topic} onChange={set("topic")}>
                <option value="">Select topic</option>
                {TOPICS.map((t) => <option key={t} value={t} className="text-black">{t}</option>)}
              </select>
              <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" className="pointer-events-none absolute right-1 bottom-4"><path d="M2 5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </label>
            <label className="md:col-span-2 block">
              <span className={label}>Your message</span>
              <textarea className={`${input} min-h-[7rem] resize-y`} value={f.message} onChange={set("message")} placeholder="Type here..." />
            </label>
            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4">
              <button type="submit" disabled={status === "sending"} className={`${label} hover:opacity-60 transition-opacity`}>
                [ {status === "sending" ? "Sending" : status === "sent" ? "Sent, thank you" : "Submit"} ]
              </button>
              <p className={`text-sm ${err ? "text-red-500" : "text-[var(--muted)]"}`}>
                {err || <>Or email <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">{EMAIL}</a></>}
              </p>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
