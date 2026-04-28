import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="text-center py-16 bg-white rounded-2xl shadow-sm mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          L'avis des vrais conducteurs marocains
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
          Comparez les voitures, lisez les avis authentiques et faites le bon choix pour le marché marocain.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/donner-avis"
            className="bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 transition-colors">
            Donner mon avis
          </Link>
          <Link href="/classement"
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
            Voir le classement
          </Link>
        </div>
      </div>

      {/* 4 cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/donner-avis" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="text-3xl mb-3">✍️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Donner un avis</h2>
          <p className="text-gray-500">Notez votre voiture sur 7 critères : design, fiabilité, habitabilité, équipements, prix, motorisation, consommation.</p>
        </Link>

        <Link href="/notes" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="text-3xl mb-3">⭐</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Consulter les notes</h2>
          <p className="text-gray-500">Explorez les notes moyennes d'un modèle par critère, basées sur les avis de la communauté.</p>
        </Link>

        <Link href="/classement" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="text-3xl mb-3">🏆</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Classement</h2>
          <p className="text-gray-500">Découvrez les meilleures voitures par catégorie et par critère selon les conducteurs marocains.</p>
        </Link>

        <Link href="/expert" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="text-3xl mb-3">🎯</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Avis expert</h2>
          <p className="text-gray-500">Mon analyse indépendante modèle par modèle, et un suivi personnalisé pour votre achat.</p>
        </Link>
      </div>
    </div>
  );
}