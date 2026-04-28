"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const criteres = [
  { key: "score_design", label: "Design", emoji: "🎨" },
  { key: "score_reliability", label: "Fiabilité", emoji: "🔧" },
  { key: "score_space", label: "Habitabilité", emoji: "🪑" },
  { key: "score_equipment", label: "Équipements", emoji: "📱" },
  { key: "score_price", label: "Rapport qualité/prix", emoji: "💰" },
  { key: "score_engine", label: "Motorisation", emoji: "⚡" },
  { key: "score_consumption", label: "Consommation", emoji: "⛽" },
];

export default function DonnerAvis() {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [pseudo, setPseudo] = useState("");
  const [city, setCity] = useState("");
  const [ownership, setOwnership] = useState("proprietaire");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

async function searchCars(q: string) {
  setSearch(q);
  if (q.length < 2) { setCars([]); return; }
  console.log("Recherche:", q);
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .or(`brand.ilike.%${q}%,model.ilike.%${q}%`)
    .limit(8);
  console.log("Résultat:", data, "Erreur:", error);
  setCars(data || []);
}

  async function submit() {
    if (!selectedCar || !pseudo || Object.keys(scores).length < 7) return;
    setLoading(true);
    await supabase.from("reviews").insert({
      car_id: selectedCar.id,
      user_pseudo: pseudo,
      city,
      ownership_status: ownership,
      ...scores,
      comment,
    });
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Merci pour votre avis !</h2>
      <p className="text-gray-500 mb-6">Votre avis sur la {selectedCar?.brand} {selectedCar?.model} a été enregistré.</p>
      <button onClick={() => { setSubmitted(false); setSelectedCar(null); setScores({}); setSearch(""); }}
        className="bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800">
        Donner un autre avis
      </button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Donner un avis</h1>
      <p className="text-gray-500 mb-8">Partagez votre expérience avec la communauté marocaine.</p>

      {/* Recherche voiture */}
      {!selectedCar && (
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">1. Recherchez votre voiture</h2>
          <input
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300"
            placeholder="Ex: Dacia Sandero, Toyota Corolla..."
            value={search}
            onChange={e => searchCars(e.target.value)}
          />
          {cars.length > 0 && (
            <ul className="mt-3 divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
              {cars.map(car => (
                <li key={car.id}
                  className="px-4 py-3 cursor-pointer hover:bg-red-50 text-gray-800 flex justify-between items-center"
                  onClick={() => { setSelectedCar(car); setCars([]); }}>
                  <span className="font-medium">{car.brand} {car.model}</span>
                  <span className="text-sm text-gray-400">{car.category}</span>
                </li>
              ))}
            </ul>
          )}
          {search.length >= 2 && cars.length === 0 && (
            <p className="text-sm text-gray-400 mt-3">Aucun modèle trouvé. La base de données sera enrichie progressivement.</p>
          )}
        </div>
      )}

      {selectedCar && (
        <>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 flex justify-between items-center">
            <div>
              <span className="text-sm text-red-500 font-medium">Voiture sélectionnée</span>
              <p className="font-bold text-gray-800 text-lg">{selectedCar.brand} {selectedCar.model}</p>
            </div>
            <button onClick={() => setSelectedCar(null)} className="text-gray-400 hover:text-gray-600 text-sm">Changer</button>
          </div>

          {/* Infos utilisateur */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="font-semibold text-gray-700 mb-4">2. Vos informations</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Pseudo *</label>
                <input className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="Ex: Ahmed_Casa" value={pseudo} onChange={e => setPseudo(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Ville</label>
                <input className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="Ex: Casablanca" value={city} onChange={e => setCity(e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-500 mb-2 block">Statut</label>
              <div className="flex gap-3">
                {[["proprietaire", "Propriétaire"], ["ancien", "Ancien propriétaire"], ["essai", "Essai seulement"]].map(([val, label]) => (
                  <button key={val} onClick={() => setOwnership(val)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${ownership === val ? "bg-red-700 text-white border-red-700" : "border-gray-200 text-gray-600 hover:border-red-300"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="font-semibold text-gray-700 mb-6">3. Notez les critères (1 à 10)</h2>
            <div className="space-y-5">
              {criteres.map(c => (
                <div key={c.key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{c.emoji} {c.label}</span>
                    <span className="font-bold text-red-700">{scores[c.key] ?? "—"}/10</span>
                  </div>
                  <div className="flex gap-2">
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <button key={n} onClick={() => setScores(s => ({...s, [c.key]: n}))}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${scores[c.key] === n ? "bg-red-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-red-100"}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commentaire */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="font-semibold text-gray-700 mb-3">4. Commentaire libre</h2>
            <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-300 text-gray-800"
              placeholder="Partagez votre expérience, points forts, points faibles..."
              value={comment} onChange={e => setComment(e.target.value)} />
          </div>

          <button onClick={submit} disabled={loading || !pseudo || Object.keys(scores).length < 7}
            className="w-full bg-red-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            {loading ? "Envoi en cours..." : "Publier mon avis"}
          </button>
        </>
      )}
    </div>
  );
}