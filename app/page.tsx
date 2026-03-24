import Link from "next/link";
import { ArrowRight, TrendingUp, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-industrial-bg text-industrial-fg overflow-x-hidden">
      {/* Grid Lines Background */}
      <div className="fixed inset-0 grid-lines pointer-events-none z-0 max-w-[1600px] mx-auto" />

      {/* Header */}
      <header className="sticky top-0 z-50 h-20 bg-industrial-bg/80 backdrop-blur-md border-b border-industrial-border">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Left - Nav */}
          <nav className="flex gap-8">
            {["Simulateur", "Méthode", "Tarifs"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-industrial-fg/70 hover:text-industrial-fg transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Center - Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-1">
            <span className="font-playfair italic text-2xl">Wealth</span>
            <span className="font-inter font-black text-xl">SIMULATOR</span>
          </div>

          {/* Right - CTA */}
          <Link href="/simulator">
            <button className="px-6 py-3 rounded-full border border-industrial-fg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-industrial-fg hover:text-industrial-bg transition-all duration-300">
              Démarrer
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-[1600px] mx-auto px-6 w-full">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Content - 7 cols */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center py-20">
              {/* Status */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-green-500 status-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-industrial-fg/60">
                  Simulateur en ligne
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="space-y-2 mb-8">
                <span className="block text-7xl sm:text-8xl lg:text-9xl font-black tracking-[-0.05em] leading-[0.9]">
                  PROJETEZ
                </span>
                <span className="block text-7xl sm:text-8xl lg:text-9xl font-playfair italic tracking-[-0.02em] leading-[0.9]">
                  votre
                </span>
                <span className="block stroke-text text-7xl sm:text-8xl lg:text-9xl font-black tracking-[-0.05em] leading-[0.9]">
                  AVENIR
                </span>
              </h1>

              {/* Technical Readout */}
              <div className="flex gap-8 mb-10 text-[10px] font-mono uppercase tracking-[0.2em] text-industrial-fg/50">
                <div>
                  <span className="block text-industrial-accent">01</span>
                  <span>Simulation</span>
                </div>
                <div>
                  <span className="block text-industrial-accent">02</span>
                  <span>Multi-actifs</span>
                </div>
                <div>
                  <span className="block text-industrial-accent">03</span>
                  <span>Monte Carlo</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/simulator">
                <button className="group flex items-center gap-4 px-8 py-4 bg-industrial-fg text-industrial-bg text-sm font-bold uppercase tracking-[0.1em] hover:bg-industrial-accent transition-colors duration-300"
                >
                  Lancer la simulation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 group-hover:rotate-[-45deg] transition-transform duration-300" />
                </button>
              </Link>
            </div>

            {/* Right Visual - 5 cols */}
            <div className="col-span-12 lg:col-span-5 relative">
              <div className="relative aspect-[4/5] bg-industrial-fg/5 border border-industrial-border">
                {/* Frame */}
                <div className="absolute inset-5 border border-industrial-border/50">
                  {/* Glass Card */}
                  <div className="absolute bottom-10 left-10 right-10 p-6 bg-industrial-bg/80 backdrop-blur-md border border-industrial-border">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-industrial-fg/50 mb-4">
                      System Status
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Actions", value: "10.2%", color: "bg-green-500" },
                        { label: "Immobilier", value: "5.5%", color: "bg-blue-500" },
                        { label: "Crypto", value: "85.0%", color: "bg-purple-500" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${item.color}`} />
                          <span className="text-xs font-mono">{item.label}</span>
                          <span className="ml-auto text-xs font-mono text-industrial-accent">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <section className="h-[120px] bg-[#F4F4F5] border-y border-industrial-border overflow-hidden flex items-center">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-6xl font-black stroke-text mx-8">SIMULATION</span>
              <Star className="w-8 h-8 text-industrial-accent fill-industrial-accent mx-4" />
              <span className="text-6xl font-playfair italic mx-8">patrimoniale</span>
              <Star className="w-8 h-8 text-industrial-accent fill-industrial-accent mx-4" />
              <span className="text-6xl font-black stroke-text mx-8">PROJECTION</span>
              <Star className="w-8 h-8 text-industrial-accent fill-industrial-accent mx-4" />
              <span className="text-6xl font-playfair italic mx-8">multi-actifs</span>
              <Star className="w-8 h-8 text-industrial-accent fill-industrial-accent mx-4" />
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-industrial-border">
          {[
            {
              number: "01",
              title: "Multi-Actifs",
              desc: "Actions, immobilier, crypto, or, obligations. Diversifiez votre portefeuille.",
            },
            {
              number: "02",
              title: "Monte Carlo",
              desc: "1000 scénarios de simulation pour évaluer les probabilités de succès.",
            },
            {
              number: "03",
              title: "Données Réelles",
              desc: "Rendements historiques de 1928 à aujourd'hui. Sources académiques.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-industrial-bg p-10 group hover:bg-industrial-fg hover:text-industrial-bg transition-colors duration-500"
            >
              <span className="text-[10px] font-mono text-industrial-accent">{feature.number}</span>
              <h3 className="text-2xl font-black mt-4 mb-3">{feature.title}</h3>
              <p className="text-sm text-industrial-fg/60 group-hover:text-industrial-bg/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-industrial-fg text-industrial-bg py-20">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="mb-20">
            <Link href="/simulator">
              <span className="text-4xl font-black border-b-2 border-industrial-accent pb-2 hover:text-industrial-accent transition-colors cursor-pointer">
                Commencer la simulation →
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 status-pulse" />
              <span>System Operational</span>
            </div>
            <span>© {new Date().getFullYear()} Wealth Simulator</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
