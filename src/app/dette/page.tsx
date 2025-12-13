'use client';

import { motion } from 'framer-motion';
import { ChiffreCard, BarChartHorizontal, DonutChart } from '@/components/charts';
import Link from 'next/link';
import InfoTooltip from '@/components/InfoTooltip';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';

// Évolution de la dette (encours au 31/12) - Sources CRC Île-de-France
const evolutionDette = [
  { annee: '2015', dette: 4665, label: '4,67 Md€', variation: null },
  { annee: '2016', dette: 5184, label: '5,18 Md€', variation: 519 },
  { annee: '2017', dette: 5741, label: '5,74 Md€', variation: 557 },
  { annee: '2018', dette: 5942, label: '5,94 Md€', variation: 201 },
  { annee: '2019', dette: 5880, label: '5,88 Md€', variation: -62 },
  { annee: '2020', dette: 6622, label: '6,62 Md€', variation: 742 },
  { annee: '2021', dette: 7183, label: '7,18 Md€', variation: 561 },
  { annee: '2022', dette: 7715, label: '7,72 Md€', variation: 531 },
  { annee: '2023', dette: 8043, label: '8,04 Md€', variation: 328 },
  { annee: '2024', dette: 8701, label: '8,70 Md€', variation: 658 },
  { annee: '2025', dette: 9357, label: '9,36 Md€', variation: 656 },
];

// Évolution de l'épargne brute
const evolutionEpargneBrute = [
  { annee: '2018', montant: 631.1 },
  { annee: '2019', montant: 670.7 },
  { annee: '2020', montant: 20.1 },
  { annee: '2021', montant: 458.4 },
  { annee: '2022', montant: 581.7 },
  { annee: '2023', montant: 758.4 },
  { annee: '2024', montant: 567.0 },
  { annee: '2025', montant: 571.3 },
];

// Durée de désendettement
const evolutionDuree = [
  { annee: '2024', duree: 15.3 },
  { annee: '2025', duree: 16.4 },
];

// Composition de la dette
const compositionDette = [
  { name: 'Dette bancaire et obligataire', value: 9292, color: '#0D1B4C' },
  { name: 'Contrat performance énergétique', value: 14.6, color: '#3B82F6' },
  { name: 'Échéancier Philharmonie', value: 41.8, color: '#6366F1' },
  { name: 'Autres dettes', value: 8.4, color: '#94A3B8' },
];

// Charges financières
const chargesFinancieres = [
  { annee: '2022', montant: 142.1 },
  { annee: '2023', montant: 171.0 },
  { annee: '2024', montant: 213.0 },
  { annee: '2025', montant: 224.5 },
];

// Équivalences pour 224.5 M€ d'intérêts
const equivalences = [
  { label: 'Écoles rénovées', valeur: '45', unite: 'écoles', description: 'Budget moyen: 5 M€/école' },
  { label: 'Places de crèche', valeur: '12 500', unite: 'places/an', description: 'Coût annuel: 18 k€/place' },
  { label: 'Km de pistes cyclables', valeur: '450', unite: 'km', description: 'Coût moyen: 0,5 M€/km' },
  { label: 'Logements sociaux', valeur: '1 320', unite: 'logements', description: 'Coût production: 170 k€/logement' },
];

