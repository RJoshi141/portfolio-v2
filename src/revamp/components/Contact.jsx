import { useState } from "react";

const EMAIL = "ritikajoshi141@gmail.com";
// Optional: set VITE_FORM_ENDPOINT (Formspree/Web3Forms URL) in .env to send from the page.
// Without it, Send opens the visitor's mail app pre-filled.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const Row = ({ label, children }) => (
  <label className="grid grid-cols-[72px_1fr] md:grid-cols-[110px_1fr] items-center gap-4 py-4 md:py-5 border-b border-neutral-700/60">
    <span className="text-base md:text-lg text-neutral-500">{label}</span>
    {children}
  </label>
);

const field = "w-full bg-transparent text-base md:text-lg text-white placeholder:text-neutral-600 outline-none";

export default function Contact() {
  const [form, setForm] = useState({ from: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    setError("");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked, ignore */
    }
  };

  const send = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) return setError("Write a message first.");
    if (form.from && !/^\S+@\S+\.\S+$/.test(form.from)) return setError("That email doesn't look right.");

    if (!ENDPOINT) {
      const body = form.from ? `${form.message}\n\nFrom: ${form.from}` : form.message;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: form.from, subject: form.subject, message: form.message }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ from: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setError("Couldn't send. Try emailing me directly.");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 px-5 md:px-12 pt-32 md:pt-44">
      <h2 className="text-center text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[1.05] text-white">
        Building something
        <br />
        new? Let's talk.
      </h2>

      <form
        onSubmit={send}
        className="mt-14 md:mt-20 mx-auto max-w-3xl bg-neutral-900 rounded-[1.75rem] md:rounded-[2.25rem] px-6 md:px-14 py-6 md:py-10"
      >
        <div className="grid grid-cols-[72px_1fr_auto] md:grid-cols-[110px_1fr_auto] items-center gap-4 py-4 md:py-5 border-b border-neutral-700/60">
          <span className="text-base md:text-lg text-neutral-500">To</span>
          <span className="text-base md:text-lg text-white truncate">{EMAIL}</span>
          <button type="button" onClick={copy} className="text-sm md:text-base text-neutral-500 hover:text-white transition-colors">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <Row label="From">
          <input type="email" value={form.from} onChange={set("from")} placeholder="you@example.com" className={field} />
        </Row>
        <Row label="Subject">
          <input value={form.subject} onChange={set("subject")} className={field} />
        </Row>
        <label className="block pt-4 md:pt-5">
          <span className="sr-only">Message</span>
          <textarea
            value={form.message}
            onChange={set("message")}
            placeholder="Message"
            rows={5}
            className={`${field} resize-none placeholder:text-neutral-500`}
          />
        </label>

        <div className="mt-6 flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-7 py-3 rounded-full border border-neutral-700 text-base md:text-lg text-white hover:bg-white hover:text-black transition-colors"
          >
            {status === "sending" ? "Sending" : status === "sent" ? "Sent" : "Send"}
          </button>
          {error && <p className="text-sm text-carnation">{error}</p>}
        </div>
      </form>
    </section>
  );
}
