const inrCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatInrCurrency(value) {
  return inrCurrencyFormatter.format(Number(value) || 0)
}

export function parseCurrencyAmount(value) {
  if (typeof value === 'number') {
    return value
  }

  return Number(String(value).replace(/[^\d+-.,]/g, '').replace(/,/g, '')) || 0
}
