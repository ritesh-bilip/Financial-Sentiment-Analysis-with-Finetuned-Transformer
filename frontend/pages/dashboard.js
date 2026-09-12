import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { getStats, getHistory } from "@/lib/api";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { TrendingUp, TrendingDown, Minus, Activity } from "lucide-react";
import Head from "next/head";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [s, h] = await Promise.all([getStats(), getHistory(100)]);
      setStats(s);
      setHistory(h);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="pt-32"><Loader text="Fetching sentiment data..." /></div>
    </>
  );

  const dist = stats?.distribution || {};
  const pieData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [{
      data: [dist.positive || 0, dist.neutral || 0, dist.negative || 0],
      backgroundColor: ["#10b981", "#64748b", "#ef4444"],
      borderColor: "rgba(255,255,255,0.05)",
      borderWidth: 2,
    }],
  };

  const dates = {};
  history.forEach((h) => {
    const d = new Date(h.created_at).toLocaleDateString();
    if (!dates[d]) dates[d] = { positive: 0, neutral: 0, negative: 0 };
    dates[d][h.sentiment] = (dates[d][h.sentiment] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(dates),
    datasets: [
      { label: "Positive", data: Object.values(dates).map((d) => d.positive), backgroundColor: "#10b981", borderRadius: 6 },
      { label: "Neutral", data: Object.values(dates).map((d) => d.neutral), backgroundColor: "#64748b", borderRadius: 6 },
      { label: "Negative", data: Object.values(dates).map((d) => d.negative), backgroundColor: "#ef4444", borderRadius: 6 },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#94a3b8", font: { family: "Inter" } } },
    },
    scales: {
      x: { ticks: { color: "#64748b" }, grid: { color: "rgba(255,255,255,0.05)" } },
      y: { ticks: { color: "#64748b" }, grid: { color: "rgba(255,255,255,0.05)" } },
    },
  };

  return (
    <>
      <Head><title>Dashboard — FinSentiment</title></Head>
      <Navbar />
      <div className="pt-28 px-6 pb-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">
            Sentiment <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-slate-400 mb-8">Live analytics of all analyzed headlines</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Activity} label="Total Analyzed" value={stats?.total || 0} color="brand" />
          <StatCard icon={TrendingUp} label="Positive" value={dist.positive || 0} color="emerald" />
          <StatCard icon={Minus} label="Neutral" value={dist.neutral || 0} color="slate" />
          <StatCard icon={TrendingDown} label="Negative" value={dist.negative || 0} color="red" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-2xl p-6 md:col-span-1">
            <h3 className="font-semibold mb-4">Distribution</h3>
            <Pie data={pieData} options={{ plugins: { legend: { labels: { color: "#94a3b8" } } } }} />
          </div>
          <div className="glass rounded-2xl p-6 md:col-span-2">
            <h3 className="font-semibold mb-4">Trends by Date</h3>
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Recent Predictions</h3>
          {history.length === 0 ? (
            <p className="text-slate-400 text-sm">No predictions yet. Try the demo!</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.slice(0, 20).map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex-1 truncate mr-4 text-sm">{h.headline}</div>
                  <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                    h.sentiment === "positive" ? "bg-emerald-500/10 text-emerald-400" :
                    h.sentiment === "negative" ? "bg-red-500/10 text-red-400" :
                    "bg-slate-500/10 text-slate-300"
                  }`}>
                    {h.sentiment}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    brand: "text-brand-400 bg-brand-500/10 border-brand-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    slate: "text-slate-300 bg-slate-500/10 border-slate-500/20",
    red: "text-red-400 bg-red-500/10 border-red-500/20",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-5"
    >
      <div className={`w-10 h-10 rounded-xl ${colors[color]} border flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </motion.div>
  );
}