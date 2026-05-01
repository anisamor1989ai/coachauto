import Link from "next/link";
import CarImage from "./components/CarImage";
import { supabase } from "@/lib/supabase";

const cards = [
  { href: "/donner-avis", emoji: "✍️", title: "Donner un avis", desc: "Notez votre voiture sur 7 critères.", color: "from-red-50 to-orange-50", border: "border-red-100" },
  { href: "/notes", emoji: "⭐", title: "Consulter les notes", desc: "Notes moyennes par critère basées sur la communauté.", color: "from-yellow-50 to-amber-50", border: "border-yellow-100" },
  { href: "/classement", emoji: "🏆", title: "Classement", desc: "Les meilleures voitures par catégorie.", color: "from-blue-50 to-indigo-50", border: "border-blue-100" },
  { href: "/expert", emoji: "🎯", title: "Avis expert", desc: "Mon analyse indépendante modèle par modèle.", color: "from-green-50 to-emerald-50", border: "border-green-100" },
];

async function getFeaturedCars() {
  const { data } = await supabase
    .from("cars")
    .select("brand, model, category, image_url")
    .in("model", ["Duster", "Corolla", "Clio", "Tucson", "Sportage", "Golf"])
    .limit(6);
  return data || [];
}

export default async function Home() {
  const featuredCars = await getFeaturedCars();

  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-br from-red-700 to-red-900 text-white rounded-3xl px-8 py-16 mb-12 text-center shadow-2xl">
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            🇲🇦 Spécialement conçu pour le marché marocain
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            L'avis des vrais<br/>conducteurs marocains
          </h1>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            Comparez, notez et choisissez la voiture idéale.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/donner-avis" className="bg-white text-red-700 px-8 py-3.5 rounded-2xl font-bold hover:bg-red-50 transition-all shadow-lg">
              ✍️ Donner mon avis
            </Link>
            <Link href="/classement" className="bg-white/20 text-white border border-white/30 px-8 py-3.5 rounded-2xl font-bold hover:bg-white/30 transition-all">
              🏆 Voir le classement
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-12">
        {[{ n: "205", label: "Modèles" }, { n: "100%", label: "Indépendant" }, { n: "7", label: "Critères" }].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
            <div className="text-3xl font-extrabold text-red-700">{s.n}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800">Voitures populaires</h2>
          <Link href="/notes" className="text-red-700 text-sm font-medium hover:underline">Voir tout →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {featuredCars.map(car => (
            <Link key={`${car.brand}-${car.model}`} href="/notes"
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <CarImage
                brand={car.brand}
                model={car.model}
                category={car.category}
                imageUrl={car.image_url}
                className="h-36 w-full"
              />
              <div className="p-3">
                <p className="font-bold text-gray-800 text-sm">{car.brand} {car.model}</p>
                <p className="text-xs text-gray-400">{car.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cards.map(c => (
          <Link key={c.href} href={c.href}
            className={`group bg-gradient-to-br ${c.color} border ${c.border} rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1`}>
            <div className="text-4xl mb-4">{c.emoji}</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{c.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}