'use client';

import { motion } from 'framer-motion';
import { DonutChart, BarChartHorizontal, ChiffreCard } from '@/components/charts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import InfoTooltip from '@/components/InfoTooltip';

// Données des recettes de fonctionnement
const recettesFonctionnement = {
  total: 9839.5,
  variation: '+0,2 %',
  repartition: [
    { name: 'Fiscalité directe', value: 2191.0, color: '#22496A' },
    { name: 'Fiscalité indirecte & TVA', value: 2981.8, color: '#E1386E' },
    { name: 'Attributions de compensation', value: 1842.4, color: '#FBCD41' },
    { name: 'Recettes de gestion', value: 1504.1, color: '#22496A' },
    { name: 'Dotations État', value: 180.5, color: '#E1386E' },
    { name: 'Autres', value: 1139.7, color: '#FBCD41' },
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
    mesure: 'Hausse cotisation retraite agents (CNRACL +4 pts)',
    risque: 45,
    description: 'Fin de la compensation 2024'
  },
  {
    mesure: 'Relèvement plafond péréquation',
    risque: 80,
    description: 'Paris déjà 1er contributeur national'
  },
  {
    mesure: 'Réduction remboursement TVA (FCTVA)',
    risque: 20,
    description: '-800 M€ au niveau national'
  },
];

// Dotations et compensations
const dotationsCompensations = [
  { label: 'Taxe sur les assurances (TSCA)', value: 92.0 },
  { label: 'Compensations d\'exonérations fiscales', value: 34.0 },
  { label: 'Dotation décentralisation (DGD)', value: 15.8 },
  { label: 'Taxe carburants (TICPE)', value: 15.6 },
  { label: 'Dotation péréquation (DCP)', value: 10.8 },
  { label: 'Remboursement TVA (FCTVA)', value: 10.0 },
  { label: 'Autres', value: 2.3 },
];

// Recettes de gestion par fonction
const recettesGestion = [
  { label: 'Transports', value: 472.7, color: '#22496A' },
  { label: 'Santé et action sociale', value: 321.4, color: '#E1386E' },
  { label: 'Services généraux', value: 232.2, color: '#FBCD41' },
  { label: 'Environnement', value: 152.6, color: '#E1386E' },
  { label: 'Culture et sports', value: 119.3, color: '#22496A' },
  { label: 'Action économique', value: 73.9, color: '#FBCD41' },
  { label: 'Enseignement', value: 70.5, color: '#22496A' },
  { label: 'Aménagement', value: 60.2, color: '#E1386E' },
  { label: 'Sécurité', value: 1.3, color: '#22496A' },
];

