"use client";
import { useState } from "react";
import { Mail, Send, CheckCircle, AlertTriangle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { jetbrainsMono } from "@/app/font";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      toast.error("Name must be between 2 and 50 characters.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (trimmedMessage.length < 10 || trimmedMessage.length > 1000) {
      toast.error("Message must be between 10 and 1000 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Fail fast if keys are missing or left as default template strings
      if (
        !serviceId ||
        !templateId ||
        !publicKey ||
        serviceId === "your_service_id" ||
        serviceId.includes("service_xxxxx") ||
        templateId === "your_template_id" ||
        templateId.includes("template_xxxxx") ||
        publicKey === "your_public_key" ||
        publicKey.includes("xxxxxx")
      ) {
        throw new Error("EmailJS service credentials are not configured.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          message: form.message.trim(),
        },
        publicKey
      );

      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error?.text || error?.message || "Unknown error");
      setStatus("error");
      toast.error("Failed to send message.");
    }
  };

    return (
    <div id="contact" className={`${jetbrainsMono.className} w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 md:py-40 text-foreground scroll-mt-28`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto text-center mb-16 md:mb-24"
      >
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">
          Get In Touch
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mt-2 mb-4">
          Contact Me
        </h2>
        <p className="text-zinc-400">Let&apos;s build something amazing together.</p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 lg:pr-10"
        >
          <div>
            <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
              Got an idea? <br />
              <span className="text-zinc-500">Let&apos;s bring it to life.</span>
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Whether you have a question, a project proposal, or just want to connect, I&apos;m always open to discussing new opportunities and creative collaborations.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-[#e8390d]/10 flex items-center justify-center text-[#e8390d] group-hover:bg-[#e8390d] group-hover:text-white transition-all duration-300">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Email Me</p>
                <a href="mailto:2002guptaadi@gmail.com" className="text-zinc-200 hover:text-[#e8390d] transition-colors font-medium">
                  2002guptaadi@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-[#e8390d]/10 flex items-center justify-center text-[#e8390d] group-hover:bg-[#e8390d] group-hover:text-white transition-all duration-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Connect on LinkedIn</p>
                <a href="https://linkedin.com/in/adigupta1620" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-[#e8390d] transition-colors font-medium">
                  adigupta1620
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Subtle glowing backdrop for the form */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#e8390d]/5 to-transparent rounded-3xl blur-2xl -z-10" />
          
          <div className="bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            {status === "success" && (
              <div className="p-8 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="font-bold text-2xl text-emerald-400">Message Sent!</h3>
                <p className="text-zinc-400">Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all font-medium text-sm"
                >
                  Send Another
                </button>
              </div>
            )}

            {status === "error" && (
              <div className="p-8 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="font-bold text-2xl text-red-400">Oops, something went wrong.</h3>
                <p className="text-zinc-400 text-sm">
                  {errorMessage || "Failed to send the message. Please try directly via email."}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all font-medium text-sm"
                >
                  Try Again
                </button>
              </div>
            )}

            {status !== "success" && status !== "error" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      disabled={status === "sending"}
                      value={form.name}
                      onChange={handleChange}
                      className="rounded-2xl p-4 bg-black/40 border border-white/10 text-white placeholder:text-zinc-600 focus:border-[#e8390d]/50 focus:ring-1 focus:ring-[#e8390d]/20 focus:bg-black/60 outline-none transition-all duration-300 disabled:opacity-50 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      disabled={status === "sending"}
                      value={form.email}
                      onChange={handleChange}
                      className="rounded-2xl p-4 bg-black/40 border border-white/10 text-white placeholder:text-zinc-600 focus:border-[#e8390d]/50 focus:ring-1 focus:ring-[#e8390d]/20 focus:bg-black/60 outline-none transition-all duration-300 disabled:opacity-50 w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                    disabled={status === "sending"}
                    value={form.message}
                    onChange={handleChange}
                    className="rounded-2xl p-4 bg-black/40 border border-white/10 text-white placeholder:text-zinc-600 focus:border-[#e8390d]/50 focus:ring-1 focus:ring-[#e8390d]/20 focus:bg-black/60 outline-none transition-all duration-300 resize-none disabled:opacity-50 w-full"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#e8390d] text-white font-bold text-sm hover:bg-[#ff4f24] hover:shadow-[0_0_30px_rgba(232,57,13,0.3)] transition-all duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed group"
                >
                  {status === "sending" ? "Sending..." : "Send Message"} 
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
