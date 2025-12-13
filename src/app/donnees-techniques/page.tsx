'use client';

import { motion } from 'framer-motion';
import { DonutChart, BarChartHorizontal } from '@/components/charts';
import Link from 'next/link';
import InfoTooltip from '@/components/InfoTooltip';

// Participations aux autres budgets - dégradé bleu → rouge → jaune
const participations = [
  { name: 'IDFM (transports)', value: 472.2, bp2024: 441.4, color: '#0D1B4C' },
  { name: 'CASVP (action sociale)', value: 419.6, bp2024: 430.1, color: '#1e3a8a' },
  { name: 'Préfecture de Police', value: 256.4, bp2024: 252.4, color: '#dc2626' },
  { name: 'Caisses des écoles', value: 132.4, bp2024: 112.0, color: '#ef4444' },
  { name: 'SYCTOM (déchets)', value: 119.0, bp2024: 114.8, color: '#f87171' },
  { name: 'Crèches associatives', value: 72.0, bp2024: 65.0, color: '#d97706' },
  { name: 'Paris Musées', value: 58.5, bp2024: 56.2, color: '#f59e0b' },
  { name: 'Dotation collèges', value: 38.1, bp2024: 37.7, color: '#fbbf24' },
];

// Recettes de fonctionnement
const recettesCategories = [
  { label: 'Fiscalité et compensations', bp2024: 7988.7, bp2025: 7950.2 },
  { label: 'Produits d\'exploitation', bp2024: 1194.0, bp2025: 1220.5 },
  { label: 'Dotations et participations', bp2024: 356.5, bp2025: 372.0 },
  { label: 'Insertion (allocations RSA)', bp2024: 265.7, bp2025: 266.6 },
  { label: 'Reprises provisions', bp2024: 36.6, bp2025: 50.4 },
  { label: 'Autonomie (allocation personnes âgées)', bp2024: 26.6, bp2025: 26.7 },
  { label: 'Produits financiers', bp2024: 25.0, bp2025: 13.9 },
];

// Dépenses de fonctionnement
const depensesCategories = [
  { label: 'Masse salariale', bp2024: 2784.5, bp2025: 2853.1 },
  { label: 'Dépenses de gestion', bp2024: 2128.9, bp2025: 2113.1 },
  { label: 'Atténuation de produits', bp2024: 1919.6, bp2025: 1771.8 },
  { label: 'Participations autres budgets', bp2024: 1626.5, bp2025: 1682.0 },
  { label: 'RSA (allocation insertion)', bp2024: 468.1, bp2025: 475.2 },
  { label: 'Charges financières', bp2024: 213.0, bp2025: 224.5 },
  { label: 'APA (allocation personnes âgées)', bp2024: 137.6, bp2025: 145.1 },
];

// Opérations d'ordre
const operationsOrdre = {
  transfertsSections: {
    description: 'Mouvements entre fonctionnement et investissement',
    investissementDepenses: 50.4,
    investissementRecettes: 498.1,
    fonctionnementDepenses: 498.1,
    fonctionnementRecettes: 50.4,
  },
  virementInvestissement: {
    montant: 127.7,
    bp2024: 79.0,
    description: 'Épargne volontaire transférée vers l\'investissement',
  },
  operationsPatrimoniales: {
    montant: 187.9,
    details: [
      { label: 'Réintégration avances et études', value: 109.9 },
      { label: 'Intégration biens gratuits', value: 40.0 },
      { label: 'Loyers capitalisés', value: 25.0 },
      { label: 'Primes émission dette', value: 7.0 },
      { label: 'Investissements arrondissements (ESA)', value: 6.0 },
    ],
  },
};

// Amortissements et provisions - dégradé bleu → rouge → jaune
const amortissementsProvisions = [
  { name: 'Amortissements immobilisations', value: 463.0, color: '#0D1B4C' },
  { name: 'Provisions risques (contentieux)', value: 19.0, color: '#1e3a8a' },
  { name: 'Provisions créances douteuses', value: 8.0, color: '#dc2626' },
  { name: 'Complément prix cessions', value: 4.1, color: '#ef4444' },
  { name: 'Primes remboursement obligations', value: 3.5, color: '#d97706' },
  { name: 'Provisions participations', value: 0.5, color: '#f59e0b' },
];

// Besoin de financement
const financementData = {
  besoin: {
    operationsReelles: 1569.2,
    mouvementsNonFinanciers: 1324.0,
    mouvementsFinanciers: 245.2,
    operationsOrdre: -447.7,
    total: 1121.5,
  },
  moyens: {
    virementFonctionnement: 127.7,
    autorisationEmprunt: 993.8,
    total: 1121.5,
  },
};

