"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const criteres = [
  { key: "avg_global", label: "Note globale" },
  { key: "avg_design", label: "Design" },
  { key: "avg_reliability", label: "Fiabilite" },
  { key: "avg_space", label: "Habitabilite" },
  { key: "avg_equipment", label: "Equipements" },
  { key: "avg_price", label: "Qualite/prix" },
  { key: "avg_engine", label: "Motorisation" },
  { key: "avg_consumption", label: "Consommation" },
];

const categories = ["Toutes", "Citadine", "Berline", "Compacte", "SUV"];

export default function Classement() {
  const [category, setCategory] = useState("Toutes");
  const [critere, setCritere] = useState("avg_global");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchRanking(); }, [category, critere]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchRanking() {
    setLoading(true);
    const { data } = await supabase
      .from("car_ratings")
      .select("*, cars(brand, model, category)")
      .gt("review_count", 0)
      .order(critere, { ascending: false })
      .limit(20);
    let filtered = data || [];
    if (category !== "Toutes") {
      filtered = filtered.filter((r: any) => r.cars?.category === category);
    }
    setResults(filtered);
    setLoading(false);
  }

  const medalColor = (i: number) => {
    if (i === 0) return "bg-yellow-400 text-white";
    if (i === 1) return "bg-gray-300 text-white";
    if (i === 2) return "bg-orange-300 text-white";
    return "bg-gray-100 text-gray-500";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Classement</h1>
      <p className="text-gray-500 mb-8">Les meilleures voitures selon les conducteurs marocains.</p>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2 font-medium">Categorie</p>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  category === c
                    ? "bg-red-700 text-white border-red-700"
                    : "border-gray-200 text-gray-600 hover:border-red-300"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2 font-medium">Critere</p>
          <div className="flex flex-wrap gap-2">
            {criteres.map(c => (
              <button key={c.key} onClick={() => setCritere(c.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  critere === c.key
                    ? "bg-red-700 text-white border-red-700"
                    : "border-gray-200 text-gray-600 hover:border-red-300"
                }`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-10">Chargement...</p>
      ) : results.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-400 text-lg">Aucun avis pour cette categorie.</p>
          <Link href="/donner-avis"
            className="mt-4 inline-block bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800">
            Etre le premier a noter
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {results.map((r, i) => (
            <div key={r.car_id}
              className={`flex items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                i === 0 ? "bg-red-50" : ""
              }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 ${medalColor(i)}`}>
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">{r.cars?.brand} {r.cars?.model}</p>
                <p className="text-sm text-gray-400">{r.cars?.category} · {r.review_count} avis</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-700">{r[critere]}</div>
                <div className="text-xs text-gray-400">/10</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}