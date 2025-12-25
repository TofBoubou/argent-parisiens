'use client';

import { motion } from 'framer-motion';

interface ChiffreCardProps {
  value: string | number;
  unit?: string;
  label: string;
  variation?: string;
  variationPositive?: boolean;
  description?: string;
  icon?: string;
  accent?: boolean;
}

export default function ChiffreCard({
  value,
  unit,
  label,
  variation,
  variationPositive,
  description,
  icon,
  accent = false,
}: ChiffreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`rounded-xl p-5 ${
        accent
          ? 'bg-primary text-white'
          : 'bg-white border border-primary/10 shadow-sm'
      }`}
    >
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <div
        className={`text-3xl font-bold ${accent ? 'text-white' : 'text-primary'}`}
      >
        {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
        {unit && (
          <span className={`text-lg ml-1 ${accent ? 'text-primary/50' : 'text-primary/70'}`}>
            {unit}
          </span>
        )}
      </div>
      <div className={`text-sm mt-1 ${accent ? 'text-primary/50' : 'text-primary/70'}`}>
        {label}
      </div>
      {variation && (
        <div
          className={`text-xs mt-2 font-medium ${
            variationPositive
              ? 'text-yellow'
              : accent
              ? 'text-accent/70'
              : 'text-accent'
          }`}
        >
          {variation}
        </div>
      )}
      {description && (
        <p
          className={`text-xs mt-2 ${accent ? 'text-primary/60' : 'text-primary/60'}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
