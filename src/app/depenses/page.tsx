'use client';

import { motion } from 'framer-motion';
import { DonutChart, BarChartHorizontal, ChiffreCard } from '@/components/charts';
import Link from 'next/link';
import InfoTooltip from '@/components/InfoTooltip';

// Données des dépenses de fonctionnement
const depensesFonctionnement = {
  total: 9268.2,
  repartition: [
    { name: 'Masse salariale', value: 2885.0, color: '#0D1B4C' },
    { name: 'Dépenses de gestion', value: 4554.0, color: '#1e3a8a' },
    { name: 'Péréquation & reversements', value: 1604.7, color: '#dc2626' },
    { name: 'Charges financières', value: 224.5, color: '#f59e0b' },
  ],
};

// Évolution masse salariale
const evolutionMasseSalariale = [
  { label: 'CA 2022', value: 2543.8 },
  { label: 'CA 2023', value: 2637.3 },
  { label: 'BP 2024', value: 2817.7 },
  { label: 'BP 2025', value: 2885.0, highlight: true },
];

// Péréquation détaillée - les labels seront enrichis avec InfoTooltip dans le JSX
const perequation = [
  { label: 'FNGIR', sublabel: '(figé depuis 2011)', value: 898.2, color: '#dc2626' },
  { label: 'Fonds DMTO', sublabel: '', value: 214.2, color: '#ef4444' },
  { label: 'FSRIF', sublabel: '(solidarité IDF)', value: 208.1, color: '#f87171' },
  { label: 'FPIC', sublabel: '(national)', value: 199.6, color: '#fca5a5' },
  { label: 'FSDRIF', sublabel: '(départemental)', value: 30.0, color: '#fecaca' },
];

// Dépenses de gestion par fonction - dégradé bleu → rouge → jaune
const depensesGestion = [
  { label: 'Santé et action sociale', value: 2051.2, color: '#0D1B4C' },
  { label: 'Transports', value: 644.6, color: '#dc2626' },
  { label: 'Services généraux', value: 466.5, color: '#d97706' },
  { label: 'Environnement', value: 424.7, color: '#1e3a8a' },
  { label: 'Enseignement', value: 286.9, color: '#ef4444' },
  { label: 'Sécurité', value: 280.4, color: '#f59e0b' },
  { label: 'Culture et sports', value: 262.8, color: '#3b82f6' },
  { label: 'Aménagement', value: 96.2, color: '#f87171' },
  { label: 'Action économique', value: 40.7, color: '#fbbf24' },
];

// JO 2024
const jo2024 = {
  fonctionnement: {
    total: 94.8,
    detail: [
      { label: 'Célébrations', value: 33.6 },
      { label: 'Contribution COJOP paralympiques', value: 15.6 },
      { label: 'Programme Héritage', value: 10.1 },
      { label: 'Préparation et accueil', value: 7.5 },
      { label: 'Gestion abords sites', value: 7.3 },
      { label: 'Centre médias', value: 6.7 },
      { label: 'Habillage ville', value: 6.4 },
      { label: 'Autres', value: 7.6 },
    ],
  },
  investissement: {
    total: 399.5,
    detail: [
      { label: 'Contribution SOLIDEO', value: 165.0, hasTooltip: true },
      { label: 'Arena Porte de la Chapelle', value: 142.3 },
      { label: 'Autres sites olympiques', value: 47.3 },
      { label: 'Sites entraînement', value: 26.4 },
      { label: 'Sites temporaires', value: 14.8 },
    ],
  },
};

