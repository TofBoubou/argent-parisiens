'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { DonutChart, BarChartHorizontal } from '@/components/charts';
import Link from 'next/link';

// Données enrichies des 9 politiques publiques
const politiques = [
  {
    code: '4',
    nom: 'Santé et action sociale',
    budget: 2722,
    color: '#0D1B4C',
    bgColor: 'bg-[#0D1B4C]',
    chartColor: '#0D1B4C',
    description: 'RSA, crèches, aide aux personnes âgées et handicapées, aide sociale à l\'enfance',
    keyFacts: [
      { label: 'RSA et insertion', value: '461 M€', detail: 'Allocation et insertion' },
      { label: 'Petite enfance', value: '476 M€', detail: 'Crèches municipales et associatives' },
      { label: 'Aide sociale enfance', value: '380 M€', detail: '+46 M€ vs 2024, MNA et structures d\'accueil' },
      { label: 'Personnes âgées', value: '236 M€', detail: 'APA, hébergement, prévention' },
      { label: 'Handicap', value: '299 M€', detail: 'PCH, hébergement, aide à domicile' },
    ],
    alert: 'Sous-compensation de l\'État : 177 M€ de reste à charge pour Paris, dette sociale cumulée de 1,7 Md€ depuis 2014',
    postes: '+102 créations de postes en 2025',
    repartition: [
      { name: 'RSA', value: 22.5, color: '#0D1B4C' },
      { name: 'CASVP et interventions', value: 22.2, color: '#dc2626' },
      { name: 'Aide sociale enfance', value: 18.5, color: '#d97706' },
      { name: 'Handicap', value: 14.6, color: '#1e3a8a' },
      { name: 'Personnes âgées', value: 11.5, color: '#ef4444' },
      { name: 'Crèches', value: 6.6, color: '#f59e0b' },
      { name: 'Autres', value: 4.1, color: '#fbbf24' },
    ],
    projets: [
      { nom: 'Crèche ZAC Gare de Lyon-Daumesnil (12e)', montant: 3.5 },
      { nom: 'Restructuration EHPAD Jardin des Plantes (5e)', montant: 3.4 },
      { nom: 'Extension centres de santé', montant: 3.4 },
      { nom: 'Mise en accessibilité équipements', montant: 19.9 },
      { nom: 'Subventions crèches associatives', montant: 3.9 },
    ],
    detailPostes: [
      { direction: 'Direction familles petite enfance', postes: 39, motif: 'Crèche Davout 20e et renforts PMI' },
      { direction: 'Direction solidarités', postes: 52, motif: 'CRIP, MNA, équipe mobile prévention' },
      { direction: 'Direction santé publique', postes: 11, motif: 'Offre de soins et 1000 premiers jours' },
    ],
  },
  {
    code: '0',
    nom: 'Services généraux',
    budget: 1833,
    color: '#dc2626',
    bgColor: 'bg-[#dc2626]',
    chartColor: '#dc2626',
    description: 'Administration, informatique, RH, immobilier, états spéciaux d\'arrondissement, budget participatif',
    keyFacts: [
      { label: 'Etats spéciaux arrondissement', value: '173 M€', detail: 'Fonctionnement équipements de proximité' },
      { label: 'Budget participatif', value: '80 M€', detail: '25% du budget d\'investissement décidé par les Parisiens' },
      { label: 'Informatique', value: '50 M€', detail: 'Projets SI, cybersécurité, maintenance' },
      { label: 'Réaménagement Tour Eiffel', value: '18 M€', detail: 'Travaux de modernisation du site' },
      { label: 'Concessions', value: '185 M€', detail: 'Recettes affichage, télécom, parkings' },
    ],
    alert: 'Loyers et charges immobilières : 71 M€ pour les locaux administratifs',
    postes: '+26 créations de postes en 2025',
    repartition: [
      { name: 'ESA (arrondissements)', value: 63.3, color: '#0D1B4C' },
      { name: 'Administration générale', value: 35.8, color: '#dc2626' },
      { name: 'Action internationale', value: 0.9, color: '#f59e0b' },
    ],
    projets: [
      { nom: 'Budget participatif 2024 (121 projets)', montant: 79.6 },
      { nom: 'Réaménagement Tour Eiffel (7e)', montant: 18.0 },
      { nom: 'Matériels et applications informatiques', montant: 50.0 },
      { nom: 'Centre administratif Axiom (13e)', montant: 8.9 },
      { nom: 'Rénovation Pavillon Arsenal', montant: 3.5 },
    ],
    detailPostes: [
      { direction: 'Direction démocratie et territoires', postes: 9, motif: 'Accueil MVAC, urgence sociale' },
      { direction: 'Direction systèmes information', postes: 4, motif: 'Cybersécurité et AMOA' },
      { direction: 'Direction ressources humaines', postes: 4, motif: 'Plan égalité, SIRH' },
    ],
  },
  {
    code: '8',
    nom: 'Transports',
    budget: 868,
    color: '#d97706',
    bgColor: 'bg-[#d97706]',
    chartColor: '#d97706',
    description: 'Contribution IDFM, voirie, stationnement, plan vélo, transports en commun',
    keyFacts: [
      { label: 'Contribution IDFM', value: '472 M€', detail: '+31 M€ vs 2024, transports en commun' },
      { label: 'Stationnement surface', value: '397 M€', detail: 'Recettes stationnement payant' },
      { label: 'Plan Vélo', value: '25 M€', detail: 'Pistes cyclables' },
      { label: 'Extensions métro/tramway', value: '51 M€', detail: 'RER E Eole, T3b, ligne 14' },
      { label: 'Pass Imagine R', value: '22 M€', detail: 'Transports jeunes' },
    ],
    alert: 'Paris reverse 472 M€ à IDFM (+31 M€) mais ne contrôle pas les lignes de transports',
    postes: '+12 créations de postes en 2025',
    repartition: [
      { name: 'Contribution IDFM', value: 73.2, color: '#0D1B4C' },
      { name: 'Voirie communale', value: 14.4, color: '#dc2626' },
      { name: 'Transport sur route', value: 5.3, color: '#d97706' },
      { name: 'Aides transports', value: 3.5, color: '#ef4444' },
      { name: 'Équipement voirie', value: 1.5, color: '#f59e0b' },
      { name: 'Autres', value: 2.1, color: '#fbbf24' },
    ],
    projets: [
      { nom: 'Extension RER E Éole vers l\'ouest', montant: 23.7 },
      { nom: 'Travaux ligne 14', montant: 11.9 },
      { nom: 'Prolongement T3b porte Maillot', montant: 9.5 },
      { nom: 'Plan Vélo 100% cyclable', montant: 25.0 },
      { nom: 'Entretien boulevard périphérique', montant: 12.7 },
    ],
    detailPostes: [
      { direction: 'Direction voirie déplacements', postes: 12, motif: 'Renforcement sections territoriales et releveurs incidents' },
    ],
  },
  {
    code: '7',
    nom: 'Environnement',
    budget: 635,
    color: '#1e3a8a',
    bgColor: 'bg-[#1e3a8a]',
    chartColor: '#1e3a8a',
    description: 'Collecte et traitement des déchets, propreté urbaine, transition énergétique',
    keyFacts: [
      { label: 'Contribution SYCTOM', value: '119 M€', detail: 'Traitement et valorisation des déchets' },
      { label: 'Collecte déchets', value: '110 M€', detail: 'Ordures ménagères, tri, corbeilles' },
      { label: 'Propreté urbaine', value: '50 M€', detail: 'Nettoiement, sanisettes, graffitis' },
      { label: 'TEOM perçue', value: '573 M€', detail: 'Taxe d\'enlèvement des ordures ménagères' },
      { label: 'Nouvelles sanisettes', value: '21 M€', detail: 'Acquisition et modernisation' },
    ],
    alert: '',
    postes: '+35 créations de postes (équipes urgence propreté)',
    repartition: [
      { name: 'Tri et traitement', value: 32.0, color: '#0D1B4C' },
      { name: 'Collecte déchets', value: 25.8, color: '#dc2626' },
      { name: 'Services communs', value: 19.2, color: '#d97706' },
      { name: 'Propreté urbaine', value: 16.3, color: '#ef4444' },
      { name: 'Politique eau', value: 5.3, color: '#f59e0b' },
      { name: 'Autres', value: 1.4, color: '#fbbf24' },
    ],
    projets: [
      { nom: 'Modernisation centres thermiques', montant: 24.4 },
      { nom: 'Acquisition sanisettes', montant: 21.0 },
      { nom: 'Contrats performance énergétique', montant: 11.2 },
      { nom: 'Acquisition véhicules collecte', montant: 9.8 },
      { nom: 'Stations Trilib biodéchets', montant: 10.3 },
    ],
    detailPostes: [
      { direction: 'Direction eau et propreté', postes: 33, motif: 'Équipes urgence terrain et après-midi' },
      { direction: 'Direction transition écologique', postes: 2, motif: 'Projet européen P2Green' },
    ],
  },
  {
    code: '3',
    nom: 'Culture, sports, loisirs',
    budget: 564,
    color: '#ef4444',
    bgColor: 'bg-[#ef4444]',
    chartColor: '#ef4444',
    description: 'Musées, théâtres, bibliothèques, conservatoires, piscines, équipements sportifs',
    keyFacts: [
      { label: 'Paris Musées', value: '59 M€', detail: 'Subvention établissement public' },
      { label: 'Spectacle vivant', value: '79 M€', detail: 'Théâtres, musique, opéras' },
      { label: 'Piscines', value: '26 M€', detail: 'Gestion et rénovations' },
      { label: 'Baignade Seine', value: '8 M€', detail: 'Héritage JO, pérennisation' },
      { label: 'Édifices cultuels', value: '31 M€', detail: 'Restauration églises, Notre-Dame' },
    ],
    alert: '',
    postes: '+70 créations de postes en 2025',
    repartition: [
      { name: 'Culture', value: 69.1, color: '#0D1B4C' },
      { name: 'Sports', value: 21.5, color: '#dc2626' },
      { name: 'Jeunesse loisirs', value: 7.0, color: '#d97706' },
      { name: 'Vie sociale', value: 1.5, color: '#ef4444' },
      { name: 'Services communs', value: 0.9, color: '#f59e0b' },
    ],
    projets: [
      { nom: 'Contribution Solideo (solde JOP)', montant: 27.2 },
      { nom: 'Restauration édifices cultuels', montant: 30.5 },
      { nom: 'Baignade dans la Seine', montant: 7.9 },
      { nom: 'Piscine rue Belliard (18e)', montant: 6.0 },
      { nom: 'Piscine Château Landon (10e)', montant: 6.0 },
      { nom: 'Mémorial place Saint-Gervais', montant: 5.3 },
    ],
    detailPostes: [
      { direction: 'Direction jeunesse et sports', postes: 28, motif: 'Piscine Belliard et terrain Amandiers' },
      { direction: 'Direction affaires culturelles', postes: 21, motif: 'Nouveaux équipements et déprécarisation' },
    ],
  },
  {
    code: '2',
    nom: 'Enseignement',
    budget: 510,
    color: '#f59e0b',
    bgColor: 'bg-[#f59e0b]',
    chartColor: '#f59e0b',
    description: 'Écoles, collèges, restauration scolaire, enseignement supérieur',
    keyFacts: [
      { label: 'Caisses des écoles', value: '132 M€', detail: 'Restauration scolaire, +20 M€ vs 2024' },
      { label: 'Écoles privées', value: '35 M€', detail: 'Subvention établissements 1er degré' },
      { label: 'Collèges', value: '43 M€', detail: 'Publics et privés sous contrat' },
      { label: 'ESPCI', value: '13 M€', detail: 'Ecole de physique et chimie' },
      { label: 'Cours Oasis', value: '7 M€', detail: 'Aménagement cours d\'école' },
    ],
    alert: 'Effet ciseau : baisse démographie scolaire mais hausse coût des denrées et salaires',
    postes: '+212 créations de postes (déprécarisation animateurs)',
    repartition: [
      { name: 'Services périscolaires', value: 54.2, color: '#0D1B4C' },
      { name: 'Enseignement primaire', value: 18.0, color: '#dc2626' },
      { name: 'Enseignement secondaire', value: 17.6, color: '#d97706' },
      { name: 'Enseignement supérieur', value: 7.8, color: '#ef4444' },
      { name: 'Formation pro.', value: 2.4, color: '#f59e0b' },
    ],
    projets: [
      { nom: 'École ZAC Chapelle-Charbon (18e)', montant: 6.5 },
      { nom: 'Opération Gare de Lyon-Daumesnil (12e)', montant: 5.3 },
      { nom: 'Rénovation ESPCI', montant: 7.6 },
      { nom: 'Campus Condorcet', montant: 6.5 },
      { nom: 'Cours Oasis écoles et collèges', montant: 7.0 },
    ],
    detailPostes: [
      { direction: 'Direction affaires scolaires', postes: 209, motif: 'Déprécarisation animateurs et agents techniques' },
      { direction: 'Direction affaires scolaires', postes: 3, motif: 'Réseau EI FEL' },
    ],
  },
  {
    code: '5',
    nom: 'Aménagement et habitat',
    budget: 391,
    color: '#3b82f6',
    bgColor: 'bg-[#3b82f6]',
    chartColor: '#3b82f6',
    description: 'Logement social, espaces verts, éclairage public, urbanisme, ZAC',
    keyFacts: [
      { label: 'Logement social', value: '429 M€', detail: 'Subventions + acquisitions foncières' },
      { label: 'Éclairage public', value: '33 M€', detail: '-6 M€ vs 2024' },
      { label: 'Espaces verts', value: '50 M€', detail: 'Parcs et jardins' },
      { label: 'Éco-Rénovons Paris', value: '10 M€', detail: 'Rénovation énergétique copropriétés' },
      { label: 'Aménagements quartiers', value: '15 M€', detail: 'Aménagements de proximité' },
    ],
    alert: 'Acquisitions foncières logement : 200 M€ pour maintenir la production de logements sociaux',
    postes: '+37 créations de postes (espaces verts)',
    repartition: [
      { name: 'Éclairage public', value: 33.9, color: '#0D1B4C' },
      { name: 'Opérations aménagement', value: 18.6, color: '#dc2626' },
      { name: 'Espaces verts', value: 18.6, color: '#d97706' },
      { name: 'Habitat logement', value: 16.4, color: '#ef4444' },
      { name: 'Services communs', value: 7.1, color: '#f59e0b' },
      { name: 'Politique ville', value: 5.4, color: '#fbbf24' },
    ],
    projets: [
      { nom: 'Acquisitions foncières logement social', montant: 200.0 },
      { nom: 'Subventions bailleurs sociaux', montant: 150.0 },
      { nom: 'ZAC Paris Rive Gauche (13e)', montant: 27.2 },
      { nom: 'Portes de Paris (aménagement)', montant: 19.2 },
      { nom: 'Aménagements quartiers', montant: 15.0 },
      { nom: 'Végétalisation quartiers', montant: 12.0 },
    ],
    detailPostes: [
      { direction: 'Direction espaces verts', postes: 30, motif: 'Nouveaux espaces verts et jardinières' },
      { direction: 'Direction logement habitat', postes: 7, motif: 'Encadrement loyers et meubles touristiques' },
    ],
  },
  {
    code: '1',
    nom: 'Sécurité',
    budget: 330,
    color: '#f87171',
    bgColor: 'bg-[#f87171]',
    chartColor: '#f87171',
    description: 'Police municipale, préfecture de police, pompiers de Paris (BSPP)',
    keyFacts: [
      { label: 'Préfecture de Police', value: '148 M€', detail: 'Budget spécial PP' },
      { label: 'Brigade pompiers (BSPP)', value: '119 M€', detail: 'Contribution fonctionnement + investissement' },
      { label: 'Police municipale', value: '21 M€', detail: 'Surveillance, prévention' },
      { label: 'Vidéoprotection', value: '2 M€', detail: 'Extension du réseau' },
      { label: 'Agents recrutés', value: '+455', detail: 'Créations de postes' },
    ],
    alert: '',
    postes: '+454 créations de postes en 2025',
    repartition: [
      { name: 'Préfecture de Police', value: 52.6, color: '#0D1B4C' },
      { name: 'Brigade pompiers BSPP', value: 40.0, color: '#dc2626' },
      { name: 'Police municipale', value: 5.3, color: '#d97706' },
      { name: 'Services communs', value: 2.1, color: '#f59e0b' },
    ],
    projets: [
      { nom: 'Contribution BSPP (investissement)', montant: 10.0 },
      { nom: 'Déploiement sites police municipale', montant: 3.1 },
      { nom: 'Plan vidéoprotection', montant: 2.2 },
      { nom: 'Défense extérieure contre incendie', montant: 2.7 },
      { nom: 'Travaux d\'office immeubles en péril', montant: 1.0 },
    ],
    detailPostes: [
      { direction: 'Direction police municipale', postes: 398, motif: '120 policiers, 55 chefs de service, 220 ASVP' },
      { direction: 'Direction police municipale', postes: 50, motif: 'Déprécarisation agents points écoles' },
    ],
  },
  {
    code: '6',
    nom: 'Action économique',
    budget: 112,
    color: '#fbbf24',
    bgColor: 'bg-[#fbbf24]',
    chartColor: '#fbbf24',
    description: 'Emploi, insertion, tourisme, commerce, innovation, agriculture urbaine',
    keyFacts: [
      { label: 'Taxe de séjour', value: '135 M€', detail: '-50 M€ vs 2024 (fin effet JO)' },
      { label: 'Insertion emploi', value: '14 M€', detail: 'Mission locale, formation' },
      { label: 'Tumo Paris', value: '6 M€', detail: 'École création numérique' },
      { label: 'Compte foncier commerces', value: '8 M€', detail: 'Préemption locaux commerciaux' },
      { label: 'Office du tourisme', value: '4 M€', detail: 'Subvention OTCP' },
    ],
    alert: 'Désengagement Région IDF et État : la Ville doit compenser pour la Mission locale',
    postes: '+2 créations de postes en 2025',
    repartition: [
      { name: 'Insertion et ESS', value: 35.0, color: '#0D1B4C' },
      { name: 'Recherche innovation', value: 17.5, color: '#dc2626' },
      { name: 'Commerce artisanat', value: 15.3, color: '#d97706' },
      { name: 'Tourisme', value: 10.3, color: '#ef4444' },
      { name: 'Agriculture urbaine', value: 8.2, color: '#f59e0b' },
      { name: 'Autres', value: 13.7, color: '#fbbf24' },
    ],
    projets: [
      { nom: 'Compte foncier commerces', montant: 8.0 },
      { nom: 'Tumo Paris', montant: 5.5 },
      { nom: 'Agriculture et alimentation durables', montant: 4.0 },
      { nom: 'Insertion économique et ESS', montant: 3.9 },
      { nom: 'Modernisation marchés', montant: 3.5 },
    ],
    detailPostes: [
      { direction: 'Direction attractivité emploi', postes: 2, motif: 'IA/esport et résilience (contrats projets)' },
    ],
  },
];

