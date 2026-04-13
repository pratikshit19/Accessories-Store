import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQS = [
  {
    q: "What materials are your accessories made from?",
    a: "We use premium materials including 925 sterling silver, 18k gold vermeil, genuine leather, and hand-sourced semi-precious stones. Every batch is quality-checked before dispatch."
  },
  {
    q: "How long does shipping take?",
    a: "Standard delivery takes 4–7 business days across India. Express shipping (1–2 days) is available at checkout for select pin codes."
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day hassle-free return policy on all items. Products must be unused and in original packaging. Initiate a return from your Orders page and we'll arrange a pickup."
  },
  {
    q: "Is my payment information secure?",
    a: "Absolutely. All payments are processed by Razorpay, a PCI-DSS compliant payment gateway. We never store your card details on our servers."
  },
  {
    q: "Can I modify or cancel my order?",
    a: "Orders can be modified or cancelled within 2 hours of placement. After that, the order enters fulfillment and cannot be changed. Contact us immediately if needed."
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship across all major pin codes in India. International shipping is on our roadmap — sign up for our newsletter to be the first to know."
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border-subtle last:border-b-0">
      <button
        className="w-full flex justify-between items-center py-6 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className={`font-light tracking-wide transition-colors ${open ? "text-white" : "text-text-muted group-hover:text-white"}`}>
          {faq.q}
        </span>
        <span className="flex-shrink-0 ml-6 text-text-muted">
          {open ? <FiMinus size={16} /> : <FiPlus size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-text-muted font-light leading-relaxed text-sm pb-6 pr-12">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted mb-4">Support</p>
          <h1 className="text-5xl font-light tracking-tight text-white mb-6">FAQ</h1>
          <div className="h-[1px] w-16 bg-white/20" />
        </div>

        <div className="border-t border-border-subtle">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>

        <div className="mt-20 p-10 glass-panel text-center">
          <p className="text-white font-light mb-2">Still have questions?</p>
          <p className="text-text-muted text-sm font-light mb-6">Our support team is here to help</p>
          <a
            href="/contact"
            className="inline-block border border-white text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
