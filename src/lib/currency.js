const inrCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const compactInrNumberFormatter = new Intl.NumberFormat('en-IN', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function formatInrCurrency(value) {
  return inrCurrencyFormatter.format(Number(value) || 0)
}

export function formatCompactInrCurrency(value) {
  const numericValue = Number(value) || 0
  const absoluteValue = Math.abs(numericValue)
  const prefix = numericValue < 0 ? '-₹' : '₹'

  return `${prefix}${compactInrNumberFormatter.format(absoluteValue)}`
}

export function parseCurrencyAmount(value) {
  if (typeof value === 'number') {
    return value
  }

  return Number(String(value).replace(/[^\d+-.,]/g, '').replace(/,/g, '')) || 0
}
