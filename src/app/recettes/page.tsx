'use client';

import { motion } from 'framer-motion';
import { DonutChart, BarChartHorizontal, ChiffreCard } from '@/components/charts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Link from 'next/link';
import InfoTooltip from '@/components/InfoTooltip';

// Données des recettes de fonctionnement
const recettesFonctionnement = {
  total: 9839.5,
  variation: '+0,2 %',
  repartition: [
    { name: 'Fiscalité directe', value: 2191.0, color: '#0D1B4C' },
    { name: 'Fiscalité indirecte & TVA', value: 2981.8, color: '#dc2626' },
    { name: 'Attributions de compensation', value: 1842.4, color: '#d97706' },
    { name: 'Recettes de gestion', value: 1504.1, color: '#3b82f6' },
    { name: 'Dotations État', value: 180.5, color: '#f87171' },
    { name: 'Autres', value: 1139.7, color: '#fbbf24' },
  ],
};

// Fiscalité directe détaillée
const fiscaliteDirecte = {
  total: 2191.0,
  detail: [
    { label: 'Taxe foncière (TFPB)', value: 1851.2, highlight: true },
    { label: 'Taxe habitation résidences secondaires', value: 335.5 },
    { label: 'IFER (réseaux)', value: 4.3 },
  ],
};

// Comparaison complète des taux avec autres villes (données 02_credits_transverses)
const comparaisonTauxComplete = {
  tfpb: {
    label: 'Taxe foncière (TFPB)',
    data: [
      { label: 'Toulouse', value: 48.55, color: '#94a3b8' },
      { label: 'Bordeaux', value: 48.48, color: '#94a3b8' },
      { label: 'Marseille', value: 47.13, color: '#94a3b8' },
      { label: 'Moyenne nationale', value: 39.42, color: '#64748b', subLabel: '(référence)' },
      { label: 'Paris', value: 20.50, color: '#0D1B4C', highlight: true },
    ],
  },
  thrs: {
    label: 'Taxe habitation (rés. secondaires)',
    data: [
      { label: 'Marseille', value: 40.95, color: '#94a3b8' },
      { label: 'Toulouse', value: 34.75, color: '#94a3b8' },
      { label: 'Bordeaux', value: 32.35, color: '#94a3b8' },
      { label: 'Moyenne nationale', value: 24.45, color: '#64748b', subLabel: '(référence)' },
      { label: 'Paris', value: 20.32, color: '#0D1B4C', highlight: true },
    ],
  },
  tfpnb: {
    label: 'Taxe foncière non bâti (TFPNB)',
    data: [
      { label: 'Toulouse', value: 93.49, color: '#94a3b8' },
      { label: 'Bordeaux', value: 93.24, color: '#94a3b8' },
      { label: 'Moyenne nationale', value: 50.82, color: '#64748b', subLabel: '(référence)' },
      { label: 'Marseille', value: 27.77, color: '#94a3b8' },
      { label: 'Paris', value: 25.31, color: '#0D1B4C', highlight: true },
    ],
  },
  cfe: {
    label: 'Cotisation foncière entreprises',
    data: [
      { label: 'Toulouse', value: 36.58, color: '#94a3b8' },
      { label: 'Bordeaux', value: 35.06, color: '#94a3b8' },
      { label: 'Marseille', value: 32.87, color: '#94a3b8' },
      { label: 'Moyenne nationale', value: 26.75, color: '#64748b', subLabel: '(référence)' },
      { label: 'Paris', value: 16.52, color: '#0D1B4C', highlight: true },
    ],
  },
  teom: {
    label: 'Taxe enlèvement ordures (TEOM)',
    data: [
      { label: 'Marseille', value: 18.10, color: '#94a3b8' },
      { label: 'Bordeaux', value: 9.31, color: '#94a3b8' },
      { label: 'Moyenne nationale', value: 8.25, color: '#64748b', subLabel: '(référence)' },
      { label: 'Toulouse', value: 8.10, color: '#94a3b8' },
      { label: 'Paris', value: 6.21, color: '#0D1B4C', highlight: true },
    ],
  },
};

// Évolution fiscalité immobilière (DMTO)
const evolutionFiscaliteImmobiliere = [
  { annee: '2018', montant: 1500 },
  { annee: '2019', montant: 1586.8 },
  { annee: '2020', montant: 1480.1 },
  { annee: '2021', montant: 1480.1 },
  { annee: '2022', montant: 1734.0 },
  { annee: '2023', montant: 1745.6 },
  { annee: 'BP 2024', montant: 1327.8 },
  { annee: 'BP 2025', montant: 1327.8 },
];

