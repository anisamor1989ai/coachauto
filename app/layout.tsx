import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CoachAuto Maroc",
  description: "Les avis des vrais conducteurs marocains",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 min-h-screen">
        {/* Navbar modernisée */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🚗</span>
              <span className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                Coach<span className="text-red-700">Auto</span>
              </span>
            </Link>
            {/* Menu desktop */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { href: "/donner-avis", label: "Donner un avis" },
                { href: "/notes", label: "Consulter les notes" },
                { href: "/classement", label: "Classement" },
                { href: "/expert", label: "Avis expert" },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-red-700 hover:bg-red-50 transition-all">
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Menu mobile hamburger */}
            <details className="md:hidden relative">
              <summary className="list-none cursor-pointer p-2 rounded-xl hover:bg-gray-100">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h16M3 12h16M3 18h16"/>
                </svg>
              </summary>
              <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-52 z-50">
                {[
                  { href: "/donner-avis", label: "✍️ Donner un avis" },
                  { href: "/notes", label: "⭐ Consulter les notes" },
                  { href: "/classement", label: "🏆 Classement" },
                  { href: "/expert", label: "🎯 Avis expert" },
                ].map(link => (
                  <Link key={link.href} href={link.href}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all">
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-gray-100 bg-white mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span>🚗</span>
              <span className="font-bold text-gray-800">Coach<span className="text-red-700">Auto</span></span>
              <span className="text-gray-400 text-sm">— Le conseil auto indépendant au Maroc</span>
            </div>
            <p className="text-gray-400 text-sm">© 2025 CoachAuto Maroc</p>
          </div>
        </footer>
      </body>
    </html>
  );
}