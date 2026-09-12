import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Glow orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-brand-500/30 -top-40 -left-40 animate-pulse-glow" />
      <div className="glow-orb w-[400px] h-[400px] bg-purple-500/20 top-40 -right-40 animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="glow-orb w-[300px] h-[300px] bg-cyan-500/20 bottom-0 left-1/2 animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span className="text-slate-300">Powered by Fine-tuned FinBERT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
        >
          Decode Market Mood<br />
          <span className="gradient-text">From Every Headline</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10"
        >
          Real-time sentiment analysis on financial news — turning raw headlines into
          <span className="text-brand-400 font-medium"> actionable insights</span> with
          state-of-the-art transformer models.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/demo"
            className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold flex items-center gap-2 hover:shadow-xl hover:shadow-brand-500/40 transition-all"
          >
            <Zap className="w-5 h-5" />
            Try Live Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#about"
            className="px-8 py-3.5 rounded-full glass glass-hover text-white font-medium transition-all"
          >
            Learn More
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { value: "95.4%", label: "Model Accuracy" },
            { value: "<200ms", label: "Response Time" },
            { value: "3", label: "Sentiment Classes" },
            { value: "77K+", label: "Training Samples" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-5">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </section>
  );
}