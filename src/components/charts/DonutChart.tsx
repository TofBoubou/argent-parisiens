'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface DonutChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  title?: string;
  subtitle?: string;
  total?: number;
  totalLabel?: string;
  height?: number;
  ariaLabel?: string;
}

const formatNumber = (num: number) => {
  return num.toLocaleString('fr-FR', { maximumFractionDigits: 1 });
};

export default function DonutChart({
  data,
  title,
  subtitle,
  total,
  totalLabel = 'M€',
  height = 300,
  ariaLabel,
}: DonutChartProps) {
  const dataSum = data.reduce((sum, item) => sum + item.value, 0);
  const displayTotal = total ?? dataSum;

  // Si un total est fourni et différent de la somme des données,
  // les valeurs sont des pourcentages qu'il faut convertir en montants
  const isPercentageData = total !== undefined && Math.abs(dataSum - 100) < 1;

  // Convertir les données si ce sont des pourcentages
  const displayData = isPercentageData
    ? data.map(item => ({
        ...item,
        value: (item.value / 100) * total,
        percentage: item.value
      }))
    : data.map(item => ({
        ...item,
        percentage: (item.value / displayTotal) * 100
      }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 shadow-sm"
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-bold text-primary">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div
          className="relative"
          style={{ width: height, height }}
          role="img"
          aria-label={ariaLabel || `Graphique : ${title || 'Répartition'} - Total ${formatNumber(displayTotal)} ${totalLabel}`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={displayData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                paddingAngle={2}
                dataKey="value"
              >
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${formatNumber(value)} M€`, name]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: '#0D1B4C',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{
                  color: '#0D1B4C',
                  fontWeight: 'bold',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-primary">
              {formatNumber(displayTotal)}
            </span>
            <span className="text-sm text-gray-500">{totalLabel}</span>
          </div>
        </div>

        {/* Legend - vertical layout to avoid truncation */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 gap-2">
            {displayData.map((item, index) => (
              <div key={index} className="flex items-start gap-2 py-1">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="text-sm text-gray-700 leading-tight">{item.name}</div>
                  <div className="text-sm font-semibold text-primary">
                    {formatNumber(item.value)} M€
                    <span className="text-gray-400 font-normal ml-1">
                      ({item.percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
