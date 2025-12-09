import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">L'argent des Parisiens</h3>
            <p className="text-gray-400 text-sm">
              Comprendre le budget de la Ville de Paris en toute transparence.
              Données issues du Budget Primitif 2025.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Vue d'ensemble
                </Link>
              </li>
              <li>
                <Link href="/recettes" className="text-gray-400 hover:text-white transition-colors">
                  Recettes
                </Link>
              </li>
              <li>
                <Link href="/depenses" className="text-gray-400 hover:text-white transition-colors">
                  Dépenses
                </Link>
              </li>
              <li>
                <Link href="/politiques" className="text-gray-400 hover:text-white transition-colors">
                  Politiques publiques
                </Link>
              </li>
              <li>
                <Link href="/dette" className="text-gray-400 hover:text-white transition-colors">
                  Dette
                </Link>
              </li>
            </ul>
          </div>

          {/* Source */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sources</h3>
            <p className="text-gray-400 text-sm mb-4">
              Données extraites du Budget Primitif 2025 de la Ville de Paris,
              publié en décembre 2024.
            </p>
            <p className="text-gray-500 text-xs">
              Site réalisé par l'équipe de Sarah Knafo
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© 2024 - L'argent des Parisiens - Municipales Paris 2026</p>
        </div>
      </div>
    </footer>
  );
}
