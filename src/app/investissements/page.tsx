'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { DonutChart, BarChartHorizontal } from '@/components/charts';
import Link from 'next/link';

// Synthèse des nouvelles AP
const syntheseAP = {
  total: 2047.1,
  recettes: 462.5,
  parType: [
    { name: 'AP Plan', value: 1437.9, pct: 70.2, color: '#0D1B4C' },
    { name: 'AP Projet', value: 418.6, pct: 20.4, color: '#dc2626' },
    { name: 'Investissement local', value: 106.8, pct: 5.2, color: '#d97706' },
    { name: 'Budget participatif', value: 83.8, pct: 4.1, color: '#3b82f6' },
  ],
  parLocalisation: [
    { name: 'Non localisés', value: 1192.3, pct: 58.2, color: '#0D1B4C' },
    { name: 'Localisables', value: 615.3, pct: 30.1, color: '#dc2626' },
    { name: '17 arrondissements', value: 239.5, pct: 11.7, color: '#f59e0b' },
  ],
};

// Répartition par fonction
const repartitionFonction = [
  { code: 5, label: 'Aménagement et habitat', value: 1133.7, color: '#0D1B4C' },
  { code: 0, label: 'Services généraux', value: 408.3, color: '#dc2626' },
  { code: 3, label: 'Culture, sports, loisirs', value: 183.9, color: '#d97706' },
  { code: 2, label: 'Enseignement', value: 117.9, color: '#1e3a8a' },
  { code: 7, label: 'Environnement', value: 71.1, color: '#ef4444' },
  { code: 8, label: 'Transports', value: 59.7, color: '#f59e0b' },
  { code: 4, label: 'Santé et action sociale', value: 48.6, color: '#3b82f6' },
  { code: 1, label: 'Sécurité', value: 17.6, color: '#f87171' },
  { code: 6, label: 'Action économique', value: 6.2, color: '#fbbf24' },
];

// Stock des AP
const stockAP = {
  avantBP2025: 6574.5,
  mouvementsBP2025: 2047.1,
  apresBP2025: 8621.6,
  parFonction: [
    { label: 'Aménagement et habitat', stock: 4254.7, bp2025: 1133.7 },
    { label: 'Services généraux', stock: 1435.2, bp2025: 408.3 },
    { label: 'Culture, sports, loisirs', stock: 911.7, bp2025: 183.9 },
    { label: 'Enseignement', stock: 649.9, bp2025: 117.9 },
    { label: 'Environnement', stock: 419.9, bp2025: 71.1 },
    { label: 'Transports', stock: 426.2, bp2025: 59.7 },
    { label: 'Santé et action sociale', stock: 339.4, bp2025: 48.6 },
    { label: 'Action économique', stock: 140.8, bp2025: 6.2 },
    { label: 'Sécurité', stock: 43.8, bp2025: 17.6 },
  ],
};

