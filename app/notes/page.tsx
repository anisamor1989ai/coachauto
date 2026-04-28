"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const criteres = [
  { key: "avg_design", label: "Design", emoji: "🎨" },
  { key: "avg_reliability", label: "Fiabilité", emoji: "🔧" },
  { key: "avg_space", label: "Habitabilité", emoji: "🪑" },
  { key: "avg_equipment", label: "Équipements", emoji: "📱" },
  { key: "avg_price", label: "Rapport qualité/prix", emoji: "💰" },
  { key: "avg_engine", label: "Motorisation", emoji: "⚡" },
  { key: "avg_consumption", label: "Consommation", emoji: "⛽" },
];

export default function Notes() {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [ratings, setRatings] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function searchCars(q: string) {
    setSearch(q);
    if (q.length < 2) { setCars([]); return; }
    const { data } = await supabase
      .from("cars")
      .select("*")
      .or(`brand.ilike.%${q}%,model.ilike.%${q}%`)
      .limit(8);
    setCars(data || []);
  }

  async function selectCar(car: any) {
    setSelectedCar(car);
    setCars([]);
    setLoading(true);
    const { data: r } = await supabase
      .from("car_ratings")
      .select("*")
      .eq("car_id", car.id)
      .single();
    const { data: rv } = await supabase
      .from("reviews")
      .select("*")
      .eq("car_id", car.id)
      .order("created_at", { ascending: false })
      .limit(10);
    setRatings(r);
    setReviews(rv || []);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Consulter les notes</h1>
      <p className="text-gray-500 mb-8">Notes moyennes basées sur les avis de la communauté.</p>

      {/* Recherche */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <input
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300"
          placeholder="Recherchez un modèle... Ex: Toyota Corolla"
          value={search}
          onChange={e => searchCars(e.target.value)}
        />
        {cars.length > 0 && (
          <ul className="mt-3 divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {cars.map(car => (
              <li key={car.id}
                className="px-4 py-3 cursor-pointer hover:bg-red-50 text-gray-800 flex justify-between"
                onClick={() => selectCar(car)}>
                <span className="font-medium">{car.brand} {car.model}</span>
                <span className="text-sm text-gray-400">{car.category}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <p className="text-center text-gray-400 py-10">Chargement...</p>}

      {selectedCar && ratings && (
        <div>
          {/* En-tête */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedCar.brand} {selectedCar.model}</h2>
                <p className="text-gray-400">{selectedCar.category} · {ratings.review_count} avis</p>
              </div>
              <div className="text-center bg-red-700 text-white rounded-2xl px-6 py-3">
                <div className="text-3xl font-bold">{ratings.avg_global}</div>
                <div className="text-xs opacity-80">/10</div>
              </div>
            </div>
          </div>

          {/* Barres de notes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-700 mb-6">Notes par critère</h3>
            <div className="space-y-4">
              {criteres.map(c => {
                const val = ratings[c.key] ?? 0;
                return (
                  <div key={c.key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 text-sm">{c.emoji} {c.label}</span>
                      <span className="font-bold text-red-700 text-sm">{val}/10</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-red-700 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${val * 10}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Avis utilisateurs */}
          {reviews.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-4">Avis récents</h3>
              <div className="space-y-4">
                {reviews.map(r => (
                  <div key={r.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-800">{r.user_pseudo}</span>
                      <div className="flex gap-2 text-sm text-gray-400">
                        {r.city && <span>📍 {r.city}</span>}
                        <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded-lg font-semibold">
                          {((r.score_design + r.score_reliability + r.score_space + r.score_equipment + r.score_price + r.score_engine + r.score_consumption) / 7).toFixed(1)}/10
                        </span>
                      </div>
                    </div>
                    {r.comment && <p className="text-gray-500 text-sm">{r.comment}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCar && !loading && ratings && ratings.review_count === 0 && (
            <div className="text-center py-10 text-gray-400">
              Aucun avis pour ce modèle pour l'instant.
            </div>
          )}
        </div>
      )}

      {selectedCar && !loading && !ratings && (
        <div className="text-center py-10 text-gray-400">
          Aucun avis pour ce modèle pour l'instant. Soyez le premier à donner votre avis !
        </div>
      )}
    </div>
  );
}