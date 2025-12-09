/**
 * Utilitaires de formatage des nombres pour une cohérence graphique
 *
 * Conventions adoptées :
 * - Milliards : "X,X Md€" (ex: 9,4 Md€)
 * - Millions : "XXX M€" (ex: 472 M€)
 * - Pourcentages : "XX,X %" (ex: 34,2 %)
 * - Séparateur milliers : espace insécable
 * - Décimales : virgule
 */

/**
 * Formate un nombre en millions d'euros
 * @param value - Valeur en millions
 * @param decimals - Nombre de décimales (défaut: 1 si < 10, 0 sinon)
 */
export function formatMillions(value: number, decimals?: number): string {
  const d = decimals ?? (Math.abs(value) < 10 ? 1 : 0);
  return `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: d,
    maximumFractionDigits: d
  })} M€`;
}

/**
 * Formate un nombre en milliards d'euros
 * @param value - Valeur en milliards
 * @param decimals - Nombre de décimales (défaut: 1)
 */
export function formatMilliards(value: number, decimals: number = 1): string {
  return `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })} Md€`;
}

/**
 * Formate un nombre avec séparateur de milliers français
 * @param value - Valeur à formater
 * @param decimals - Nombre de décimales max (défaut: 1)
 */
export function formatNumber(value: number, decimals: number = 1): string {
  return value.toLocaleString('fr-FR', {
    maximumFractionDigits: decimals
  });
}

/**
 * Formate un pourcentage
 * @param value - Valeur en pourcentage (ex: 34.2 pour 34,2%)
 * @param decimals - Nombre de décimales (défaut: 1)
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })} %`;
}

/**
 * Formate une variation avec signe + ou -
 * @param value - Valeur de la variation
 * @param unit - Unité (défaut: "M€")
 */
export function formatVariation(value: number, unit: string = 'M€'): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${formatNumber(value)} ${unit}`;
}

/**
 * Formate automatiquement selon la magnitude
 * @param value - Valeur en millions
 */
export function formatAuto(value: number): string {
  if (Math.abs(value) >= 1000) {
    return formatMilliards(value / 1000);
  }
  return formatMillions(value);
}
