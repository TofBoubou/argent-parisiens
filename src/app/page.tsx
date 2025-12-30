'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const chiffresCles = [
  {
    valeur: '9,8',
    unite: 'Md€',
    label: 'Recettes',
    variation: '+0,2 %',
    positif: true
  },
  {
    valeur: '9,3',
    unite: 'Md€',
    label: 'Dépenses',
    variation: '+0,1 %',
    positif: false
  },
  {
    valeur: '9,4',
    unite: 'Md€',
    label: 'Dette totale',
    variation: '+8 %',
    positif: false
  },
  {
    valeur: '16,4',
    unite: 'ans',
    label: 'Pour rembourser',
    variation: '+1,1 an',
    positif: false
  },
];

const politiques = [
  { code: '4', nom: 'Santé et action sociale', montant: 2722, color: 'bg-[#22496A]' },
  { code: '5', nom: 'Aménagement et habitat', montant: 1052, color: 'bg-[#22496A]' },
  { code: '2', nom: 'Enseignement', montant: 977, color: 'bg-[#FBCD41]' },
  { code: '7', nom: 'Environnement', montant: 917, color: 'bg-[#22496A]' },
  { code: '8', nom: 'Transports', montant: 868, color: 'bg-[#E1386E]' },
  { code: '3', nom: 'Culture, sports, loisirs', montant: 792, color: 'bg-[#E1386E]' },
  { code: '1', nom: 'Sécurité', montant: 505, color: 'bg-[#E1386E]' },
  { code: '0', nom: 'Services généraux', montant: 1107, color: 'bg-[#E1386E]' },
  { code: '6', nom: 'Action économique', montant: 77, color: 'bg-[#FBCD41]' },
];

const alertes = [
  {
    titre: 'Déficit 2024',
    description: 'En 2024, Paris a dépensé 231 M€ de plus que ses recettes en fonctionnement.',
    lien: '/depenses',
  },
  {
    titre: 'Dette en hausse',
    description: 'La dette atteindra 9,4 Md€ fin 2025, soit +656 M€ en un an.',
    lien: '/dette',
  },
  {
    titre: 'Masse salariale',
    description: '2,9 Md€ pour le personnel, +2,4 % vs 2024.',
    lien: '/depenses',
  },
  {
    titre: 'Péréquation',
    description: 'Paris reverse 1,6 Md€ aux autres collectivités chaque année.',
    lien: '/depenses',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-yellow uppercase tracking-wide text-sm mb-4 font-medium">
              Budget Primitif 2025
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-display">
              Où va l'argent des <span className="text-yellow">Parisiens</span> ?
            </h1>
            <p className="text-xl text-cream/80 max-w-2xl mx-auto mb-4">
              Découvrez comment la Ville de Paris gère près de 10 Md€
              de votre argent chaque année.
            </p>
            <p className="text-accent font-semibold">
              Un projet porté par Sarah Knafo - Municipales 2026
            </p>
          </motion.div>

          {/* Chiffres clés */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12"
          >
            {chiffresCles.map((chiffre, index) => (
              <motion.div
                key={chiffre.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-cream/10 backdrop-blur rounded-xl p-4 md:p-6 text-center border border-yellow/20"
              >
                <div className="text-2xl md:text-4xl font-bold text-yellow">
                  {chiffre.valeur}
                  <span className="text-lg md:text-xl ml-1 text-cream">{chiffre.unite}</span>
                </div>
                <div className="text-cream/70 text-sm mt-1">{chiffre.label}</div>
                <div className={`text-xs mt-2 ${chiffre.positif ? 'text-yellow' : 'text-accent/80'}`}>
                  {chiffre.variation}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Les 9 politiques */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Les 9 politiques publiques de Paris
            </h2>
            <p className="text-primary/80 max-w-3xl mx-auto">
              Le budget de Paris est divisé en 9 grands domaines. Le social (RSA, crèches, personnes âgées) représente près d'un tiers du total.
              Viennent ensuite les services généraux (administration), le logement, l'enseignement et l'environnement.
              Cliquez sur une politique pour en savoir plus.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {politiques.map((politique, index) => (
              <motion.div
                key={politique.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href="/politiques" className="block">
                  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-12 rounded-full ${politique.color}`} />
                      <div className="flex-1">
                        <div className="font-semibold text-primary">{politique.nom}</div>
                        <div className="text-2xl font-bold text-primary">
                          {politique.montant.toLocaleString('fr-FR')} M€
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/politiques"
              className="group inline-flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors"
            >
              Voir le détail de chaque politique
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Alertes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Points d'attention
            </h2>
            <p className="text-primary/80 max-w-3xl mx-auto">
              Derrière les grands chiffres, certains indicateurs méritent attention.
              Ils révèlent les tensions financières de Paris : déficit, dette croissante, masse salariale en hausse,
              et une partie du budget qui échappe aux Parisiens via la péréquation versée aux autres collectivités.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alertes.map((alerte, index) => (
              <motion.div
                key={alerte.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={alerte.lien} className="block h-full">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all border-l-4 border-accent h-full">
                    <h3 className="font-bold text-lg text-primary mb-2">{alerte.titre}</h3>
                    <p className="text-primary/80 text-sm">{alerte.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Explorez le budget en détail
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/recettes"
                className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-cream transition-colors"
              >
                D'où vient l'argent ?
              </Link>
              <Link
                href="/depenses"
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E1386E] transition-colors"
              >
                Où va l'argent ?
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