export default function DepensesPage() {
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
              Où va l'argent ?
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Les dépenses de fonctionnement de la Ville de Paris
            </p>
          </motion.div>

          {/* Chiffres clés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
          >
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold">9,27</div>
              <div className="text-sm text-gray-400">Md€ de dépenses</div>
              <div className="text-xs text-red-400 mt-1">+0,1 % vs 2024</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold">2,89</div>
              <div className="text-sm text-gray-400">Md€ masse salariale</div>
              <div className="text-xs text-red-400 mt-1">+2,4 %</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold">1,6</div>
              <div className="text-sm text-gray-400">Md€ péréquation</div>
              <div className="text-xs text-gray-500 mt-1">reversé aux autres</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold">225</div>
              <div className="text-sm text-gray-400">M€ intérêts dette</div>
              <div className="text-xs text-red-400 mt-1">+11,5 M€</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vue globale */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Répartition des dépenses
            </h2>
            <p className="text-gray-600">
              Dépenses réelles de fonctionnement - BP 2025
            </p>
          </motion.div>

          <DonutChart
            data={depensesFonctionnement.repartition}
            total={depensesFonctionnement.total}
            totalLabel="M€"
            height={280}
          />
        </div>
      </section>

      {/* Masse salariale */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              <InfoTooltip terme="Masse salariale">Masse salariale</InfoTooltip>
            </h2>
            <p className="text-gray-600">
              2,89 Md€ pour le personnel (+2,4 % vs 2024)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartHorizontal
              data={evolutionMasseSalariale}
              title="Évolution 2018-2025"
              subtitle="En M€"
              maxValue={3000}
            />

            <div className="space-y-4">
              <ChiffreCard
                value="2 885"
                unit="M€"
                label="Masse salariale 2025"
                variation="+67,3 M€ vs 2024"
                variationPositive={false}
                description="31 % du budget total de fonctionnement"
              />
              <ChiffreCard
                value="+13 %"
                label="Hausse depuis 2022"
                description="De 2 544 M€ en 2022 à 2 885 M€ en 2025"
                accent
              />
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-primary mb-3">Créations de postes 2025</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">950</div>
                    <div className="text-gray-500">postes créés</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">+344,5</div>
                    <div className="text-gray-500">solde net</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Péréquation */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              <InfoTooltip terme="Péréquation">Péréquation</InfoTooltip> : ce que Paris reverse
            </h2>
            <p className="text-gray-600">
              1,6 Md€ redistribué aux autres collectivités
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-primary mb-4">Détail de la péréquation</h3>
              <div className="space-y-3">
                {perequation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-8 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-700">
                        <InfoTooltip terme={item.label}>{item.label}</InfoTooltip>
                        {item.sublabel && <span className="text-gray-500 text-sm"> {item.sublabel}</span>}
                      </span>
                    </div>
                    <span className="font-bold text-primary">{item.value.toLocaleString('fr-FR')} M€</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
                <div className="text-3xl font-bold text-red-600">20 %</div>
                <div className="text-lg font-semibold text-primary mt-2">
                  de la péréquation nationale
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Paris contribue à plus d'un cinquième de la péréquation nationale
                  entre collectivités.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
                <div className="text-3xl font-bold text-red-600">50 %</div>
                <div className="text-lg font-semibold text-primary mt-2">
                  de la péréquation régionale IDF
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Paris finance à elle seule la moitié de la solidarité
                  entre communes d'Île-de-France.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Dotations reçues de l'État</span>
                  <span className="font-semibold text-primary">546,8 M€</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Péréquation versée</span>
                  <span className="font-semibold text-red-600">-651,9 M€</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">Solde</span>
                    <span className="font-bold text-red-600">-104,9 M€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100"
          >
            <p className="text-sm text-red-800">
              <strong>Effet ciseau :</strong> Paris donne plus qu'elle ne reçoit. Ce déséquilibre
              dégrade l'équilibre budgétaire et réduit les marges d'autofinancement de la Ville.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dépenses par fonction */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Dépenses de gestion par domaine
            </h2>
            <p className="text-gray-600">
              4,55 Md€ de dépenses hors masse salariale (+1,3 %)
            </p>
          </motion.div>

          <BarChartHorizontal
            data={depensesGestion}
            title="Par politique publique"
            subtitle="En M€ (hors masse salariale)"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
          >
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-primary mb-2">Santé/Social : 2 051 M€</h4>
              <p className="text-xs text-gray-500 mb-2">+86,5 M€ vs 2024</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <InfoTooltip terme="RSA">RSA</InfoTooltip> : 461 M€</li>
                <li>• Aide sociale enfance : 380 M€</li>
                <li>• Handicap : 299 M€</li>
                <li>• Personnes âgées : 236 M€</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-primary mb-2">Transports : 645 M€</h4>
              <p className="text-xs text-gray-500 mb-2">+34,7 M€ vs 2024</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Contribution <InfoTooltip terme="IDFM">IDFM</InfoTooltip> : 472 M€</li>
                <li>• Voirie : 103 M€</li>
                <li>• Vélib'/transports : 34 M€</li>
                <li>• Aides jeunes : 22,5 M€</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-primary mb-2">Culture/Sports : 263 M€</h4>
              <p className="text-xs text-red-500 mb-2">-88,1 M€ vs 2024</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Baisse post-JO 2024</li>
                <li>• Fin des dépenses exceptionnelles</li>
                <li>• Retour au niveau normal</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* JO 2024 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              JO Paris 2024 : la facture
            </h2>
            <p className="text-gray-600">
              Bilan des dépenses 2018-2025
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-primary mb-4">Fonctionnement : 94,8 M€</h3>
              <div className="space-y-3">
                {jo2024.fonctionnement.detail.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="font-semibold text-primary">{item.value} M€</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-primary mb-4">Investissement : 399,5 M€</h3>
              <div className="space-y-3">
                {jo2024.investissement.detail.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {item.label.includes('SOLIDEO') ? (
                        <>Contribution <InfoTooltip terme="SOLIDEO">SOLIDEO</InfoTooltip></>
                      ) : item.label}
                    </span>
                    <span className="font-semibold text-primary">{item.value} M€</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4">
                <div className="text-sm text-gray-500">
                  Reversement <InfoTooltip terme="SOLIDEO">SOLIDEO</InfoTooltip> : 109,7 M€
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <ChiffreCard
              value="494"
              unit="M€"
              label="Coût total JO pour Paris"
              description="Fonctionnement + Investissement (2018-2025)"
            />
            <ChiffreCard
              value="4,8"
              unit="M€/an"
              label="Héritage 2025"
              description="Baignade Seine, Paris sportives, sport santé..."
            />
            <ChiffreCard
              value="142"
              unit="M€"
              label="Arena Porte de la Chapelle"
              description="Le plus gros investissement JO de la Ville"
            />
          </motion.div>
        </div>
      </section>

      {/* Charges financières */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Charges financières
            </h2>
            <p className="text-gray-600">
              224,5 M€ d'intérêts de la dette (+11,5 M€)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ChiffreCard
              value="224,5"
              unit="M€"
              label="Intérêts de la dette"
              variation="+11,5 M€ vs 2024"
              variationPositive={false}
              description="Maintien des taux d'intérêt à niveau élevé"
            />
            <ChiffreCard
              value="18,7"
              unit="M€/mois"
              label="Coût mensuel de la dette"
              description="L'équivalent de 1 000 places de crèche/mois"
            />
            <ChiffreCard
              value="616"
              unit="k€/jour"
              label="Coût quotidien"
              description="Argent « perdu » en intérêts chaque jour"
            />
          </div>
        </div>
      </section>

      {/* Bilan réel 2024 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">Bilan réel 2024</h2>
            <p className="text-gray-600 mb-8">
              Ce que Paris a vraiment dépensé (compte administratif 2024)
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-sm text-gray-500 mb-2">Recettes réelles</div>
                <div className="text-3xl font-bold text-green-600">9,71 Md€</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-sm text-gray-500 mb-2">Dépenses réelles</div>
                <div className="text-3xl font-bold text-red-600">9,94 Md€</div>
              </div>
              <div className="bg-primary text-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-sm text-gray-300 mb-2">Déficit fonctionnement</div>
                <div className="text-3xl font-bold text-accent">-231 M€</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center border-2 border-amber-400">
                <div className="text-sm text-gray-500 mb-2">Certification des comptes</div>
                <div className="text-xl font-bold text-amber-600">5 réserves</div>
                <div className="text-xs text-gray-500 mt-1">Le commissaire aux comptes a émis des doutes</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Résumé */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6">En résumé</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 rounded-xl p-5">
                <div className="text-accent text-xl font-bold mb-2">+13 %</div>
                <div className="text-sm">
                  de masse salariale en 3 ans, avec 950 créations de postes en 2025
                  et une progression continue depuis 2022.
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <div className="text-accent text-xl font-bold mb-2">1,6 Md€</div>
                <div className="text-sm">
                  reversé aux autres collectivités au titre de la péréquation.
                  Paris contribue à 20 % du national et 50 % du régional.
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <div className="text-accent text-xl font-bold mb-2">225 M€</div>
                <div className="text-sm">
                  d'intérêts de la dette payés chaque année, soit 616 000 €
                  par jour qui ne servent pas les Parisiens.
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 mt-12">
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
                href="/dette"
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                La dette
              </Link>
              <Link
                href="/investissements"
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/30"
              >
                Les investissements
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
