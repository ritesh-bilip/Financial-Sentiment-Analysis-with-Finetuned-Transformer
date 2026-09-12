import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, LineChart, Newspaper, Target } from "lucide-react";

const features = [
  {
    icon: Newspaper,
    title: "Financial News at Scale",
    desc: "Process thousands of headlines per second from any source — Reuters, Bloomberg, Twitter, and more.",
  },
  {
    icon: Brain,
    title: "Fine-tuned FinBERT",
    desc: "Domain-adapted transformer model trained on 77K+ financial sentences for superior accuracy.",
  },
  {
    icon: Target,
    title: "3-Way Classification",
    desc: "Precisely identifies Positive, Negative, or Neutral sentiment with calibrated confidence scores.",
  },
  {
    icon: LineChart,
    title: "Trend Analytics",
    desc: "Track sentiment shifts across time, companies, and sectors with interactive dashboards.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-brand-400 font-semibold text-sm uppercase tracking-widest">About</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            What This Project <span className="gradient-text">Actually Does</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We built a production-grade sentiment analysis system that transforms
            unstructured financial news into structured, machine-readable signals
            for traders, analysts, and fintech applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass glass-hover rounded-2xl p-6 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/30 flex items-center justify-center mb-5">
                <f.icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}