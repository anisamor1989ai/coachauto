"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Expert() {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [opinion, setOpinion] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [sent, setSent] = useState(false);

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
    setSearch("");
    setLoading(true);
    const { data } = await supabase
      .from("expert_opinions")
      .select("*")
      .eq("car_id", car.id)
      .single();
    setOpinion(data);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Avis expert</h1>
      <p className="text-gray-500 mb-8">Mon analyse indépendante pour vous aider à faire le bon choix.</p>

      {/* Carte expert */}
      <div className="bg-red-700 text-white rounded-2xl p-6 mb-8 flex items-center gap-5">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl flex-shrink-0">
          🎯
        </div>
        <div>
          <p className="font-bold text-lg">CoachAuto Expert</p>
          <p className="text-red-100 text-sm">Passionné automobile · Conseiller indépendant pour le marché marocain</p>
          <p className="text-red-100 text-sm mt-1">Plus de 15 ans d'expérience dans l'analyse automobile</p>
        </div>
      </div>

      {/* Recherche */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="font-semibold text-gray-700 mb-3">Recherchez un modèle</h2>
        <input
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300"
          placeholder="Ex: Dacia Duster, Toyota Yaris..."
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

      {/* Avis expert */}
      {selectedCar && !loading && (
        <div>
          {opinion ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedCar.brand} {selectedCar.model}</h2>
                {opinion.verdict && (
                  <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                    opinion.verdict === "Recommande" ? "bg-green-100 text-green-700" :
                    opinion.verdict === "Deconseille" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {opinion.verdict === "Recommande" ? "✅ Recommandé" :
                     opinion.verdict === "Deconseille" ? "❌ Déconseillé" : "⚠️ Mitigé"}
                  </span>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{opinion.content}</p>
              {opinion.pros?.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-green-700 mb-2">✅ Points forts</h3>
                  <ul className="space-y-1">
                    {opinion.pros.map((p: string, i: number) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {opinion.cons?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-700 mb-2">❌ Points faibles</h3>
                  <ul className="space-y-1">
                    {opinion.cons.map((c: string, i: number) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">•</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-6 text-center">
              <p className="text-gray-400 text-lg mb-2">Pas encore d'avis expert pour la {selectedCar.brand} {selectedCar.model}.</p>
              <p className="text-gray-400 text-sm">Contactez-moi pour une analyse personnalisée.</p>
            </div>
          )}

          {/* Bouton contact */}
          {!showContact ? (
            <button onClick={() => setShowContact(true)}
              className="w-full bg-red-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition-colors">
              📞 Me contacter pour un suivi personnalisé
            </button>
          ) : sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-bold text-green-700">Message envoyé !</p>
              <p className="text-green-600 text-sm mt-1">Je vous recontacte sous 24h.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-4">Demande de suivi personnalisé</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Votre nom</label>
                  <input className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                    placeholder="Ex: Mohammed Alami"
                    value={contactName} onChange={e => setContactName(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Téléphone / WhatsApp</label>
                  <input className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                    placeholder="Ex: 06 12 34 56 78"
                    value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Votre question</label>
                  <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-red-300"
                    placeholder="Décrivez votre projet d'achat, vos besoins, votre budget..."
                    value={contactMsg} onChange={e => setContactMsg(e.target.value)} />
                </div>
                <button
                  onClick={() => setSent(true)}
                  disabled={!contactName || !contactPhone}
                  className="w-full bg-red-700 text-white py-3 rounded-xl font-bold hover:bg-red-800 disabled:opacity-40 transition-colors">
                  Envoyer ma demande
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}