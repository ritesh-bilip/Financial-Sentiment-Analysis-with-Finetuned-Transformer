import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { predictSentiment } from "@/lib/api";

const samples = [
  "Apple reports record quarterly earnings, stock surges",
  "Tesla shares plunge on weak Q3 deliveries",
  "Federal Reserve keeps interest rates unchanged",
  "Nvidia beats revenue expectations, raises guidance",
  "Boeing faces new safety probe, shares tumble",
];

export default function DemoSection() {
  const [headline, setHeadline] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async (text) => {
    const input = text || headline;
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictSentiment(input);
      setResult(data);
    } catch (e) {
      setError(e.response?.data?.error || "Failed to analyze. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const getMeta = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return { icon: TrendingUp, color: "emerald", label: "Positive" };
      case "negative":
        return { icon: TrendingDown, color: "red", label: "Negative" };
      default:
        return { icon: Minus, color: "slate", label: "Neutral" };
    }
  };

  return (
    <section id="demo" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-brand-400 font-semibold text-sm uppercase tracking-widest">Live Demo</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Try It <span className="gradient-text">Right Now</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Type any financial headline and get instant AI-powered sentiment analysis.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass rounded-3xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyze()}
              placeholder="e.g. Apple stock surges after earnings beat..."
              className="flex-1 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none text-white placeholder-slate-500 transition-all"
            />
            <button
              onClick={() => analyze()}
              disabled={loading || !headline.trim()}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold hover:shadow-lg hover:shadow-brand-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs text-slate-500 self-center">Try:</span>
            {samples.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setHeadline(s);
                  analyze(s);
                }}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-500/40 hover:bg-brand-500/10 text-slate-300 transition-all"
              >
                {s.slice(0, 40)}...
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <ResultCard result={result} getMeta={getMeta} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ResultCard({ result, getMeta }) {
  const meta = getMeta(result.sentiment);
  const Icon = meta.icon;
  const maxScore = Math.max(...Object.values(result.confidence_scores));

  const colorMap = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", bar: "bg-emerald-500", border: "border-emerald-500/30" },
    red: { bg: "bg-red-500/10", text: "text-red-400", bar: "bg-red-500", border: "border-red-500/30" },
    slate: { bg: "bg-slate-500/10", text: "text-slate-300", bar: "bg-slate-500", border: "border-slate-500/30" },
  };
  const c = colorMap[meta.color];

  return (
    <div className="space-y-4">
      <div className={`flex items-center justify-between p-5 rounded-2xl ${c.bg} border ${c.border}`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${c.text}`} />
          </div>
          <div>
            <div className={`font-bold text-xl ${c.text}`}>{meta.label}</div>
            <div className="text-xs text-slate-400">Predicted Sentiment</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{(maxScore * 100).toFixed(1)}%</div>
          <div className="text-xs text-slate-400">Confidence</div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        <div className="text-xs text-slate-400 uppercase tracking-widest mb-3">Score Breakdown</div>
        {Object.entries(result.confidence_scores).map(([label, score]) => (
          <div key={label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="capitalize text-slate-300">{label}</span>
              <span className="text-slate-400">{(score * 100).toFixed(2)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full ${
                  label === "positive" ? "bg-emerald-500" :
                  label === "negative" ? "bg-red-500" : "bg-slate-500"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-slate-500 text-center">
        Analyzed at {new Date(result.created_at).toLocaleString()}
      </div>
    </div>
  );
}