export default function DonneesTechniquesPage() {
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
              Données <span className="text-accent">techniques</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Récapitulatif par chapitre budgétaire et opérations d'ordre
            </p>
          </motion.div>
        </div>
      </section>

      {/* Participations aux autres budgets */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Participations aux autres budgets
            </h2>
            <p className="text-gray-600 mb-8">
              1,68 Md€ versés par Paris à d'autres organismes en 2025
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <DonutChart
                data={participations.map(p => ({ name: p.name.split(' ')[0], value: p.value, color: p.color }))}
                height={280}
              />

              <div className="space-y-3">
                {participations.map((p, index) => {
                  const variation = ((p.value - p.bp2024) / p.bp2024 * 100).toFixed(1);
                  const isPositive = p.value > p.bp2024;
                  return (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-8 rounded-full" style={{ backgroundColor: p.color }} />
                        <div>
                          <div className="font-medium text-primary">
                            {p.name.includes('IDFM') ? <><InfoTooltip terme="IDFM">IDFM</InfoTooltip> (transports)</> :
                             p.name.includes('CASVP') ? <><InfoTooltip terme="CASVP">CASVP</InfoTooltip> (action sociale)</> :
                             p.name.includes('SYCTOM') ? <><InfoTooltip terme="SYCTOM">SYCTOM</InfoTooltip> (déchets)</> :
                             p.name}
                          </div>
                          <div className="text-xs text-gray-500">BP 2024 : {p.bp2024.toFixed(1)} M€</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg" style={{ color: p.color }}>{p.value.toFixed(1)} M€</div>
                        <div className={`text-xs ${isPositive ? 'text-red-500' : 'text-green-500'}`}>
                          {isPositive ? '+' : ''}{variation}%
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Récapitulatif - Recettes */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Recettes de fonctionnement par catégorie
            </h2>
            <p className="text-gray-600 mb-8">
              Ventilation des 9,9 Md€ de recettes
            </p>

            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Catégorie</th>
                    <th className="px-4 py-3 text-right">BP 2024</th>
                    <th className="px-4 py-3 text-right">BP 2025</th>
                    <th className="px-4 py-3 text-right">Variation</th>
                  </tr>
                </thead>
                <tbody>
                  {recettesCategories.map((row, index) => {
                    const variation = ((row.bp2025 - row.bp2024) / row.bp2024 * 100).toFixed(1);
                    const isPositive = row.bp2025 > row.bp2024;
                    return (
                      <tr key={row.label} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="px-4 py-3">{row.label}</td>
                        <td className="px-4 py-3 text-right font-medium">{row.bp2024.toFixed(1)} M€</td>
                        <td className="px-4 py-3 text-right font-bold text-primary">{row.bp2025.toFixed(1)} M€</td>
                        <td className={`px-4 py-3 text-right font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {isPositive ? '+' : ''}{variation}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-100 font-bold">
                  <tr>
                    <td className="px-4 py-3">Total recettes fonctionnement</td>
                    <td className="px-4 py-3 text-right">9 898,6 M€</td>
                    <td className="px-4 py-3 text-right text-primary">9 905,7 M€</td>
                    <td className="px-4 py-3 text-right text-green-600">+0,1 %</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Récapitulatif - Dépenses */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Dépenses de fonctionnement par catégorie
            </h2>
            <p className="text-gray-600 mb-8">
              Ventilation des 9,9 Md€ de dépenses
            </p>

            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Catégorie</th>
                    <th className="px-4 py-3 text-right">BP 2024</th>
                    <th className="px-4 py-3 text-right">BP 2025</th>
                    <th className="px-4 py-3 text-right">Variation</th>
                  </tr>
                </thead>
                <tbody>
                  {depensesCategories.map((row, index) => {
                    const variation = ((row.bp2025 - row.bp2024) / row.bp2024 * 100).toFixed(1);
                    const isNegative = row.bp2025 < row.bp2024;
                    return (
                      <tr key={row.label} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="px-4 py-3">{row.label}</td>
                        <td className="px-4 py-3 text-right font-medium">{row.bp2024.toFixed(1)} M€</td>
                        <td className="px-4 py-3 text-right font-bold text-primary">{row.bp2025.toFixed(1)} M€</td>
                        <td className={`px-4 py-3 text-right font-medium ${isNegative ? 'text-green-600' : 'text-red-600'}`}>
                          {!isNegative ? '+' : ''}{variation}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-100 font-bold">
                  <tr>
                    <td className="px-4 py-3">Total dépenses fonctionnement</td>
                    <td className="px-4 py-3 text-right">9 898,6 M€</td>
                    <td className="px-4 py-3 text-right text-primary">9 905,7 M€</td>
                    <td className="px-4 py-3 text-right text-red-600">+0,1 %</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Opérations d'ordre */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              <InfoTooltip terme="Opérations d'ordre">Opérations d'ordre</InfoTooltip>
            </h2>
            <p className="text-gray-600 mb-8">
              Mouvements équilibrés entre sections (sans impact sur la trésorerie)
            </p>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Transferts entre sections */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-primary mb-4">Transferts entre sections</h3>
                <p className="text-sm text-gray-600 mb-4">{operationsOrdre.transfertsSections.description}</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                    <span className="text-sm">Fonctionnement vers Invest.</span>
                    <span className="font-bold text-primary">{operationsOrdre.transfertsSections.fonctionnementDepenses} M€</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                    <span className="text-sm">Invest. vers Fonctionnement</span>
                    <span className="font-bold text-primary">{operationsOrdre.transfertsSections.investissementDepenses} M€</span>
                  </div>
                </div>
              </div>

              {/* Virement à l'investissement */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-primary mb-4"><InfoTooltip terme="Virement à l'investissement">Virement à l'investissement</InfoTooltip></h3>
                <p className="text-sm text-gray-600 mb-4">{operationsOrdre.virementInvestissement.description}</p>
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {operationsOrdre.virementInvestissement.montant} M€
                  </div>
                  <div className="text-sm text-green-600">
                    +{((operationsOrdre.virementInvestissement.montant - operationsOrdre.virementInvestissement.bp2024) / operationsOrdre.virementInvestissement.bp2024 * 100).toFixed(0)}% vs 2024
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    BP 2024 : {operationsOrdre.virementInvestissement.bp2024} M€
                  </div>
                </div>
              </div>

              {/* Opérations patrimoniales */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-primary mb-4">Opérations patrimoniales</h3>
                <p className="text-sm text-gray-600 mb-2">Mouvements internes à l'investissement</p>
                <div className="text-2xl font-bold text-primary mb-4">{operationsOrdre.operationsPatrimoniales.montant} M€</div>
                <div className="space-y-2">
                  {operationsOrdre.operationsPatrimoniales.details.map((d, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">{d.label}</span>
                      <span className="font-medium">{d.value} M€</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Amortissements et provisions */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              <InfoTooltip terme="Amortissements">Amortissements</InfoTooltip> et <InfoTooltip terme="Provisions">provisions</InfoTooltip>
            </h2>
            <p className="text-gray-600 mb-8">
              498,1 M€ d'écritures de fonctionnement vers investissement
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <DonutChart data={amortissementsProvisions} height={280} />

              <div className="space-y-3">
                {amortissementsProvisions.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-8 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-bold text-lg" style={{ color: item.color }}>{item.value} M€</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Besoin et moyens de financement */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              Besoin et moyens de financement
            </h2>
            <p className="text-gray-600 mb-8">
              Comment Paris finance ses investissements en 2025
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Besoin */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-primary text-lg mb-4">Besoin de financement</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Opérations réelles (hors emprunt)</span>
                    <span className="font-medium">{financementData.besoin.operationsReelles.toFixed(1)} M€</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b pl-4">
                    <span className="text-sm text-gray-500">dont mouvements non financiers</span>
                    <span className="text-sm">{financementData.besoin.mouvementsNonFinanciers.toFixed(1)} M€</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b pl-4">
                    <span className="text-sm text-gray-500">dont mouvements financiers</span>
                    <span className="text-sm">{financementData.besoin.mouvementsFinanciers.toFixed(1)} M€</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Opérations d'ordre (hors virement)</span>
                    <span className="font-medium text-green-600">{financementData.besoin.operationsOrdre.toFixed(1)} M€</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-primary/10 rounded-lg px-3 mt-2">
                    <span className="font-bold text-primary">Total besoin de financement</span>
                    <span className="font-bold text-xl text-primary">{financementData.besoin.total.toFixed(1)} M€</span>
                  </div>
                </div>
              </div>

              {/* Moyens */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-primary text-lg mb-4">Moyens de financement</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Virement section fonctionnement</span>
                    <span className="font-medium">{financementData.moyens.virementFonctionnement.toFixed(1)} M€</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Autorisation d'emprunt</span>
                    <span className="font-medium">{financementData.moyens.autorisationEmprunt.toFixed(1)} M€</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-primary/10 rounded-lg px-3 mt-2">
                    <span className="font-bold text-primary">Total moyens de financement</span>
                    <span className="font-bold text-xl text-primary">{financementData.moyens.total.toFixed(1)} M€</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <p className="text-sm text-gray-700">
                    89 % du besoin de financement est couvert par l'emprunt.
                    L'autofinancement (127,7 M€) ne représente que 11 % des moyens.
                  </p>
                </div>
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
