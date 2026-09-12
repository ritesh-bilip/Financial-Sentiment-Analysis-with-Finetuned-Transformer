import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Fin<span className="gradient-text">Sentiment</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#about" className="hover:text-brand-400 transition-colors">About</a>
          <a href="#how" className="hover:text-brand-400 transition-colors">How It Works</a>
          <a href="#services" className="hover:text-brand-400 transition-colors">Services</a>
          <a href="#demo" className="hover:text-brand-400 transition-colors">Demo</a>
          <Link href="/dashboard" className="hover:text-brand-400 transition-colors">Dashboard</Link>
        </div>

        <Link
          href="/demo"
          className="px-5 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/40 transition-all"
        >
          Try Now
        </Link>
      </div>
    </motion.nav>
  );
}