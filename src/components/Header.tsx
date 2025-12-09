'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Vue d\'ensemble', href: '/' },
  { name: 'Recettes', href: '/recettes' },
  { name: 'Dépenses', href: '/depenses' },
  { name: 'Politiques', href: '/politiques' },
  { name: 'Investissements', href: '/investissements' },
  { name: 'Dette', href: '/dette' },
  { name: 'Technique', href: '/donnees-techniques' },
];

// Index de recherche avec mots-clés par page
const searchIndex = [
  { name: 'Vue d\'ensemble', href: '/', keywords: ['accueil', 'budget', 'synthèse', 'total', 'résumé', 'chiffres clés'] },
  { name: 'Recettes', href: '/recettes', keywords: ['fiscalité', 'impôts', 'taxes', 'taxe foncière', 'TFPB', 'THRS', 'TVA', 'dotations', 'DGF', 'DMTO', 'PLF'] },
  { name: 'Dépenses', href: '/depenses', keywords: ['charges', 'personnel', 'masse salariale', 'fonctionnement', 'achats', 'subventions'] },
  { name: 'Politiques', href: '/politiques', keywords: ['santé', 'social', 'RSA', 'crèches', 'transports', 'IDFM', 'culture', 'sport', 'environnement', 'propreté', 'sécurité', 'police', 'enseignement', 'écoles', 'logement', 'habitat', 'économie', 'tourisme'] },
  { name: 'Investissements', href: '/investissements', keywords: ['projets', 'AP', 'autorisations', 'ZAC', 'budget participatif', 'logement social', 'foncier', 'arrondissement'] },
  { name: 'Dette', href: '/dette', keywords: ['emprunt', 'remboursement', 'annuités', 'encours', 'capacité', 'désendettement', 'taux', 'obligataire'] },
  { name: 'Données techniques', href: '/donnees-techniques', keywords: ['opérations d\'ordre', 'chapitres', 'amortissements', 'provisions', 'participations'] },
  // Sections spécifiques
  { name: 'Taxe foncière', href: '/recettes#fiscalite', keywords: ['TFPB', 'impôt foncier', 'propriétaires'] },
  { name: 'Santé et action sociale', href: '/politiques', keywords: ['RSA', 'crèches', 'petite enfance', 'handicap', 'personnes âgées', 'APA', 'PCH'] },
  { name: 'Services généraux', href: '/politiques', keywords: ['administration', 'informatique', 'arrondissements', 'ESA'] },
  { name: 'Transports', href: '/politiques', keywords: ['IDFM', 'vélo', 'métro', 'tramway', 'stationnement'] },
  { name: 'Environnement', href: '/politiques', keywords: ['déchets', 'propreté', 'SYCTOM', 'TEOM', 'tri'] },
  { name: 'Culture et sports', href: '/politiques', keywords: ['musées', 'piscines', 'bibliothèques', 'théâtres', 'JO', 'Seine'] },
  { name: 'Enseignement', href: '/politiques', keywords: ['écoles', 'collèges', 'caisses', 'restauration scolaire', 'animateurs'] },
  { name: 'Aménagement', href: '/politiques', keywords: ['logement', 'espaces verts', 'éclairage', 'urbanisme'] },
  { name: 'Sécurité', href: '/politiques', keywords: ['police municipale', 'pompiers', 'BSPP', 'préfecture'] },
  { name: 'Économie', href: '/politiques', keywords: ['emploi', 'insertion', 'tourisme', 'commerce', 'Tumo'] },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrer les résultats de recherche
  const searchResults = searchQuery.length > 1
    ? searchIndex.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.keywords.some(kw => kw.toLowerCase().includes(query))
        );
      }).slice(0, 6)
    : [];

  // Fermer la recherche au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gestion du clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
      e.preventDefault();
      router.push(searchResults[selectedIndex].href);
      setSearchQuery('');
      setSearchOpen(false);
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Réinitialiser l'index sélectionné quand les résultats changent
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults.length]);

  return (
    <header className="bg-primary sticky top-0 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-white font-bold text-lg md:text-xl">
              L'argent des Parisiens
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="hidden md:block relative">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={handleKeyDown}
                className="w-48 lg:w-64 px-4 py-1.5 pl-9 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchOpen && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
                >
                  {searchResults.map((result, index) => (
                    <Link
                      key={`${result.name}-${index}`}
                      href={result.href}
                      onClick={() => {
                        setSearchQuery('');
                        setSearchOpen(false);
                      }}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        index === selectedIndex
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-medium">{result.name}</div>
                      <div className={`text-xs mt-0.5 ${
                        index === selectedIndex ? 'text-gray-300' : 'text-gray-400'
                      }`}>
                        {result.keywords.slice(0, 3).join(', ')}
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/20 rounded-md"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-3 space-y-1">
                {/* Mobile Search */}
                <div className="px-4 pb-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSearchOpen(true);
                      }}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-2 pl-9 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  {searchOpen && searchResults.length > 0 && (
                    <div className="mt-2 bg-white rounded-lg overflow-hidden">
                      {searchResults.map((result, index) => (
                        <Link
                          key={`mobile-${result.name}-${index}`}
                          href={result.href}
                          onClick={() => {
                            setSearchQuery('');
                            setSearchOpen(false);
                            setMobileMenuOpen(false);
                          }}
                          className={`block px-4 py-2.5 text-sm ${
                            index === selectedIndex
                              ? 'bg-primary text-white'
                              : 'text-gray-700'
                          }`}
                        >
                          {result.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2 rounded-md text-base font-medium ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
