import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Layers, Globe, LineChart, Shield, Code2 } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Real-Time Sentiment",
    desc: "Instant classification of single headlines with sub-200ms latency and 99%+ confidence.",
    tag: "Live API",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    desc: "Upload CSV feeds and analyze thousands of headlines in a single request.",
    tag: "Bulk",
  },
  {
    icon: Code2,
    title: "REST API",
    desc: "Simple JSON endpoints for seamless integration with trading bots and dashboards.",
    tag: "Developer",
  },
  {
    icon: LineChart,
    title: "Analytics Dashboard",
    desc: "Interactive charts showing sentiment distribution and trends over time.",
    tag: "Visual",
  },
  {
    icon: Globe,
    title: "WebSocket Streaming",
    desc: "Subscribe to real-time sentiment pushes for live news feeds and alerts.",
    tag: "Realtime",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    desc: "Dockerized deployment, PostgreSQL persistence, and horizontal scaling out of the box.",
    tag: "Production",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="relative py-24 px-6">
      <div className="glow-orb w-[500px] h-[500px] bg-brand-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-brand-400 font-semibold text-sm uppercase tracking-widest">Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Everything You Need to <span className="gradient-text">Analyze Market Sentiment</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass glass-hover rounded-2xl p-6 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl group-hover:bg-brand-500/20 transition-colors" />

              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/30 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 font-medium">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}