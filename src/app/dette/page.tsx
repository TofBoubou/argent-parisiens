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

// Durée de désendettement (Dette / Épargne brute)
const evolutionDuree = [
  { annee: '2018', duree: 9.4 },
  { annee: '2019', duree: 8.8 },
  { annee: '2020', duree: 329.5, hors_echelle: true }, // Covid : épargne brute effondrée à 20 M€
  { annee: '2021', duree: 15.7 },
  { annee: '2022', duree: 13.3 },
  { annee: '2023', duree: 10.6 },
  { annee: '2024', duree: 15.3 },
  { annee: '2025', duree: 16.4 },
];

// Composition de la dette
const compositionDette = [
  { name: 'Dette bancaire et obligataire', value: 9292, color: '#22496A' },
  { name: 'Contrat performance énergétique', value: 14.6, color: '#E1386E' },
  { name: 'Échéancier Philharmonie', value: 41.8, color: '#FBCD41' },
  { name: 'Autres dettes', value: 8.4, color: '#E1386E' },
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
            <p className="text-yellow uppercase tracking-wide text-sm font-medium mb-2">
              Budget 2025
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              La dette de <span className="text-accent">Paris</span>
            </h1>
            <p className="text-xl text-cream/80 max-w-2xl mx-auto">
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
              <div className="text-2xl md:text-3xl font-bold text-yellow">
                9,4<span className="text-lg ml-1">Md€</span>
              </div>
              <div className="text-cream/70 text-sm mt-1">Dette totale</div>
              <div className="text-accent/80 text-xs mt-2">+682 M€ en 1 an</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow">
                16,4<span className="text-lg ml-1">ans</span>
              </div>
              <div className="text-cream/70 text-sm mt-1">Pour rembourser</div>
              <div className="text-accent/80 text-xs mt-2">+1,1 an vs 2024</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow">
                224,5<span className="text-lg ml-1">M€</span>
              </div>
              <div className="text-cream/70 text-sm mt-1">Intérêts annuels</div>
              <div className="text-accent/80 text-xs mt-2">+5,4 % vs 2024</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow">
                994<span className="text-lg ml-1">M€</span>
              </div>
              <div className="text-cream/70 text-sm mt-1">Nouvel emprunt</div>
              <div className="text-accent/80 text-xs mt-2">+3,3 % vs 2024</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Évolution de la dette */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Une dette qui explose
            </h2>
            <p className="text-primary/80 mb-8 max-w-3xl">
              La dette, c'est l'argent que Paris a emprunté et qu'elle doit rembourser.
              En 10 ans, elle a plus que doublé : de 4,7 milliards en 2015 à 9,4 milliards en 2025.
              Chaque année, la Ville emprunte plus qu'elle ne rembourse, ce qui fait grossir la dette.
            </p>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={evolutionDette}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#22496A" />
                  <XAxis dataKey="annee" tick={{ fill: '#22496A' }} />
                  <YAxis
                    tick={{ fill: '#22496A' }}
                    domain={[4000, 10000]}
                    tickFormatter={(v) => `${(v / 1000).toFixed(1)} Md€`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${(value / 1000).toFixed(2)} Md€`, 'Dette']}
                    contentStyle={{ backgroundColor: '#22496A', color: 'white', border: 'none', borderRadius: '8px' }}
                  />
                  <defs>
                    <linearGradient id="detteGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E1386E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#E1386E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="dette"
                    stroke="none"
                    fill="url(#detteGradient)"
                    tooltipType="none"
                  />
                  <Line
                    type="monotone"
                    dataKey="dette"
                    stroke="#E1386E"
                    strokeWidth={3}
                    dot={{ fill: '#E1386E', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                  <p className="text-sm text-primary">
                    <span className="font-bold text-accent">+4,7 Md€ en 10 ans (+101 %)</span> : la dette est passée de 4,67 Md€ fin 2015 à 9,36 Md€ fin 2025. Elle a plus que doublé sous la mandature Hidalgo.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                  <p className="text-sm text-primary">
                    <span className="font-bold text-yellow">Seule baisse en 2019</span> : la dette a diminué de 62 M€ cette année-là, avant de repartir fortement à la hausse dès 2020 (année Covid : +742 M€).
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
            <p className="text-primary/80 mb-8 max-w-3xl">
              La quasi-totalité de la dette (99 %) provient d'emprunts classiques auprès de banques ou sur les marchés financiers.
              Paris emprunte pour financer ses gros investissements : écoles, logements sociaux, équipements sportifs...
              Le reste correspond à des engagements spécifiques comme la participation à la Philharmonie.
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm flex justify-center">
                <DonutChart data={compositionDette} height={300} />
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-primary">
                  <h3 className="font-bold text-primary mb-2"><InfoTooltip terme="Dette obligataire">Dette bancaire et obligataire</InfoTooltip></h3>
                  <div className="text-3xl font-bold text-primary">9 292 M€</div>
                  <p className="text-sm text-primary/80 mt-2">
                    99,3 % de la dette totale. Emprunts contractés auprès de banques et via l'émission d'obligations sur les marchés.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-500">
                  <h3 className="font-bold text-primary mb-2">Autres dettes</h3>
                  <div className="text-2xl font-bold text-primary">64,8 M€</div>
                  <div className="text-sm text-primary/80 mt-2 space-y-1">
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
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              <InfoTooltip terme="Durée de désendettement">Durée de désendettement</InfoTooltip>
            </h2>
            <p className="text-primary/80 mb-8 max-w-3xl">
              Ce chiffre indique combien d'années il faudrait pour rembourser toute la dette si Paris y consacrait toute son épargne.
              En 2025, il faudrait 16,4 ans. C'est beaucoup trop : au-delà de 12 ans, les experts considèrent qu'une ville est en difficulté financière.
              Plus ce chiffre augmente, plus la situation se dégrade.
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <ResponsiveContainer width="100%" height={320}>
                  <ComposedChart data={evolutionDuree.filter(d => !d.hors_echelle)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#22496A" />
                    <XAxis dataKey="annee" tick={{ fill: '#22496A' }} />
                    <YAxis
                      tick={{ fill: '#22496A' }}
                      domain={[0, 20]}
                      tickFormatter={(v) => `${v} ans`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value.toFixed(1)} ans`, 'Durée']}
                      contentStyle={{ backgroundColor: '#22496A', color: 'white', border: 'none', borderRadius: '8px' }}
                    />
                    <ReferenceLine y={12} stroke="#FBCD41" strokeDasharray="5 5" label={{ value: 'Seuil d\'alerte (12 ans)', fill: '#FBCD41', fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="duree"
                      stroke="#E1386E"
                      strokeWidth={3}
                      dot={{ fill: '#E1386E', strokeWidth: 2 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                  <p className="text-xs text-primary">
                    <span className="font-bold text-accent">2020 hors échelle : 329 ans</span> — L'épargne brute s'est effondrée à 20 M€ (contre 670 M€ en 2019) à cause du Covid.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-accent">!</span>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent">16,4 ans</div>
                      <div className="text-sm text-primary/80">pour rembourser en 2025</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h4 className="font-medium text-primary mb-3">Comment c'est calculé ?</h4>
                  <div className="space-y-2 text-sm text-primary/80">
                    <div className="flex justify-between items-center p-2 bg-cream rounded">
                      <span>Dette totale</span>
                      <span className="font-bold">9 357 M€</span>
                    </div>
                    <div className="text-center">÷</div>
                    <div className="flex justify-between items-center p-2 bg-cream rounded">
                      <span><InfoTooltip terme="Épargne brute">Épargne brute</InfoTooltip> annuelle</span>
                      <span className="font-bold">571 M€</span>
                    </div>
                    <div className="text-center">=</div>
                    <div className="flex justify-between items-center p-2 bg-accent/10 rounded">
                      <span>Durée de désendettement</span>
                      <span className="font-bold text-accent">16,4 ans</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-500">
                  <p className="text-sm text-primary">
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
            <p className="text-primary/80 mb-8 max-w-3xl">
              Quand on emprunte, il faut payer des intérêts en plus du remboursement. En 2025, Paris paiera 225 millions d'euros rien qu'en intérêts.
              C'est de l'argent « perdu » qui ne finance aucun service pour les Parisiens : il va aux banques et aux investisseurs.
              Ces intérêts ont augmenté de 58 % en 3 ans à cause de la hausse des taux et de la dette croissante.
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
                  <div className="p-3 bg-cream rounded-lg">
                    <div className="text-2xl font-bold text-primary">+58 %</div>
                    <div className="text-xs text-primary/80">depuis 2022</div>
                  </div>
                  <div className="p-3 bg-cream rounded-lg">
                    <div className="text-2xl font-bold text-primary">615 K€</div>
                    <div className="text-xs text-primary/80">d'intérêts par jour</div>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Remboursement 2025</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-primary/60 text-sm">Capital remboursé</div>
                    <div className="text-2xl font-bold">308,1 M€</div>
                  </div>
                  <div>
                    <div className="text-primary/60 text-sm">Intérêts payés</div>
                    <div className="text-2xl font-bold text-accent">224,5 M€</div>
                  </div>
                  <hr className="border-white/20" />
                  <div>
                    <div className="text-primary/60 text-sm">Total <InfoTooltip terme="Annuité">annuité</InfoTooltip></div>
                    <div className="text-2xl font-bold">532,6 M€</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Équivalences */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              224,5 M€ d'intérêts, c'est...
            </h2>
            <p className="text-primary/80 mb-8 max-w-3xl">
              Pour mieux comprendre ce que représentent 225 millions d'euros par an, voici ce que Paris pourrait financer à la place.
              Chaque année, cet argent part en fumée au lieu de servir les Parisiens.
              C'est le prix de l'endettement : moins d'écoles rénovées, moins de places de crèche, moins de logements.
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
                  <div className="text-xs text-cream/50 mt-2">{equiv.description}</div>
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
            <p className="text-primary/80 mb-8 max-w-3xl">
              L'épargne brute, c'est ce qu'il reste à Paris une fois les dépenses courantes payées.
              C'est l'argent disponible pour investir (construire, rénover) et rembourser la dette.
              Plus l'épargne est faible, plus Paris doit emprunter pour investir, ce qui alourdit encore la dette.
            </p>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={evolutionEpargneBrute}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#22496A" />
                  <XAxis dataKey="annee" tick={{ fill: '#22496A' }} />
                  <YAxis
                    tick={{ fill: '#22496A' }}
                    domain={[0, 800]}
                    tickFormatter={(v) => `${v} M€`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(1)} M€`, 'Épargne brute']}
                    contentStyle={{ backgroundColor: '#22496A', color: 'white', border: 'none', borderRadius: '8px' }}
                  />
                  <defs>
                    <linearGradient id="epargneGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FBCD41" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FBCD41" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="montant"
                    stroke="none"
                    fill="url(#epargneGradient)"
                    tooltipType="none"
                  />
                  <Line
                    type="monotone"
                    dataKey="montant"
                    stroke="#FBCD41"
                    strokeWidth={3}
                    dot={{ fill: '#FBCD41', strokeWidth: 2 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
                  <div className="text-sm font-medium text-primary">2020 : Année Covid</div>
                  <div className="text-xl font-bold text-accent">20,1 M€</div>
                  <div className="text-xs text-primary/80">Effondrement des recettes</div>
                </div>
                <div className="p-4 bg-yellow/10 rounded-lg border-l-4 border-yellow">
                  <div className="text-sm font-medium text-primary">2023 : Rebond</div>
                  <div className="text-xl font-bold text-yellow">758,4 M€</div>
                  <div className="text-xs text-primary/80">Recettes exceptionnelles</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <div className="text-sm font-medium text-primary">2025 : Stagnation</div>
                  <div className="text-xl font-bold text-yellow">571,3 M€</div>
                  <div className="text-xs text-primary/80">Fin des effets JO</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bilan emprunts */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Le cycle de l'endettement
            </h2>
            <p className="text-primary/80 mb-8 max-w-3xl">
              C'est ici qu'on voit le problème : Paris emprunte chaque année plus qu'elle ne rembourse.
              En 2025, elle rembourse 308 millions mais emprunte 994 millions. Résultat : 686 millions de dette en plus.
              Tant que ce déséquilibre perdure, la dette continuera de grossir année après année.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-sm text-primary/70 mb-2">Capital remboursé</div>
                <div className="text-4xl font-bold text-yellow">308 M€</div>
                <div className="mt-3 w-full bg-cream/80 rounded-full h-3">
                  <div className="bg-yellow/100 h-3 rounded-full" style={{ width: '31%' }}></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm text-center flex flex-col justify-center">
                <div className="text-sm text-primary/70 mb-2">Nouvel emprunt</div>
                <div className="text-4xl font-bold text-accent">994 M€</div>
                <div className="mt-3 w-full bg-cream/80 rounded-full h-3">
                  <div className="bg-accent/100 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="bg-primary text-white rounded-xl p-6 shadow-sm text-center flex flex-col justify-center">
                <div className="text-sm text-cream/70 mb-2">Endettement net</div>
                <div className="text-4xl font-bold text-accent">+686 M€</div>
                <div className="text-sm text-cream/70 mt-2">de dette supplémentaire</div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border-l-4 border-accent">
              <p className="text-primary">
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
                <p className="text-sm text-primary/80">
                  9,4 Md€ fin 2025, un niveau jamais atteint dans l'histoire de Paris.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-accent">
                <h3 className="font-bold text-primary mb-2">Remboursement lointain</h3>
                <p className="text-sm text-primary/80">
                  16,4 ans pour rembourser, bien au-delà du seuil d'alerte de 12 ans.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-accent">
                <h3 className="font-bold text-primary mb-2">Intérêts croissants</h3>
                <p className="text-sm text-primary/80">
                  224,5 M€ d'intérêts en 2025, soit 615 000 € par jour qui ne servent pas les Parisiens.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-accent">
                <h3 className="font-bold text-primary mb-2">Spirale d'endettement</h3>
                <p className="text-sm text-primary/80">
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
                className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-cream transition-colors"
              >
                Les recettes
              </Link>
              <Link
                href="/depenses"
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E1386E] transition-colors"
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
