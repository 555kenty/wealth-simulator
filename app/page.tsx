"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play, Shield, Sparkles, Cloud, Plus, Minus, TrendingUp } from "lucide-react";

// Client-side only component for 3D parallax
function Dashboard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateY = (mouseX / rect.width) * 20;
      const rotateX = -(mouseY / rect.height) * 20;
      
      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="parallax-3d w-full max-w-4xl mx-auto"
      style={{ perspective: "2000px" }}
    >
      <div 
        className="glass-xl rounded-3xl p-8 grid grid-cols-12 gap-6 transform-gpu transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Left - Search & Collections */}
        <div className="col-span-3 space-y-4">
          <div className="glass rounded-xl p-3">
            <input 
              type="text" 
              placeholder="Rechercher..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-cinematic-slate/50"
              readOnly
            />
          </div>
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-cinematic-slate">Portefeuilles</div>
            {["Actions", "Immobilier", "Crypto"].map((item) => (
              <div key={item} className="flex items-center gap-3 p-2 glass rounded-lg">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Main Display */}
        <div className="col-span-6 flex flex-col items-center justify-center py-8">
          <button className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 animate-glow">
            <Play className="w-8 h-8 text-cinematic-bg ml-1" fill="currentColor" />
          </button>
          <div className="text-center">
            <div className="text-2xl font-cabinet font-bold text-metallic">Simulation Active</div>
            <div className="text-sm text-cinematic-slate mt-1">Projection sur 30 ans</div>
          </div>
        </div>

        {/* Right - Calendar */}
        <div className="col-span-3 space-y-4">
          <div className="glass rounded-xl p-4">
            <div className="text-center">
              <div className="text-3xl font-cabinet font-bold">24</div>
              <div className="text-xs text-cinematic-slate">Mars 2026</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-cinematic-slate">À venir</div>
            {["Revue trimestrielle", "Réinvestissement"].map((item) => (
              <div key={item} className="text-xs p-2 glass rounded-lg text-cinematic-slate">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-cinematic-bg text-cinematic-white">
      {/* Portal Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Radial gradient pulse */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] animate-portal"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 50%)",
          }}
        />
        
        {/* Rotating rings */}
        <svg 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] animate-ring-slow opacity-20"
          viewBox="0 0 800 800"
>
          <circle 
            cx="400" cy="400" r="380" 
            fill="none" 
            stroke="white" 
            strokeWidth="1"
            strokeDasharray="1,10"
          />
        </svg>
        
        <svg 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-ring-slower opacity-30"
          viewBox="0 0 600 600"
        >
          <circle 
            cx="300" cy="300" r="280" 
            fill="none" 
            stroke="white" 
            strokeWidth="2"
            strokeDasharray="4,20"
          />
        </svg>
      </div>

      {/* Floating Navigation */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="glass rounded-full px-2 py-2 flex items-center gap-1">
          {/* Logo */}
          <div className="flex items-center gap-2 px-4">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="font-cabinet font-bold text-sm tracking-wider">WEALTH</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-1">
            {["Simulateur", "Méthode", "Tarifs"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-4 py-2 text-sm text-cinematic-slate hover:text-white transition-colors rounded-full"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <Link href="/simulator">
            <button className="ml-2 px-5 py-2 bg-white text-cinematic-bg rounded-full text-sm font-semibold hover:bg-cinematic-slate transition-colors"
            >
              Démarrer
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="font-cabinet font-extrabold text-7xl sm:text-8xl lg:text-9xl tracking-tight text-metallic mb-8">
            Maîtrisez votre
            <br />
            <span className="text-white">avenir financier</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-cinematic-slate max-w-2xl mx-auto leading-relaxed">
            Simulez l'évolution de votre patrimoine avec des données de marché réelles 
            et des projections Monte Carlo avancées.
          </p>

          <div className="flex gap-4 justify-center mt-10">
            <Link href="/simulator">
              <button className="group flex items-center gap-3 px-8 py-4 bg-white text-cinematic-bg rounded-full font-semibold hover:bg-cinematic-slate transition-all">
                Lancer la simulation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* 3D Dashboard Mockup */}
        <Dashboard3D />
      </section>

      {/* Logo Marquee */}
      <section className="py-16 border-y border-white/10 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {["S&P 500", "NASDAQ", "CAC 40", "BITCOIN", "ETHEREUM", "OR", "IMMOBILIER"].map((logo) => (
                <span key={logo} className="mx-12 text-2xl font-cabinet text-slate-700 uppercase tracking-widest">
                  {logo}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Card 1 - Large */}
          <div className="md:col-span-2 md:row-span-2 glass rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-cabinet font-bold text-3xl mb-2">Multi-Actifs</h3>
              <p className="text-cinematic-slate">Actions, immobilier, crypto, or, obligations. Diversifiez votre portefeuille avec des données historiques réelles.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass rounded-3xl p-6 flex flex-col justify-between group hover:border-white/20 transition-colors">
            <Shield className="w-10 h-10 text-emerald-400" />
            <div>
              <h3 className="font-cabinet font-bold text-xl">Monte Carlo</h3>
              <p className="text-sm text-cinematic-slate mt-1">1000 scénarios</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass rounded-3xl p-6 flex flex-col justify-between group hover:border-white/20 transition-colors">
            <Sparkles className="w-10 h-10 text-amber-400" />
            <div>
              <h3 className="font-cabinet font-bold text-xl">Données Réelles</h3>
              <p className="text-sm text-cinematic-slate mt-1">1928-2024</p>
            </div>
          </div>

          {/* Card 4 - Wide */}
          <div className="md:col-span-2 glass rounded-3xl p-8 flex items-center gap-8 group hover:border-white/20 transition-colors">
            <div className="flex-1">
              <h3 className="font-cabinet font-bold text-2xl mb-2">Visualisations Avancées</h3>
              <p className="text-cinematic-slate">Graphiques interactifs et projections détaillées.</p>
            </div>
            <div className="w-32 h-20 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
              <Cloud className="w-10 h-10 text-slate-500" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="font-cabinet font-bold text-4xl text-center mb-12">Questions fréquentes</h2>
        
        <div className="space-y-4">
          {[
            { q: "Comment fonctionne la simulation ?", a: "Notre moteur calcule l'évolution de votre patrimoine année par année en prenant en compte vos revenus, vos dépenses, et les rendements historiques de vos actifs." },
            { q: "Les données sont-elles sécurisées ?", a: "Absolument. Toutes les simulations sont stockées localement dans votre navigateur. Aucune donnée financière n'est transmise à nos serveurs." },
            { q: "Qu'est-ce que Monte Carlo ?", a: "C'est une méthode statistique qui génère des milliers de scénarios possibles pour évaluer les probabilités de succès de votre stratégie financière." },
            { q: "Puis-je simuler plusieurs scénarios ?", a: "Oui, vous pouvez comparer différentes allocations d'actifs et stratégies de réinvestissement côte à côte." },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`glass rounded-3xl overflow-hidden transition-all ${faqOpen === i ? 'faq-open' : ''}`}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              >
                <span className="font-medium">{item.q}</span>
                <div className={`faq-icon ${faqOpen === i ? 'rotate-180' : ''}`}>
                  {faqOpen === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <div className={`faq-content ${faqOpen === i ? 'max-h-40' : 'max-h-0'}`}>
                <p className="px-6 pb-5 text-cinematic-slate">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="font-cabinet font-bold">WEALTH SIMULATOR</span>
              </div>
              <p className="text-sm text-cinematic-slate">Maîtrisez votre avenir financier avec des simulations avancées.</p>
            </div>

            {/* Links */}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-cinematic-slate mb-4">Produit</div>
              <div className="space-y-2 text-sm">
                {["Simulateur", "Méthode", "Tarifs"].map((item) => (
                  <a key={item} href="#" className="block hover:text-cinematic-slate transition-colors">{item}</a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-widest text-cinematic-slate mb-4">Entreprise</div>
              <div className="space-y-2 text-sm">
                {["À propos", "Blog", "Contact"].map((item) => (
                  <a key={item} href="#" className="block hover:text-cinematic-slate transition-colors">{item}</a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-widest text-cinematic-slate mb-4">Légal</div>
              <div className="space-y-2 text-sm">
                {["Confidentialité", "CGU", "Mentions légales"].map((item) => (
                  <a key={item} href="#" className="block hover:text-cinematic-slate transition-colors">{item}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
            <div className="text-[10px] text-cinematic-slate">
              © {new Date().getFullYear()} Wealth Simulator. Tous droits réservés.
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                <a key={social} href="#" className="text-xs text-cinematic-slate hover:text-white transition-colors">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