// Données pour le graphique global
const chartData = politiques.map(p => ({
  name: p.nom,
  value: p.budget,
  color: p.color,
}));

export default function PolitiquesPage() {
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>(null);
  const totalBudget = politiques.reduce((sum, p) => sum + p.budget, 0);

  const togglePolicy = (code: string) => {
    setExpandedPolicy(expandedPolicy === code ? null : code);
  };

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
              Les 9 <span className="text-accent">politiques publiques</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comment les {(totalBudget / 1000).toFixed(1)} milliards € du budget sont répartis entre les domaines d'action
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vue d'ensemble */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Vue d'ensemble
            </h2>
            <p className="text-gray-600 mb-8">
              Répartition du budget consolidé par politique publique (en millions d'euros)
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <DonutChart data={chartData} height={350} />
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <BarChartHorizontal
                  data={politiques.map(p => ({
                    label: p.nom,
                    value: p.budget,
                    color: p.color,
                  }))}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Liste des politiques */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Détail par politique
            </h2>
            <p className="text-gray-600 mb-8">
              Cliquez sur une politique pour voir le détail complet
            </p>

            <div className="space-y-4">
              {politiques.map((politique, index) => (
                <motion.div
                  key={politique.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className={`bg-white rounded-xl shadow-sm border-l-4 overflow-hidden cursor-pointer transition-all ${
                      expandedPolicy === politique.code ? 'ring-2 ring-primary' : 'hover:shadow-md hover:bg-gray-50/50'
                    }`}
                    style={{ borderLeftColor: politique.color }}
                    onClick={() => togglePolicy(politique.code)}
                  >
                    {/* Header */}
                    <div className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg ${politique.bgColor} flex items-center justify-center text-white font-bold text-lg`}
                        >
                          {politique.code}
                        </div>
                        <div>
                          <h3 className="font-bold text-primary text-lg">{politique.nom}</h3>
                          <p className="text-sm text-gray-600">{politique.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {politique.budget.toLocaleString('fr-FR')} M€
                        </div>
                        <div className="text-sm text-gray-500">
                          {((politique.budget / totalBudget) * 100).toFixed(1)}% du budget
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {expandedPolicy === politique.code ? '- Réduire' : '+ Voir détail'}
                        </div>
                      </div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {expandedPolicy === politique.code && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                            {/* Répartition interne */}
                            <div className="grid lg:grid-cols-2 gap-6 mb-6">
                              <div>
                                <h4 className="font-semibold text-primary mb-3">Répartition interne (hors masse salariale)</h4>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <DonutChart data={politique.repartition} total={politique.budget} totalLabel="M€" height={200} />
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-primary mb-3">Principaux projets d'investissement</h4>
                                <div className="space-y-2">
                                  {politique.projets.map((projet, i) => (
                                    <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                                      <span className="text-sm text-gray-700 flex-1">{projet.nom}</span>
                                      <span className="font-semibold text-primary ml-2 whitespace-nowrap">{projet.montant.toFixed(1)} M€</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Key Facts */}
                            <h4 className="font-semibold text-primary mb-3">Chiffres clés</h4>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
                              {politique.keyFacts.map((fact, i) => (
                                <div
                                  key={i}
                                  className="bg-gray-50 rounded-lg p-3"
                                >
                                  <div className="text-lg font-bold" style={{ color: politique.color }}>
                                    {fact.value}
                                  </div>
                                  <div className="text-sm font-medium text-primary">{fact.label}</div>
                                  <div className="text-xs text-gray-500 mt-1">{fact.detail}</div>
                                </div>
                              ))}
                            </div>

                            {/* Créations de postes détaillées */}
                            <h4 className="font-semibold text-primary mb-3">Créations de postes 2025</h4>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                              {politique.detailPostes.map((detail, i) => (
                                <div key={i} className="bg-primary/5 rounded-lg p-3">
                                  <div className="text-lg font-bold text-primary">+{detail.postes}</div>
                                  <div className="text-sm font-medium text-gray-700">{detail.direction}</div>
                                  <div className="text-xs text-gray-500 mt-1">{detail.motif}</div>
                                </div>
                              ))}
                            </div>

                            {/* Alert */}
                            {politique.alert && (
                              <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                                <p className="text-sm text-gray-700">{politique.alert}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Synthèse effectifs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Créations de postes par politique
            </h2>
            <p className="text-gray-600 mb-8">
              950 créations de postes en 2025, réparties selon les priorités
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { nom: 'Sécurité', postes: 454, color: '#0D1B4C', detail: 'Police municipale et ASVP' },
                { nom: 'Enseignement', postes: 212, color: '#1e3a8a', detail: 'Déprécarisation animateurs' },
                { nom: 'Santé et action sociale', postes: 102, color: '#1d4ed8', detail: 'Crèches, solidarités' },
                { nom: 'Culture, sports', postes: 70, color: '#2563eb', detail: 'Nouveaux équipements' },
                { nom: 'Aménagement', postes: 37, color: '#3b82f6', detail: 'Espaces verts' },
                { nom: 'Environnement', postes: 35, color: '#60a5fa', detail: 'Équipes propreté' },
              ].map((item, index) => (
                <motion.div
                  key={item.nom}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-3 h-10 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <div className="font-medium text-primary">{item.nom}</div>
                      <div className="text-xs text-gray-500">{item.detail}</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold" style={{ color: item.color }}>
                    +{item.postes}
                  </div>
                </motion.div>
              ))}
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
                <h3 className="font-bold text-primary mb-2">Social en tête</h3>
                <p className="text-sm text-gray-600">
                  La santé et l'action sociale représentent 29% du budget, mais l'État ne compense pas ses transferts.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-600">
                <h3 className="font-bold text-primary mb-2">Transports : Paris paie</h3>
                <p className="text-sm text-gray-600">
                  472 M€ versés à IDFM sans contrôle sur les décisions. Le stationnement finance les transports.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-400">
                <h3 className="font-bold text-primary mb-2">Sécurité renforcée</h3>
                <p className="text-sm text-gray-600">
                  +455 agents en 2025, la plus forte hausse. La police municipale monte en puissance.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-300">
                <h3 className="font-bold text-primary mb-2">Environnement : recettes</h3>
                <p className="text-sm text-gray-600">
                  La TEOM rapporte 573 M€, plus que les dépenses environnementales. La taxe finance d'autres politiques.
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
                href="/recettes"
                className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Les recettes
              </Link>
              <Link
                href="/depenses"
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Les dépenses
              </Link>
              <Link
                href="/investissements"
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/30"
              >
                Les investissements
              </Link>
              <Link
                href="/dette"
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/30"
              >
                La dette
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
