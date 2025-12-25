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

// Fonction pour normaliser une chaîne (enlever les accents pour la recherche)
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

// Index de recherche avec mots-clés par page
const searchIndex = [
  // Pages principales
  { name: 'Vue d\'ensemble', href: '/', keywords: ['accueil', 'budget', 'synthèse', 'total', 'résumé', 'chiffres clés', '9,8 milliards', '10 milliards', 'alertes', 'points d\'attention'] },
  { name: 'Recettes', href: '/recettes', keywords: ['fiscalité', 'impôts', 'taxes', 'taxe foncière', 'TFPB', 'THRS', 'résidences secondaires', 'TVA', 'dotations', 'DGF', 'DMTO', 'PLF', 'péréquation', 'FPIC', 'FSC', 'CVAE', 'cotisation', 'redevances', 'stationnement', 'concessions', 'recettes fiscales', '7,9 milliards'] },
  { name: 'Dépenses', href: '/depenses', keywords: ['charges', 'personnel', 'masse salariale', 'fonctionnement', 'achats', 'subventions', 'agents', 'effectifs', 'rémunérations', 'primes', 'GIPA', 'péréquation', 'FPIC', 'reversement', '2,9 milliards', '52 000 agents'] },
  { name: 'Politiques', href: '/politiques', keywords: ['9 politiques', 'répartition', 'santé', 'social', 'transports', 'culture', 'sport', 'environnement', 'sécurité', 'enseignement', 'économie', 'aménagement', '7,9 milliards'] },
  { name: 'Investissements', href: '/investissements', keywords: ['projets', 'AP', 'autorisations', 'ZAC', 'budget participatif', 'logement social', 'foncier', 'arrondissement', 'équipements', 'travaux', 'constructions', 'rénovations', '2,54 milliards', 'PPI'] },
  { name: 'Dette', href: '/dette', keywords: ['emprunt', 'remboursement', 'annuités', 'encours', 'capacité', 'désendettement', 'taux', 'obligataire', 'intérêts', 'charges financières', '9,4 milliards', '16 ans', 'notation', 'agences', 'spread'] },
  { name: 'Données techniques', href: '/donnees-techniques', keywords: ['opérations d\'ordre', 'amortissements', 'provisions', 'participations', 'virement', 'autofinancement', 'besoin de financement', 'transferts'] },

  // Recettes détaillées
  { name: 'Taxe foncière (TFPB)', href: '/recettes', keywords: ['TFPB', 'impôt foncier', 'propriétaires', 'foncier bâti', '1,9 milliard', 'taux', '13,5%'] },
  { name: 'Taxe résidences secondaires', href: '/recettes', keywords: ['THRS', 'résidences secondaires', 'majoration', '60%', '302 millions'] },
  { name: 'Droits de mutation (DMTO)', href: '/recettes', keywords: ['DMTO', 'mutation', 'notaire', 'immobilier', 'transactions', '1,3 milliard'] },
  { name: 'Taxe de séjour', href: '/recettes', keywords: ['tourisme', 'hôtels', 'Airbnb', 'hébergement', '135 millions', 'JO'] },
  { name: 'Dotations de l\'État', href: '/recettes', keywords: ['DGF', 'dotation globale', 'État', 'compensations', 'péréquation'] },
  { name: 'Péréquation', href: '/recettes', keywords: ['FPIC', 'FSC', 'péréquation', 'reversement', 'solidarité', '1,6 milliard'] },

  // Dépenses détaillées
  { name: 'Masse salariale', href: '/depenses', keywords: ['personnel', 'agents', 'effectifs', 'rémunérations', 'salaires', '2,9 milliards', '52 000', 'titulaires', 'contractuels'] },
  { name: 'Créations de postes', href: '/depenses', keywords: ['recrutements', 'postes', 'effectifs', '+950', 'police', 'animateurs', 'crèches'] },
  { name: 'Charges financières', href: '/depenses', keywords: ['intérêts', 'dette', 'emprunt', '224 millions', 'frais financiers'] },

  // Politiques publiques
  { name: 'Santé et action sociale', href: '/politiques', keywords: ['RSA', 'crèches', 'petite enfance', 'handicap', 'personnes âgées', 'APA', 'PCH', 'CASVP', 'aide sociale', 'enfance', 'MNA', '2,7 milliards', '34%'] },
  { name: 'Services généraux', href: '/politiques', keywords: ['administration', 'informatique', 'arrondissements', 'ESA', 'mairies', 'Tour Eiffel', '1,8 milliard', '23%'] },
  { name: 'Transports', href: '/politiques', keywords: ['IDFM', 'vélo', 'métro', 'tramway', 'stationnement', 'RER', 'ligne 14', 'T3', 'périphérique', 'pistes cyclables', '868 millions', '472 millions'] },
  { name: 'Environnement', href: '/politiques', keywords: ['déchets', 'propreté', 'SYCTOM', 'TEOM', 'tri', 'collecte', 'sanisettes', 'biodéchets', '635 millions', '573 millions'] },
  { name: 'Culture, sports, loisirs', href: '/politiques', keywords: ['musées', 'piscines', 'bibliothèques', 'théâtres', 'JO', 'Seine', 'baignade', 'conservatoires', 'Paris Musées', 'églises', 'Notre-Dame', '564 millions'] },
  { name: 'Enseignement', href: '/politiques', keywords: ['écoles', 'collèges', 'caisses', 'restauration scolaire', 'animateurs', 'ESPCI', 'Oasis', 'périscolaire', '510 millions', '132 millions'] },
  { name: 'Aménagement et habitat', href: '/politiques', keywords: ['logement', 'logement social', 'espaces verts', 'éclairage', 'urbanisme', 'ZAC', 'bailleurs', 'HLM', 'végétalisation', '391 millions', '429 millions'] },
  { name: 'Sécurité', href: '/politiques', keywords: ['police municipale', 'pompiers', 'BSPP', 'préfecture', 'vidéoprotection', 'ASVP', '+455 agents', '330 millions', '148 millions'] },
  { name: 'Action économique', href: '/politiques', keywords: ['emploi', 'insertion', 'tourisme', 'commerce', 'Tumo', 'ESS', 'marchés', 'agriculture urbaine', '112 millions', '135 millions'] },

  // Investissements détaillés
  { name: 'Logement social', href: '/investissements', keywords: ['HLM', 'bailleurs', 'foncier', 'acquisitions', '429 millions', 'construction', 'réhabilitation'] },
  { name: 'Budget participatif', href: '/investissements', keywords: ['citoyens', 'votes', 'projets', '80 millions', 'arrondissements'] },
  { name: 'Voirie et transports', href: '/investissements', keywords: ['routes', 'trottoirs', 'pistes cyclables', 'carrefours', 'entretien'] },
  { name: 'Bâtiments et équipements', href: '/investissements', keywords: ['rénovation', 'construction', 'écoles', 'crèches', 'piscines', 'gymnases'] },

  // Dette détaillée
  { name: 'Encours de dette', href: '/dette', keywords: ['stock', 'dette totale', '9,4 milliards', 'évolution', 'historique'] },
  { name: 'Capacité de désendettement', href: '/dette', keywords: ['16 ans', 'ratio', 'épargne brute', 'remboursement', 'soutenabilité'] },
  { name: 'Taux d\'intérêt', href: '/dette', keywords: ['taux moyen', '2,4%', 'spread', 'OAT', 'marché', 'émissions'] },

  // Données techniques détaillées
  { name: 'Participations aux budgets', href: '/donnees-techniques', keywords: ['IDFM', 'CASVP', 'préfecture', 'caisses écoles', 'SYCTOM', 'Paris Musées', '1,68 milliard'] },
  { name: 'Amortissements et provisions', href: '/donnees-techniques', keywords: ['dotations', 'immobilisations', 'risques', 'contentieux', '498 millions', '463 millions'] },
  { name: 'Besoin de financement', href: '/donnees-techniques', keywords: ['autofinancement', 'emprunt', '993 millions', 'virement', '127 millions', '89%'] },
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

  // Filtrer les résultats de recherche (tolérant aux accents)
  const searchResults = searchQuery.length > 1
    ? searchIndex.filter(item => {
        const query = normalizeString(searchQuery);
        return (
          normalizeString(item.name).includes(query) ||
          item.keywords.some(kw => normalizeString(kw).includes(query))
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
            <span className="text-yellow font-bold text-lg md:text-xl font-display">
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
                className="w-48 lg:w-64 px-4 py-1.5 pl-9 rounded-lg bg-cream/10 border border-yellow/30 text-white placeholder-cream/70 text-sm focus:outline-none focus:ring-2 focus:ring-yellow/50 focus:bg-cream/15 transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60"
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
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-primary/20 overflow-hidden z-50"
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
                          : 'text-primary hover:bg-cream'
                      }`}
                    >
                      <div className="font-medium">{result.name}</div>
                      <div className={`text-xs mt-0.5 ${
                        index === selectedIndex ? 'text-primary/50' : 'text-primary/60'
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
          <div className="hidden md:flex items-center gap-1 ml-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative focus:outline-none focus:ring-2 focus:ring-yellow/50 whitespace-nowrap ${
                    isActive
                      ? 'text-yellow'
                      : 'text-cream/80 hover:text-yellow hover:bg-cream/10'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-yellow/20 rounded-md"
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
            className="md:hidden p-2 text-cream hover:text-yellow focus:outline-none focus:ring-2 focus:ring-yellow/50 rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
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
                      className="w-full px-4 py-2 pl-9 rounded-lg bg-cream/10 border border-yellow/30 text-white placeholder-cream/70 text-sm focus:outline-none focus:ring-2 focus:ring-yellow/50"
                    />
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60"
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
                              : 'text-primary'
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
                          ? 'bg-yellow/20 text-yellow'
                          : 'text-cream/80 hover:bg-yellow/10 hover:text-yellow'
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
