'use client';

import { motion } from 'framer-motion';
import { formatNumber, formatMillions, formatPercent } from '@/utils/formatNumber';

interface BarChartHorizontalProps {
  data: {
    label: string;
    value: number;
    color?: string;
    highlight?: boolean;
    subLabel?: string;
  }[];
  title?: string;
  subtitle?: string;
  maxValue?: number;
  unit?: string;
  showPercentage?: boolean;
  ariaLabel?: string;
}

export default function BarChartHorizontal({
  data,
  title,
  subtitle,
  maxValue,
  unit = 'M€',
  showPercentage = false,
  ariaLabel,
}: BarChartHorizontalProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value)) * 1.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 shadow-sm overflow-hidden w-full max-w-full"
      role="img"
      aria-label={ariaLabel || `Graphique en barres : ${title || 'Comparaison des valeurs'}`}
    >
      {title && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-primary">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex-1 min-w-0">
                <span
                  className={`text-sm ${
                    item.highlight ? 'font-bold text-primary' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </span>
                {item.subLabel && (
                  <span className="text-xs text-gray-400 ml-2">{item.subLabel}</span>
                )}
              </div>
              <span
                className={`text-sm font-semibold ml-2 tabular-nums ${
                  item.highlight ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {showPercentage
                  ? formatPercent(item.value)
                  : unit === 'M€' ? formatMillions(item.value) : `${formatNumber(item.value)} ${unit}`}
              </span>
            </div>
            <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  item.highlight
                    ? 'bg-accent'
                    : item.color
                    ? ''
                    : 'bg-primary'
                }`}
                style={item.color ? { backgroundColor: item.color } : {}}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
