import { motion } from "framer-motion";

const TEAM = [
  { name: "Priya Sharma", role: "Creative Director" },
  { name: "Arjun Mehta", role: "Head of Design" },
  { name: "Riya Kapoor", role: "Brand Strategist" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-28"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted mb-6">Our Story</p>
          <h1 className="text-6xl font-light tracking-tight text-white leading-tight mb-10">
            Crafted with<br /><span className="italic font-serif">intention</span>
          </h1>
          <div className="h-[1px] w-16 bg-white/20 mb-10" />
          <p className="text-text-muted font-light leading-relaxed text-lg max-w-2xl">
            Vearo was founded on a simple belief: that truly beautiful accessories should be 
            accessible without compromise. Every piece in our collection is a result of months 
            of research, deliberate material selection, and relentless refinement.
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border-subtle mb-28">
          {[
            { label: "Quality First", body: "We source only the finest materials, ensuring every product stands the test of time." },
            { label: "Minimal Design", body: "Less is more. Our pieces are defined by what we leave out, not just what we put in." },
            { label: "Ethical Sourcing", body: "We partner with artisans and suppliers who share our commitment to fair practices." },
          ].map(({ label, body }) => (
            <div key={label} className="bg-surface p-10">
              <h3 className="text-white font-medium mb-4 tracking-wide">{label}</h3>
              <p className="text-text-muted font-light text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-28 text-center">
          {[
            { value: "5+", label: "Years of craft" },
            { value: "10K+", label: "Happy customers" },
            { value: "100%", label: "Ethically made" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-5xl font-light text-white mb-2">{value}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-light">{label}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-text-muted mb-10 font-light">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map(({ name, role }) => (
              <div key={name} className="border border-border-subtle p-8 hover:border-white/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-surface mb-6 flex items-center justify-center text-white font-light text-xl">
                  {name[0]}
                </div>
                <p className="text-white font-light">{name}</p>
                <p className="text-text-muted text-xs tracking-widest uppercase mt-1 font-light">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