// Chronologie des réformes fiscales
const reformesFiscales = [
  { annee: 2010, reforme: 'Suppression taxe professionnelle' },
  { annee: 2016, reforme: 'Transfert cotisation entreprises (CVAE) à la Métropole' },
  { annee: 2017, reforme: 'Transfert CVAE départementale à la Région' },
  { annee: 2023, reforme: 'Suppression totale de la CVAE' },
  { annee: 2025, reforme: 'Transfert cotisation foncière (CFE) à la Métropole' },
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
            <p className="text-yellow uppercase tracking-wide text-sm mb-2 font-medium">
              Budget 2025
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              D'où vient l'argent ?
            </h1>
            <p className="text-xl text-cream/80 max-w-2xl mx-auto">
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
            <div className="bg-cream/10 backdrop-blur rounded-xl p-4 text-center border border-yellow/20">
              <div className="text-2xl md:text-3xl font-bold text-yellow">9,84</div>
              <div className="text-sm text-cream/70">Md€ de recettes</div>
              <div className="text-xs text-yellow mt-1">+0,2 % vs 2024</div>
            </div>
            <div className="bg-cream/10 backdrop-blur rounded-xl p-4 text-center border border-yellow/20">
              <div className="text-2xl md:text-3xl font-bold text-yellow">53 %</div>
              <div className="text-sm text-cream/70">Fiscalité</div>
              <div className="text-xs text-cream/50 mt-1">directe + indirecte</div>
            </div>
            <div className="bg-cream/10 backdrop-blur rounded-xl p-4 text-center border border-yellow/20">
              <div className="text-2xl md:text-3xl font-bold text-yellow">1,85</div>
              <div className="text-sm text-cream/70">Md€ taxe foncière</div>
              <div className="text-xs text-accent mt-1">+14,6 M€</div>
            </div>
            <div className="bg-cream/10 backdrop-blur rounded-xl p-4 text-center border border-yellow/20">
              <div className="text-2xl md:text-3xl font-bold text-yellow">0</div>
              <div className="text-sm text-cream/70">€ de DGF</div>
              <div className="text-xs text-accent mt-1">4e année sans</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vue globale */}
      <section className="py-12 bg-cream">
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
            <p className="text-primary/80 max-w-3xl mx-auto">
              Pour financer ses dépenses, Paris dispose de 9,8 milliards d'euros de recettes chaque année.
              Cet argent vient principalement des impôts (taxe foncière, taxes sur les ventes immobilières),
              des compensations de l'État pour les impôts supprimés, et des recettes diverses (stationnement, cantines...).
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
            <p className="text-primary/80 max-w-3xl">
              La fiscalité directe, ce sont les impôts que Paris collecte directement auprès des Parisiens.
              L'essentiel vient de la taxe foncière, payée par tous les propriétaires d'appartements ou de commerces.
              Cette taxe augmente automatiquement chaque année avec l'inflation (+1,5 % en 2025).
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
                  <span className="text-lg text-primary/80">M€</span>
                </div>
                <div className="font-medium text-primary mt-1">
                  <InfoTooltip terme="TFPB">Taxe foncière (TFPB)</InfoTooltip>
                </div>
                <div className="text-xs text-accent mt-1">+14,6 M€ vs 2024</div>
                <p className="text-sm text-primary/70 mt-2">Indexation des bases : +1,5 % (inflation nov 2023 à nov 2024)</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-primary">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">335,5</span>
                  <span className="text-lg text-primary/80">M€</span>
                </div>
                <div className="font-medium text-primary mt-1">
                  <InfoTooltip terme="THRS">Taxe habitation résidences secondaires</InfoTooltip>
                </div>
                <div className="text-xs text-accent mt-1">+11,8 M€ vs 2024</div>
                <p className="text-sm text-primary/70 mt-2">Majoration de 60 % sur les résidences secondaires</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-primary">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">4,3</span>
                  <span className="text-lg text-primary/80">M€</span>
                </div>
                <div className="font-medium text-primary mt-1">
                  <InfoTooltip terme="IFER">IFER (réseaux)</InfoTooltip>
                </div>
                <div className="text-xs text-yellow mt-1">+12,4 %</div>
                <p className="text-sm text-primary/70 mt-2">Transformateurs, stations radio, installations gazières</p>
              </div>
            </div>
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
            <p className="text-primary/80 max-w-3xl">
              À chaque vente d'appartement à Paris, l'acheteur paie des « frais de notaire » dont une partie revient à la Ville.
              Ces <InfoTooltip terme="DMTO">droits de mutation (DMTO)</InfoTooltip> dépendent du nombre de ventes : quand le marché immobilier ralentit, les recettes chutent.
              Depuis 2023, le marché est en berne et Paris perd 400 millions par rapport au pic.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={evolutionFiscaliteImmobiliere}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#22496A" />
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
                  <Line
                    type="monotone"
                    dataKey="montant"
                    stroke="#22496A"
                    strokeWidth={3}
                    dot={{ fill: '#22496A', strokeWidth: 2, r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-amber-500">
                <div className="text-2xl font-bold text-primary">1 328 M€</div>
                <div className="text-sm text-primary/80 mt-1">DMTO prévus en 2025</div>
                <p className="text-xs text-primary/70 mt-2">
                  Stabilisation après le pic de 2022-2023
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="text-2xl font-bold text-accent">-24 %</div>
                <div className="text-sm text-primary/80 mt-1">vs pic 2023</div>
                <p className="text-xs text-primary/70 mt-2">
                  Impact du ralentissement du marché immobilier parisien
                </p>
              </div>
              <div className="bg-cream rounded-xl p-4">
                <p className="text-xs text-primary/80">
                  Les DMTO sont très sensibles à la conjoncture immobilière.
                  Après un record en 2022-2023, les recettes reviennent au niveau pré-COVID.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impacts PLF 2025 */}
      <section className="py-12 bg-accent/10">
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
            <p className="text-primary/80 max-w-3xl">
              Chaque année, le gouvernement vote une loi de finances qui impacte les recettes des villes.
              En 2025, plusieurs mesures menacent Paris : prélèvements sur les réserves, gel des compensations, hausse des cotisations retraite...
              Au total, Paris pourrait perdre jusqu'à 350 millions d'euros à cause de ces décisions nationales.
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
                      <div className="text-sm text-primary/70">{impact.description}</div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-accent">-{impact.risque} M€</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-accent">
                <div className="text-3xl font-bold text-accent">-{totalImpactPLF} M€</div>
                <div className="text-sm text-primary/80 mt-1">Impact total estimé</div>
                <p className="text-xs text-primary/70 mt-3">
                  Soit environ 3,5 % des recettes de fonctionnement
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-primary mb-3">Chronologie des pertes</h4>
                <div className="space-y-2">
                  {reformesFiscales.map((r) => (
                    <div key={r.annee} className="flex items-start gap-2 text-sm">
                      <span className="font-mono text-primary/70">{r.annee}</span>
                      <span className="text-primary">{r.reforme}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-primary/70 mt-3 pt-3 border-t">
                  Perte cumulée de pouvoir fiscal : 2 Md€
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dotations et compensations */}
      <section className="py-12 bg-cream">
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
            <p className="text-primary/80 max-w-3xl">
              Normalement, l'État verse de l'argent aux villes via la Dotation Globale de Fonctionnement (DGF).
              Mais Paris ne touche plus rien depuis 4 ans : la Ville est jugée « trop riche » pour y avoir droit.
              Paris ne reçoit que des compensations pour les impôts que l'État lui a supprimés au fil des ans.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartHorizontal
              data={dotationsCompensations}
              title="Détail des dotations"
              subtitle="En M€"
            />

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-accent">
                <div className="text-4xl font-bold text-accent">0 €</div>
                <div className="text-lg font-semibold text-primary mt-2">
                  <InfoTooltip terme="DGF">Dotation Globale de Fonctionnement (DGF)</InfoTooltip>
                </div>
                <p className="text-primary/80 text-sm mt-2">
                  Pour la 4ème année consécutive, Paris ne perçoit aucune DGF.
                  La Ville est considérée comme "trop riche" pour en bénéficier.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-2xl font-bold text-primary">1 842 M€</div>
                <div className="text-sm text-primary/80 mt-1">
                  <InfoTooltip terme="Attributions de compensation">Attributions de compensation</InfoTooltip> (<InfoTooltip terme="MGP">MGP</InfoTooltip> + Région)
                </div>
                <p className="text-primary/70 text-xs mt-2">
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
            <p className="text-primary/80 max-w-3xl">
              En plus des impôts, Paris gagne de l'argent grâce à ses propres activités.
              Le stationnement payant rapporte 380 millions par an, les cantines et crèches génèrent des recettes,
              et certaines aides sociales (RSA, handicap) sont partiellement remboursées par l'État ou la CAF.
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
              <ul className="text-sm text-primary/80 space-y-1">
                <li>Stationnement payant : 380 M€</li>
                <li>Redevances parkings concédés : 43,6 M€</li>
                <li>Fourrières : 16,9 M€</li>
                <li>Autres recettes voirie : 32,2 M€</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-primary mb-2">Santé/Social : 321,4 M€</h4>
              <ul className="text-sm text-primary/80 space-y-1">
                <li>Recettes établissements sociaux : 156,2 M€</li>
                <li>Participations familles (crèches, cantines) : 98,7 M€</li>
                <li>Remboursements divers : 66,5 M€</li>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
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
                className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-cream transition-colors"
              >
                Les dépenses
              </Link>
              <Link
                href="/dette"
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E1386E] transition-colors"
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