// Impacts PLF 2025
const impactsPLF2025 = [
  {
    mesure: 'Fonds de réserve (prélèvement 2 %)',
    risque: 160,
    description: 'Collectivités dont le budget > 40 M€'
  },
  {
    mesure: 'Gel des fractions de TVA',
    risque: 45,
    description: 'Moindre dynamique que prévu par l\'État'
  },
  {
    mesure: 'Hausse cotisation CNRACL (+4 pts)',
    risque: 45,
    description: 'Fin de la compensation 2024'
  },
  {
    mesure: 'Relèvement plafond péréquation',
    risque: 80,
    description: 'Paris déjà 1er contributeur national'
  },
  {
    mesure: 'Réduction enveloppe FCTVA',
    risque: 20,
    description: '-800 M€ au niveau national'
  },
];

// Amendements possibles
const amendementsPossibles = [
  {
    mesure: 'Majoration THRS de 60 % à 100 %',
    impact: 60,
    type: 'recette',
    description: 'Augmentation taxe résidences secondaires',
  },
  {
    mesure: 'Déliaison THRS / Taxe foncière',
    impact: 16,
    type: 'recette',
    description: 'Par point de majoration supplémentaire',
  },
  {
    mesure: 'Relèvement DMTO départementaux',
    impact: 0.5,
    type: 'taux',
    description: '+0,5 point sur droits de mutation',
  },
];

// Dotations et compensations
const dotationsCompensations = [
  { label: 'TSCA (assurances)', value: 92.0 },
  { label: 'Compensations exonérations', value: 34.0 },
  { label: 'DGD (décentralisation)', value: 15.8 },
  { label: 'TICPE', value: 15.6 },
  { label: 'DCP (péréquation)', value: 10.8 },
  { label: 'FCTVA voirie/bâtiments', value: 10.0 },
  { label: 'Autres', value: 2.3 },
];

// Recettes de gestion par fonction
const recettesGestion = [
  { label: 'Transports', value: 472.7, color: '#0D1B4C' },
  { label: 'Santé et action sociale', value: 321.4, color: '#dc2626' },
  { label: 'Services généraux', value: 232.2, color: '#d97706' },
  { label: 'Culture et sports', value: 156.9, color: '#3b82f6' },
  { label: 'Environnement', value: 152.6, color: '#ef4444' },
  { label: 'Enseignement', value: 89.7, color: '#f59e0b' },
  { label: 'Autres', value: 78.6, color: '#60a5fa' },
];

// Chronologie des réformes fiscales
const reformesFiscales = [
  { annee: 2010, reforme: 'Suppression taxe professionnelle' },
  { annee: 2016, reforme: 'Transfert CVAE communale à MGP' },
  { annee: 2017, reforme: 'Transfert CVAE départementale à Région' },
  { annee: 2023, reforme: 'Suppression intégrale CVAE' },
  { annee: 2025, reforme: 'Transfert CFE à la MGP' },
];