// Grands projets par arrondissement
const grandsProjets = [
  {
    arrondissement: '19e',
    projets: [
      { nom: 'Travaux sécurité Buttes-Chaumont', montant: 50.0 },
      { nom: 'Démolition/reconstruction Paris Anim Clavel', montant: 0.9 },
    ],
  },
  {
    arrondissement: '18e',
    projets: [
      { nom: 'Esplanade Notre-Dame (travaux abords)', montant: 42.2 },
      { nom: 'Restructuration cuisine centrale Riquet', montant: 9.7 },
      { nom: 'Création centre de santé', montant: 2.8 },
      { nom: 'Création atelier propreté', montant: 2.5 },
      { nom: 'Porte de la Chapelle', montant: 1.0 },
    ],
  },
  {
    arrondissement: '15e',
    projets: [
      { nom: 'Extension parc Suzanne Lenglen', montant: 4.1 },
      { nom: 'Restructuration centre sportif Suzanne Lenglen', montant: 7.7 },
      { nom: 'ZAC Bargue Procession', montant: 0.5 },
      { nom: 'Rue Louis Vicat', montant: 5.2 },
    ],
  },
  {
    arrondissement: '14e',
    projets: [
      { nom: 'Super-équipement Pinard (ZAC St-Vincent-de-Paul)', montant: 12.9 },
      { nom: 'Travaux rue Commandant Mouchotte', montant: 10.0 },
    ],
  },
  {
    arrondissement: '13e',
    projets: [
      { nom: 'ZAC Paris Rive Gauche (voirie)', montant: 23.5 },
      { nom: 'Parc ZAC Python-Duvernois', montant: 3.4 },
      { nom: 'Extension square Clara Zetkin', montant: 1.3 },
      { nom: 'Rue Nationale', montant: 1.3 },
      { nom: 'Local services espaces verts', montant: 1.0 },
    ],
  },
  {
    arrondissement: '12e',
    projets: [
      { nom: 'Restructuration cité mixte Paul Valéry', montant: 5.0 },
      { nom: 'Relogement services (bâtiment administratif)', montant: 7.2 },
      { nom: 'Gymnase Portes Vincennes-Montreuil', montant: 9.4 },
    ],
  },
  {
    arrondissement: '20e',
    projets: [
      { nom: 'Parc ZAC Python-Duvernois', montant: 3.4 },
      { nom: 'Rénovation columbarium Père-Lachaise', montant: 2.0 },
      { nom: 'Rénovation Maison de l\'Air', montant: 1.0 },
    ],
  },
  {
    arrondissement: '17e',
    projets: [
      { nom: 'ZAC Clichy-Batignolles', montant: 4.3 },
    ],
  },
  {
    arrondissement: '10e',
    projets: [
      { nom: 'Rénovation pont Bernadette Lafont (canaux)', montant: 2.0 },
      { nom: 'Rénovation piscine Château-Landon', montant: 2.4 },
    ],
  },
  {
    arrondissement: '8e',
    projets: [
      { nom: 'Réaménagement place de la Concorde', montant: 5.4 },
      { nom: 'Rue Boissy d\'Anglas', montant: 2.1 },
      { nom: 'Illuminations Champs-Élysées', montant: 0.2 },
    ],
  },
  {
    arrondissement: '5e',
    projets: [
      { nom: 'Restauration chevet Saint-Séverin', montant: 8.4 },
    ],
  },
  {
    arrondissement: 'Paris Centre',
    projets: [
      { nom: 'Travaux Pavillon de l\'Arsenal', montant: 10.2 },
      { nom: 'Travaux Forum des Halles', montant: 3.7 },
      { nom: 'Restauration façade Saint-Leu-Saint-Gilles', montant: 2.5 },
      { nom: 'Restauration orgue Saint-Merri', montant: 2.3 },
      { nom: 'Restauration galerie Oratoire du Louvre', montant: 1.5 },
    ],
  },
];

// Budget participatif
const budgetParticipatif = {
  total: 83.8,
  campagne2024: {
    montant: 79.6,
    projetsRetenus: 121,
    projetsToutParis: 3,
    projetsArrondissements: 118,
  },
  ecoles: 4.2,
  parDirection: [
    { label: 'Affaires scolaires', value: 19.7, color: '#0D1B4C' },
    { label: 'Jeunesse et sports', value: 17.1, color: '#dc2626' },
    { label: 'Affaires culturelles', value: 14.6, color: '#d97706' },
    { label: 'Espaces verts', value: 13.0, color: '#1e3a8a' },
    { label: 'Petite enfance', value: 5.3, color: '#ef4444' },
    { label: 'Voirie', value: 4.0, color: '#f59e0b' },
    { label: 'Démocratie locale', value: 3.4, color: '#3b82f6' },
    { label: 'Solidarités', value: 2.7, color: '#f87171' },
    { label: 'Autres', value: 4.0, color: '#fbbf24' },
  ],
};

// Logement et habitat
const logementHabitat = {
  total: 665.6,
  detail: [
    { label: 'Subventions logement social', value: 500.0, desc: 'Financement de la construction' },
    { label: 'Rénovation énergétique habitat privé', value: 71.8, desc: 'Éco-Rénovons Paris' },
    { label: 'Crédits délégués État', value: 59.0, desc: 'Aides à la pierre' },
    { label: 'Rachat actifs bailleurs sociaux', value: 14.2, desc: 'Acquisitions foncières' },
    { label: 'Habitat dégradé/insalubre', value: 14.7, desc: 'Lutte contre l\'insalubrité' },
    { label: 'Travaux domaine privé', value: 5.1, desc: 'Entretien patrimoine' },
  ],
};

// Opérations foncières
const operationsFoncieres = {
  comptesFonciers: [
    { label: 'Compte foncier logement', value: 200.0, desc: 'Acquisitions pour logement social' },
    { label: 'Compte foncier équipements', value: 21.0, desc: 'Acquisitions pour équipements publics' },
    { label: 'Compte foncier commerces', value: 8.0, desc: 'Préemptions commerciales' },
  ],
  zac: [
    { nom: 'ZAC Paris Rive Gauche', montant: 23.5, arrondissement: '13e' },
    { nom: 'ZAC Saint-Vincent-de-Paul', montant: 12.9, arrondissement: '14e' },
    { nom: 'ZAC Clichy-Batignolles', montant: 4.3, arrondissement: '17e' },
    { nom: 'ZAC Python-Duvernois', montant: 3.4, arrondissement: '20e' },
    { nom: 'ZAC Bédier-Oudiné', montant: 1.3, arrondissement: '13e' },
    { nom: 'ZAC Bargue-Procession', montant: 0.5, arrondissement: '15e' },
  ],
};