export default function DettePage() {
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
              La dette de <span className="text-accent">Paris</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Une dette qui atteint des niveaux historiques et pèse sur les générations futures
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
                9,4<span className="text-lg ml-1">Md€</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Dette totale</div>
              <div className="text-red-400 text-xs mt-2">+682 M€ en 1 an</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold">
                16,4<span className="text-lg ml-1">ans</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Pour rembourser</div>
              <div className="text-red-400 text-xs mt-2">+1,1 an vs 2024</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold">
                224,5<span className="text-lg ml-1">M€</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Intérêts annuels</div>
              <div className="text-red-400 text-xs mt-2">+5,4 % vs 2024</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold">
                994<span className="text-lg ml-1">M€</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Nouvel emprunt</div>
              <div className="text-red-400 text-xs mt-2">+3,3 % vs 2024</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Évolution de la dette */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Une dette qui explose
            </h2>
            <p className="text-gray-600 mb-8">
              Évolution de l'<InfoTooltip terme="Encours de dette">encours total de la dette</InfoTooltip> depuis 2015 (en Md€) — Sources : CRC Île-de-France
            </p>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={evolutionDette}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="annee" tick={{ fill: '#6B7280' }} />
                  <YAxis
                    tick={{ fill: '#6B7280' }}
                    domain={[4000, 10000]}
                    tickFormatter={(v) => `${(v / 1000).toFixed(1)} Md€`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${(value / 1000).toFixed(2)} Md€`, 'Dette']}
                    contentStyle={{ backgroundColor: '#0D1B4C', color: 'white', border: 'none', borderRadius: '8px' }}
                  />
                  <defs>
                    <linearGradient id="detteGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E30613" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#E30613" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="dette"
                    stroke="#E30613"
                    fill="url(#detteGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="dette"
                    stroke="#E30613"
                    strokeWidth={3}
                    dot={{ fill: '#E30613', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 border-l-4 border-accent rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-accent">+4,7 Md€ en 10 ans (+101 %)</span> : la dette est passée de 4,67 Md€ fin 2015 à 9,36 Md€ fin 2025. Elle a plus que doublé sous la mandature Hidalgo.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-amber-700">Seule baisse en 2019</span> : la dette a diminué de 62 M€ cette année-là, avant de repartir fortement à la hausse dès 2020 (année Covid : +742 M€).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Composition de la dette */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Composition de la dette
            </h2>
            <p className="text-gray-600 mb-8">
              Répartition de l'encours total de 9,36 Md€ fin 2025
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm flex justify-center">
                <DonutChart data={compositionDette} height={300} />
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-primary">
                  <h3 className="font-bold text-primary mb-2"><InfoTooltip terme="Dette obligataire">Dette bancaire et obligataire</InfoTooltip></h3>
                  <div className="text-3xl font-bold text-gray-800">9 292 M€</div>
                  <p className="text-sm text-gray-600 mt-2">
                    99,3 % de la dette totale. Emprunts contractés auprès de banques et via l'émission d'obligations sur les marchés.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-500">
                  <h3 className="font-bold text-primary mb-2">Autres dettes</h3>
                  <div className="text-2xl font-bold text-gray-800">64,8 M€</div>
                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>Échéancier Philharmonie</span>
                      <span className="font-medium">41,8 M€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contrat performance énergétique</span>
                      <span className="font-medium">14,6 M€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Autres</span>
                      <span className="font-medium">8,4 M€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Durée de désendettement */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              <InfoTooltip terme="Durée de désendettement">Durée de désendettement</InfoTooltip>
            </h2>
            <p className="text-gray-600 mb-8">
              Nombre d'années nécessaires pour rembourser la dette avec l'<InfoTooltip terme="Épargne brute">épargne brute</InfoTooltip> actuelle
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <ResponsiveContainer width="100%" height={280}>
                  <ComposedChart data={evolutionDuree}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="annee" tick={{ fill: '#6B7280' }} />
                    <YAxis
                      tick={{ fill: '#6B7280' }}
                      domain={[0, 20]}
                      tickFormatter={(v) => `${v} ans`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value} ans`, 'Durée']}
                      contentStyle={{ backgroundColor: '#0D1B4C', color: 'white', border: 'none', borderRadius: '8px' }}
                    />
                    <ReferenceLine y={12} stroke="#10B981" strokeDasharray="5 5" label={{ value: 'Seuil de vigilance', fill: '#10B981', fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="duree"
                      stroke="#E30613"
                      strokeWidth={3}
                      dot={{ fill: '#E30613', strokeWidth: 2 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-accent">!</span>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent">16,4 ans</div>
                      <div className="text-sm text-gray-600">pour rembourser en 2025</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h4 className="font-medium text-primary mb-3">Comment c'est calculé ?</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Dette totale</span>
                      <span className="font-bold">9 357 M€</span>
                    </div>
                    <div className="text-center">÷</div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span><InfoTooltip terme="Épargne brute">Épargne brute</InfoTooltip> annuelle</span>
                      <span className="font-bold">571 M€</span>
                    </div>
                    <div className="text-center">=</div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span>Durée de désendettement</span>
                      <span className="font-bold text-accent">16,4 ans</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-500">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">Seuil d'alerte :</span> Au-delà de 12 ans, une collectivité est considérée en situation financière dégradée.
                  </p>
                </div>
              </div>
            </div>
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
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Le coût de la dette
            </h2>
            <p className="text-gray-600 mb-8">
              Évolution des intérêts payés chaque année (en M€)
            </p>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
                <BarChartHorizontal
                  data={chargesFinancieres.map(c => ({
                    label: c.annee,
                    value: c.montant,
                  }))}
                />

                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">+58 %</div>
                    <div className="text-xs text-gray-600">depuis 2022</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">615 K€</div>
                    <div className="text-xs text-gray-600">d'intérêts par jour</div>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Remboursement 2025</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm">Capital remboursé</div>
                    <div className="text-2xl font-bold">308,1 M€</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Intérêts payés</div>
                    <div className="text-2xl font-bold text-accent">224,5 M€</div>
                  </div>
                  <hr className="border-white/20" />
                  <div>
                    <div className="text-gray-400 text-sm">Total <InfoTooltip terme="Annuité">annuité</InfoTooltip></div>
                    <div className="text-2xl font-bold">532,6 M€</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Équivalences */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              224,5 M€ d'intérêts, c'est...
            </h2>
            <p className="text-gray-600 mb-8">
              Ce que Paris pourrait financer chaque année avec le montant des intérêts de la dette
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {equivalences.map((equiv, index) => (
                <motion.div
                  key={equiv.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 shadow-sm text-center"
                >
                  <div className="text-3xl font-bold text-accent">{equiv.valeur}</div>
                  <div className="text-sm font-medium text-primary mt-1">{equiv.unite}</div>
                  <div className="text-xs text-gray-500 mt-2">{equiv.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Épargne brute */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              L'<InfoTooltip terme="Épargne brute">épargne brute</InfoTooltip> : la capacité à investir
            </h2>
            <p className="text-gray-600 mb-8">
              Différence entre recettes et dépenses de fonctionnement (en M€)
            </p>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={evolutionEpargneBrute}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="annee" tick={{ fill: '#6B7280' }} />
                  <YAxis
                    tick={{ fill: '#6B7280' }}
                    domain={[0, 800]}
                    tickFormatter={(v) => `${v} M€`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(1)} M€`, 'Épargne brute']}
                    contentStyle={{ backgroundColor: '#0D1B4C', color: 'white', border: 'none', borderRadius: '8px' }}
                  />
                  <defs>
                    <linearGradient id="epargneGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="montant"
                    stroke="#10B981"
                    fill="url(#epargneGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="montant"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="text-sm font-medium text-gray-700">2020 : Année Covid</div>
                  <div className="text-xl font-bold text-red-600">20,1 M€</div>
                  <div className="text-xs text-gray-600">Effondrement des recettes</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="text-sm font-medium text-gray-700">2023 : Rebond</div>
                  <div className="text-xl font-bold text-green-600">758,4 M€</div>
                  <div className="text-xs text-gray-600">Recettes exceptionnelles</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <div className="text-sm font-medium text-gray-700">2025 : Stagnation</div>
                  <div className="text-xl font-bold text-amber-600">571,3 M€</div>
                  <div className="text-xs text-gray-600">Fin des effets JO</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bilan emprunts */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Le cycle de l'endettement
            </h2>
            <p className="text-gray-600 mb-8">
              Comparaison entre remboursements et nouveaux emprunts en 2025
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-sm text-gray-500 mb-2">Capital remboursé</div>
                <div className="text-4xl font-bold text-green-600">308 M€</div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '31%' }}></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm text-center flex flex-col justify-center">
                <div className="text-sm text-gray-500 mb-2">Nouvel emprunt</div>
                <div className="text-4xl font-bold text-red-600">994 M€</div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="bg-primary text-white rounded-xl p-6 shadow-sm text-center flex flex-col justify-center">
                <div className="text-sm text-gray-400 mb-2">Endettement net</div>
                <div className="text-4xl font-bold text-accent">+686 M€</div>
                <div className="text-sm text-gray-400 mt-2">de dette supplémentaire</div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border-l-4 border-accent">
              <p className="text-gray-700">
                <span className="font-bold">Cercle vicieux :</span> Paris emprunte chaque année plus de 3 fois ce qu'elle rembourse.
                En 2025, la Ville rembourse 308 M€ mais emprunte 994 M€,
                creusant ainsi la dette de 686 M€ supplémentaires.
              </p>
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
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-accent">
                <h3 className="font-bold text-primary mb-2">Dette record</h3>
                <p className="text-sm text-gray-600">
                  9,4 Md€ fin 2025, un niveau jamais atteint dans l'histoire de Paris.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-accent">
                <h3 className="font-bold text-primary mb-2">Remboursement lointain</h3>
                <p className="text-sm text-gray-600">
                  16,4 ans pour rembourser, bien au-delà du seuil d'alerte de 12 ans.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-accent">
                <h3 className="font-bold text-primary mb-2">Intérêts croissants</h3>
                <p className="text-sm text-gray-600">
                  224,5 M€ d'intérêts en 2025, soit 615 000 € par jour qui ne servent pas les Parisiens.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-accent">
                <h3 className="font-bold text-primary mb-2">Spirale d'endettement</h3>
                <p className="text-sm text-gray-600">
                  Paris emprunte 994 M€ pour rembourser 308 M€ : la dette ne fait que croître.
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
