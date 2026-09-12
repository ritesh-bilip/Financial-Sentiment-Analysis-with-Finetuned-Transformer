import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Cpu, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Input Headline",
    desc: "User submits a financial headline or batch of headlines through our API or web interface.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analysis",
    desc: "The fine-tuned FinBERT transformer tokenizes and classifies the text in under 200ms.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Actionable Output",
    desc: "Receive sentiment label, confidence scores, and integration-ready JSON for downstream use.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how" ref={ref} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-brand-400 font-semibold text-sm uppercase tracking-widest">Pipeline</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            From raw headline to actionable signal — three simple steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="glass glass-hover rounded-2xl p-8 transition-all h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30">
                    <s.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-4xl font-black text-white/5">{s.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-brand-500/20 border border-brand-500/40">
                  <ArrowRight className="w-4 h-4 text-brand-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}