export default function InvestissementsPage() {
  const [selectedArr, setSelectedArr] = useState<string | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-gray-400 uppercase tracking-wide text-sm mb-2">
              Budget 2025
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Les <span className="text-accent">investissements</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              2 milliards € de nouveaux projets
            </p>
          </motion.div>

          {/* Chiffres clés */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold">
                2,05<span className="text-lg ml-1">Md€</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Nouvelles AP</div>
              <div className="text-xs text-gray-500 mt-2">Autorisations de programme</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold">
                8,6<span className="text-lg ml-1">Md€</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Stock total AP</div>
              <div className="text-xs text-gray-500 mt-2">Projets en cours</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold">
                121<span className="text-lg ml-1">projets</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Budget participatif</div>
              <div className="text-xs text-gray-500 mt-2">Campagne 2024</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold">
                500<span className="text-lg ml-1">M€</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Logement social</div>
              <div className="text-xs text-gray-500 mt-2">Subventions</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Répartition par type */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Types d'investissements
            </h2>
            <p className="text-gray-600 mb-8">
              Répartition des 2,05 Md€ de nouvelles autorisations de programme
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-primary mb-4">Par type d'opération</h3>
                <DonutChart data={syntheseAP.parType} height={280} />
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-primary mb-4">Par localisation</h3>
                <DonutChart data={syntheseAP.parLocalisation} height={280} />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">
              {syntheseAP.parType.map((type, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary">{type.value.toLocaleString('fr-FR')} M€</div>
                  <div className="text-sm text-gray-600">{type.name}</div>
                  <div className="text-xs text-gray-400">{type.pct}% du total</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Répartition par fonction */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Investissements par politique
            </h2>
            <p className="text-gray-600 mb-8">
              Répartition des nouvelles autorisations de programme 2025
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <BarChartHorizontal
                data={repartitionFonction.map(f => ({
                  label: f.label,
                  value: f.value,
                  color: f.color,
                }))}
                title="Par fonction"
                subtitle="En millions d'euros"
              />

              <div className="space-y-3">
                {repartitionFonction.slice(0, 5).map((f, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm border-l-4" style={{ borderColor: f.color }}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-primary">{f.label}</div>
                        <div className="text-xs text-gray-500">Fonction {f.code}</div>
                      </div>
                      <div className="text-2xl font-bold text-primary">{f.value.toLocaleString('fr-FR')} M€</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logement et habitat */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Logement et habitat : 665,6 M€
            </h2>
            <p className="text-gray-600 mb-8">
              Le plus gros poste d'investissement de la Ville
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {logementHabitat.detail.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl p-5 shadow-sm"
                >
                  <div className="text-2xl font-bold text-primary">{item.value.toLocaleString('fr-FR')} M€</div>
                  <div className="font-medium text-gray-800 mt-1">{item.label}</div>
                  <div className="text-xs text-gray-500 mt-2">{item.desc}</div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* Opérations foncières et ZAC */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Opérations foncières et ZAC
            </h2>
            <p className="text-gray-600 mb-8">
              Acquisitions et aménagements urbains
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-primary mb-4">Comptes fonciers : 229 M€</h3>
                <div className="space-y-3">
                  {operationsFoncieres.comptesFonciers.map((cf, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-primary">{cf.label}</div>
                          <div className="text-xs text-gray-500">{cf.desc}</div>
                        </div>
                        <div className="text-xl font-bold text-primary">{cf.value} M€</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-4">Principales ZAC</h3>
                <div className="space-y-3">
                  {operationsFoncieres.zac.map((zac, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-primary">{zac.nom}</div>
                        <div className="text-xs text-gray-500">{zac.arrondissement}</div>
                      </div>
                      <div className="text-lg font-bold text-primary">{zac.montant} M€</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grands projets par arrondissement */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Projets par arrondissement
            </h2>
            <p className="text-gray-600 mb-8">
              Cliquez sur un arrondissement pour voir les projets
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-6">
              {grandsProjets.map((arr) => (
                <button
                  key={arr.arrondissement}
                  onClick={() => setSelectedArr(selectedArr === arr.arrondissement ? null : arr.arrondissement)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    selectedArr === arr.arrondissement
                      ? 'bg-primary text-white'
                      : 'bg-white text-primary hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {arr.arrondissement}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedArr && (
                <motion.div
                  key={selectedArr}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <h3 className="font-bold text-primary text-lg mb-4">
                    Projets dans le {selectedArr}
                  </h3>
                  <div className="space-y-3">
                    {grandsProjets
                      .find((a) => a.arrondissement === selectedArr)
                      ?.projets.map((projet, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-700">{projet.nom}</span>
                          <span className="font-bold text-primary">{projet.montant} M€</span>
                        </div>
                      ))}
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="font-medium text-gray-600">Total arrondissement</span>
                    <span className="text-xl font-bold text-primary">
                      {grandsProjets
                        .find((a) => a.arrondissement === selectedArr)
                        ?.projets.reduce((sum, p) => sum + p.montant, 0)
                        .toFixed(1)} M€
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!selectedArr && (
              <div className="bg-white rounded-xl p-6 shadow-sm text-center text-gray-500">
                Sélectionnez un arrondissement pour voir ses projets
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Budget participatif */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Budget participatif : 83,8 M€
            </h2>
            <p className="text-gray-600 mb-8">
              Crédits alloués au budget participatif
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-primary mb-4">Campagne 2024</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{budgetParticipatif.campagne2024.projetsRetenus}</div>
                    <div className="text-sm text-gray-600">projets retenus</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{budgetParticipatif.campagne2024.montant} M€</div>
                    <div className="text-sm text-gray-600">montant total</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{budgetParticipatif.campagne2024.projetsToutParis}</span> projets "Tout Paris"
                  </div>
                  <div>
                    <span className="font-medium">{budgetParticipatif.campagne2024.projetsArrondissements}</span> projets d'arrondissement
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-primary mb-4">Par direction</h3>
                <BarChartHorizontal
                  data={budgetParticipatif.parDirection.slice(0, 6).map(d => ({
                    label: d.label,
                    value: d.value,
                    color: d.color,
                  }))}
                />
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Stock des AP */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Stock des autorisations de programme
            </h2>
            <p className="text-gray-600 mb-8">
              8,6 Md€ de projets en cours d'exécution
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 shadow-sm text-center">
                <div className="text-sm text-gray-500 mb-2">Stock avant BP 2025</div>
                <div className="text-3xl font-bold text-primary">{stockAP.avantBP2025.toLocaleString('fr-FR')} M€</div>
              </div>
              <div className="bg-primary text-white rounded-xl p-5 shadow-sm text-center">
                <div className="text-sm text-gray-300 mb-2">Nouveaux BP 2025</div>
                <div className="text-3xl font-bold">+{stockAP.mouvementsBP2025.toLocaleString('fr-FR')} M€</div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm text-center border-2 border-primary">
                <div className="text-sm text-gray-500 mb-2">Stock après BP 2025</div>
                <div className="text-3xl font-bold text-primary">{stockAP.apresBP2025.toLocaleString('fr-FR')} M€</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-primary mb-4">Stock par fonction</h3>
              <div className="space-y-3">
                {stockAP.parFonction.slice(0, 6).map((f, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{f.label}</span>
                        <span className="text-sm font-bold text-primary">{f.stock.toLocaleString('fr-FR')} M€</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(f.stock / stockAP.apresBP2025) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Points clés */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">
              Ce qu'il faut retenir
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-primary">
                <h3 className="font-bold text-primary mb-2">Logement prioritaire</h3>
                <p className="text-sm text-gray-600">
                  55% des investissements vont à l'aménagement et l'habitat, soit 1,1 Md€.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-600">
                <h3 className="font-bold text-primary mb-2">8,6 Md€ en cours</h3>
                <p className="text-sm text-gray-600">
                  Un stock record d'autorisations de programme représentant 5 ans de travaux.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-400">
                <h3 className="font-bold text-primary mb-2">Budget participatif</h3>
                <p className="text-sm text-gray-600">
                  121 projets pour 79,6 M€ en 2024.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-300">
                <h3 className="font-bold text-primary mb-2">Comptes fonciers</h3>
                <p className="text-sm text-gray-600">
                  229 M€ pour acquérir du foncier : logement, équipements, commerces.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6">
              Explorer les autres aspects du budget
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/depenses"
                className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Les dépenses
              </Link>
              <Link
                href="/dette"
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                La dette
              </Link>
              <Link
                href="/politiques"
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/30"
              >
                Les 9 politiques
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
