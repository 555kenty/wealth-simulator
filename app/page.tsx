import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Calculator, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Wealth Simulator</span>
          </div>
          <nav className="flex gap-4">
            <Link href="/simulator">
              <Button>Commencer</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Visualisez votre
            <span className="text-primary"> avenir financier</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Simulez l\u0026apos;évolution de votre patrimoine et découvrez en combien de temps 
            vous atteindrez vos objectifs financiers.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/simulator">
              <Button size="lg" className="gap-2">
                Lancer la simulation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Calculator className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Simulations précises</h3>
                <p className="text-muted-foreground">
                  Modélisez votre patrimoine avec des paramètres personnalisables 
                  et des calculs exacts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Visualisations claires</h3>
                <p className="text-muted-foreground">
                  Graphiques interactifs pour comprendre l\u0026apos;évolution de votre 
                  patrimoine dans le temps.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Shield className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">100% confidentiel</h3>
                <p className="text-muted-foreground">
                  Aucune donnée n\u0026apos;est collectée. Tout reste dans votre navigateur 
                  grâce au stockage local.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> Cette application est un outil de simulation 
              indicative et ne constitue pas un conseil financier. Les projections 
              sont basées sur des hypothèses et ne garantissent pas les résultats futurs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Wealth Simulator. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
