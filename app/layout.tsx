import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CoachAuto Maroc",
  description: "Les avis des vrais conducteurs marocains",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-red-700 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              🚗 CoachAuto
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link href="/donner-avis" className="hover:text-red-200 transition-colors">
                Donner un avis
              </Link>
              <Link href="/notes" className="hover:text-red-200 transition-colors">
                Consulter les notes
              </Link>
              <Link href="/classement" className="hover:text-red-200 transition-colors">
                Classement
              </Link>
              <Link href="/expert" className="hover:text-red-200 transition-colors">
                Avis expert
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="text-center text-gray-400 text-sm py-6 mt-8 border-t">
          © 2025 CoachAuto Maroc — Le conseil auto indépendant
        </footer>
      </body>
    </html>
  );
}