import { TrendingUp, Globe, Send, Share2 } from "lucide-react";

export default function Footer() {
  const socials = [
    { Icon: Globe, href: "https://github.com", label: "Website" },
    { Icon: Send, href: "https://twitter.com", label: "Twitter" },
    { Icon: Share2, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">
                Fin<span className="gradient-text">Sentiment</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Production-grade financial sentiment analysis powered by a fine-tuned
              FinBERT transformer. Turning news into actionable market signals.
            </p>
          </div>

          <div>
            <div className="font-semibold mb-4 text-sm">Product</div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/demo" className="hover:text-brand-400 transition-colors">Live Demo</a></li>
              <li><a href="/dashboard" className="hover:text-brand-400 transition-colors">Dashboard</a></li>
              <li><a href="#services" className="hover:text-brand-400 transition-colors">Services</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-4 text-sm">Connect</div>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-brand-500/20 transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-slate-500">
          <div>© {new Date().getFullYear()} FinSentiment. All rights reserved.</div>
          <div>Built with FinBERT, Django, and Next.js</div>
        </div>
      </div>
    </footer>
  );
}