export default function RecettesPage() {
  const totalImpactPLF = impactsPLF2025.reduce((sum, i) => sum + i.risque, 0);

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
              D'où vient l'argent ?
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Les recettes de fonctionnement de la Ville de Paris
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
              <div className="text-2xl md:text-3xl font-bold">9,84</div>
              <div className="text-sm text-gray-400">Md€ de recettes</div>
              <div className="text-xs text-green-400 mt-1">+0,2 % vs 2024</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold">61 %</div>
              <div className="text-sm text-gray-400">Fiscalité</div>
              <div className="text-xs text-gray-500 mt-1">directe + indirecte</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold">1,85</div>
              <div className="text-sm text-gray-400">Md€ taxe foncière</div>
              <div className="text-xs text-red-400 mt-1">+14,6 M€</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold">0</div>
              <div className="text-sm text-gray-400">€ de DGF</div>
              <div className="text-xs text-red-400 mt-1">4e année sans</div>
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
              Répartition des recettes
            </h2>
            <p className="text-gray-600">
              Recettes réelles de fonctionnement - BP 2025
            </p>
          </motion.div>

          <DonutChart
            data={recettesFonctionnement.repartition}
            total={recettesFonctionnement.total}
            totalLabel="M€"
            height={280}
          />
        </div>
      </section>

      {/* Fiscalité directe */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              <InfoTooltip terme="Fiscalité directe">Fiscalité directe</InfoTooltip>
            </h2>
            <p className="text-gray-600">
              2,19 Md€ issus des impôts locaux (+1,2 % vs 2024)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartHorizontal
              data={fiscaliteDirecte.detail}
              title="Détail de la fiscalité directe"
              subtitle="En M€"
              maxValue={2000}
            />

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-primary">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">1 851</span>
                  <span className="text-lg text-gray-600">M€</span>
                </div>
                <div className="font-medium text-gray-800 mt-1">
                  <InfoTooltip terme="TFPB">Taxe foncière (TFPB)</InfoTooltip>
                </div>
                <div className="text-xs text-red-500 mt-1">+14,6 M€ vs 2024</div>
                <p className="text-sm text-gray-500 mt-2">Indexation des bases : +1,5 % (inflation nov 2023 à nov 2024)</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-primary">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">335,5</span>
                  <span className="text-lg text-gray-600">M€</span>
                </div>
                <div className="font-medium text-gray-800 mt-1">
                  <InfoTooltip terme="THRS">Taxe habitation résidences secondaires</InfoTooltip>
                </div>
                <div className="text-xs text-red-500 mt-1">+11,8 M€ vs 2024</div>
                <p className="text-sm text-gray-500 mt-2">Majoration de 60 % sur les résidences secondaires</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-primary">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">4,3</span>
                  <span className="text-lg text-gray-600">M€</span>
                </div>
                <div className="font-medium text-gray-800 mt-1">
                  <InfoTooltip terme="IFER">IFER (réseaux)</InfoTooltip>
                </div>
                <div className="text-xs text-green-500 mt-1">+12,4 %</div>
                <p className="text-sm text-gray-500 mt-2">Transformateurs, stations radio, installations gazières</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparaison complète avec autres villes */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Paris vs les autres grandes villes
            </h2>
            <p className="text-gray-600">
              Comparaison des taux d'imposition 2024
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <BarChartHorizontal
              data={comparaisonTauxComplete.tfpb.data}
              title="Taxe foncière (TFPB)"
              subtitle="Taux communal en %"
              maxValue={55}
              showPercentage
            />
            <BarChartHorizontal
              data={comparaisonTauxComplete.thrs.data}
              title="Taxe habitation (rés. secondaires)"
              subtitle="Taux communal en %"
              maxValue={45}
              showPercentage
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <div className="mb-2 flex items-center gap-1">
                <span className="font-bold text-primary">
                  <InfoTooltip terme="CFE">CFE (entreprises)</InfoTooltip>
                </span>
              </div>
              <BarChartHorizontal
                data={comparaisonTauxComplete.cfe.data}
                subtitle="Taux en %"
                maxValue={40}
                showPercentage
              />
            </div>
            <div>
              <div className="mb-2 flex items-center gap-1">
                <span className="font-bold text-primary">
                  <InfoTooltip terme="TEOM">TEOM (ordures)</InfoTooltip>
                </span>
              </div>
              <BarChartHorizontal
                data={comparaisonTauxComplete.teom.data}
                subtitle="Taux en %"
                maxValue={20}
                showPercentage
              />
            </div>
            <BarChartHorizontal
              data={comparaisonTauxComplete.tfpnb.data}
              title="TFPNB (non bâti)"
              subtitle="Taux en %"
              maxValue={100}
              showPercentage
            />
          </div>

        </div>
      </section>

      {/* Évolution fiscalité immobilière */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Évolution de la fiscalité immobilière
            </h2>
            <p className="text-gray-600">
              <InfoTooltip terme="DMTO">Droits de mutation (DMTO)</InfoTooltip> - Forte volatilité liée au marché immobilier
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={evolutionFiscaliteImmobiliere}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="annee" tick={{ fontSize: 12 }} />
                  <YAxis
                    domain={[1200, 1800]}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `${v} M€`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(1)} M€`, 'DMTO']}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <ReferenceLine y={1500} stroke="#E30613" strokeDasharray="5 5" />
                  <Line
                    type="monotone"
                    dataKey="montant"
                    stroke="#0D1B4C"
                    strokeWidth={3}
                    dot={{ fill: '#0D1B4C', strokeWidth: 2, r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-amber-500">
                <div className="text-2xl font-bold text-primary">1 328 M€</div>
                <div className="text-sm text-gray-600 mt-1">DMTO prévus en 2025</div>
                <p className="text-xs text-gray-500 mt-2">
                  Stabilisation après le pic de 2022-2023
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="text-2xl font-bold text-red-600">-24 %</div>
                <div className="text-sm text-gray-600 mt-1">vs pic 2023</div>
                <p className="text-xs text-gray-500 mt-2">
                  Impact du ralentissement du marché immobilier parisien
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-600">
                  Les DMTO sont très sensibles à la conjoncture immobilière.
                  Après un record en 2022-2023, les recettes reviennent au niveau pré-COVID.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impacts PLF 2025 */}
      <section className="py-12 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Risques liés au <InfoTooltip terme="PLF">PLF 2025</InfoTooltip>
            </h2>
            <p className="text-gray-600">
              Mesures gouvernementales menaçant les finances de Paris : 300 à 350 M€ de risque
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-3">
                {impactsPLF2025.map((impact, index) => (
                  <motion.div
                    key={impact.mesure}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-primary">{impact.mesure}</div>
                      <div className="text-sm text-gray-500">{impact.description}</div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-red-600">-{impact.risque} M€</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
                <div className="text-3xl font-bold text-red-600">-{totalImpactPLF} M€</div>
                <div className="text-sm text-gray-600 mt-1">Impact total estimé</div>
                <p className="text-xs text-gray-500 mt-3">
                  Soit environ 3,5 % des recettes de fonctionnement
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-primary mb-3">Chronologie des pertes</h4>
                <div className="space-y-2">
                  {reformesFiscales.map((r) => (
                    <div key={r.annee} className="flex items-start gap-2 text-sm">
                      <span className="font-mono text-gray-500">{r.annee}</span>
                      <span className="text-gray-700">{r.reforme}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3 pt-3 border-t">
                  Perte cumulée de pouvoir fiscal : 2 Md€
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amendements possibles */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Leviers fiscaux possibles
            </h2>
            <p className="text-gray-600">
              Amendements et mesures envisageables pour augmenter les recettes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {amendementsPossibles.map((amendement, index) => (
              <motion.div
                key={amendement.mesure}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-green-500"
              >
                <h3 className="font-bold text-primary mb-2">{amendement.mesure}</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  +{amendement.impact} {amendement.type === 'taux' ? 'pt' : 'M€'}
                </div>
                <p className="text-sm text-gray-600">{amendement.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100"
          >
            <p className="text-sm text-amber-800">
              <strong>Perte de pouvoir fiscal :</strong> Depuis 2010, Paris a perdu 2 Md€
              de pouvoir de taux (<InfoTooltip terme="CFE">CFE</InfoTooltip> transférée à la <InfoTooltip terme="MGP">MGP</InfoTooltip> en 2025, suppression de la <InfoTooltip terme="CVAE">CVAE</InfoTooltip>,
              de la taxe d'habitation sur résidences principales...). Ces recettes sont
              compensées par des fractions de TVA, sur lesquelles la Ville n'a aucun contrôle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dotations et compensations */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Dotations et compensations de l'État
            </h2>
            <p className="text-gray-600">
              180,5 M€ de dotations (-3,5 M€ vs 2024)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartHorizontal
              data={dotationsCompensations}
              title="Détail des dotations"
              subtitle="En M€"
            />

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
                <div className="text-4xl font-bold text-red-600">0 €</div>
                <div className="text-lg font-semibold text-primary mt-2">
                  <InfoTooltip terme="DGF">Dotation Globale de Fonctionnement (DGF)</InfoTooltip>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Pour la 4ème année consécutive, Paris ne perçoit aucune DGF.
                  La Ville est considérée comme "trop riche" pour en bénéficier.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-2xl font-bold text-primary">1 842 M€</div>
                <div className="text-sm text-gray-600 mt-1">
                  <InfoTooltip terme="Attributions de compensation">Attributions de compensation</InfoTooltip> (<InfoTooltip terme="MGP">MGP</InfoTooltip> + Région)
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  Compensations des transferts de fiscalité vers la Métropole
                  du Grand Paris et la Région Île-de-France
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recettes de gestion */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Recettes de gestion par domaine
            </h2>
            <p className="text-gray-600">
              1,5 Md€ de recettes liées à l'activité des services (+38,9 M€)
            </p>
          </motion.div>

          <BarChartHorizontal
            data={recettesGestion}
            title="Recettes par politique publique"
            subtitle="En M€"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
          >
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-primary mb-2">Transports : 472,7 M€</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Stationnement payant : 380 M€</li>
                <li>Redevances parkings concédés : 43,6 M€</li>
                <li>Fourrières : 16,9 M€</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-primary mb-2">Santé/Social : 321,4 M€</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Compensations <InfoTooltip terme="RSA">RSA</InfoTooltip> (<InfoTooltip terme="TICPE">TICPE</InfoTooltip>, FMDI) : 266,6 M€</li>
                <li>Participations petite enfance : 224,5 M€</li>
                <li>Dotations <InfoTooltip terme="APA">APA</InfoTooltip>/<InfoTooltip terme="PCH">PCH</InfoTooltip> : 46,5 M€</li>
              </ul>
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
                <div className="text-accent text-xl font-bold mb-2">-350 M€ de risque</div>
                <div className="text-sm">
                  Le PLF 2025 fait peser une menace significative sur les recettes
                  de la Ville.
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <div className="text-accent text-xl font-bold mb-2">2 Md€ perdus</div>
                <div className="text-sm">
                  Depuis 2010, Paris a perdu 2 Md€ de pouvoir fiscal
                  au profit de l'État et des intercommunalités.
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 mt-12">
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
