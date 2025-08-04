export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('es-ES', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatMoney = (value: number, currency = 'EUR'): string => {
  return Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: currency === 'COP' ? 0 : 2,
  }).format(value);
};

export const formatNumber = (number: number, maximumFractionDigits = 0): string => {
  return Intl.NumberFormat('es-ES', {
    maximumFractionDigits,
  }).format(number);
};