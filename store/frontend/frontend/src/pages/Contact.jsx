import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail, FiInstagram, FiTwitter } from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, wire this to an email service or backend endpoint
    setSent(true);
  };

  const inputStyle = "w-full bg-surface border border-border-subtle text-white px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors font-light placeholder:text-text-muted/30";
  const labelStyle = "block text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium mb-2";

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted mb-4">Get in touch</p>
          <h1 className="text-5xl font-light tracking-tight text-white mb-6">Contact</h1>
          <div className="h-[1px] w-16 bg-white/20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form */}
          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-10 text-center space-y-4"
              >
                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mx-auto">
                  <FiSend className="text-white" />
                </div>
                <h3 className="text-white font-light text-xl">Message sent</h3>
                <p className="text-text-muted text-sm font-light">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="text-[10px] uppercase tracking-widest text-text-muted hover:text-white transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className={labelStyle}>Your Name</label>
                  <input name="name" placeholder="John Doe" className={inputStyle} value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <label className={labelStyle}>Email Address</label>
                  <input name="email" type="email" placeholder="you@example.com" className={inputStyle} value={form.email} onChange={handleChange} required />
                </div>
                <div>
                  <label className={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="How can we help you?"
                    className={`${inputStyle} resize-none`}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-all flex items-center justify-center gap-3"
                >
                  <FiSend size={14} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xs tracking-[0.3em] text-text-muted uppercase mb-6 font-medium">Contact Info</h3>
              <div className="space-y-4 text-sm font-light">
                <div className="flex items-center gap-3 text-text-muted hover:text-white transition-colors">
                  <FiMail size={16} />
                  <a href="mailto:hello@vearo.in">hello@vearo.in</a>
                </div>
                <p className="text-text-muted font-light">Mon – Fri · 10am – 6pm IST</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.3em] text-text-muted uppercase mb-6 font-medium">Social</h3>
              <div className="flex gap-4">
                {[
                  { Icon: FiInstagram, label: "Instagram", href: "#" },
                  { Icon: FiTwitter, label: "Twitter", href: "#" },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="border border-border-subtle p-3 text-text-muted hover:border-white/30 hover:text-white transition-all"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-border-subtle p-8">
              <h3 className="text-white font-light mb-3">Response Time</h3>
              <p className="text-text-muted text-sm font-light leading-relaxed">
                We aim to respond to all inquiries within 24 business hours. For urgent matters, 
                please mention "URGENT" in your subject.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
