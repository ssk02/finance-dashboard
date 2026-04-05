import { formatInrCurrency, parseCurrencyAmount } from './currency'

export function parseAmount(amount) {
  return parseCurrencyAmount(amount)
}

export function formatCurrency(value) {
  return formatInrCurrency(value)
}

export function filterTransactions(transactions, searchQuery, selectedType, dateFrom, dateTo) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return transactions.filter((transaction) => {
    const matchesSearch =
      !normalizedQuery ||
      transaction.title.toLowerCase().includes(normalizedQuery) ||
      transaction.category.toLowerCase().includes(normalizedQuery)

    const matchesType =
      selectedType === 'all' || transaction.type === selectedType

    const transactionDate = new Date(transaction.date)
    const matchesDateFrom = !dateFrom || transactionDate >= new Date(dateFrom)
    const matchesDateTo = !dateTo || transactionDate <= new Date(dateTo)

    return matchesSearch && matchesType && matchesDateFrom && matchesDateTo
  })
}

export function getRecentTransactions(transactions, limit = 3) {
  return [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}

export function getTransactionSummary(transactions) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce(
      (sum, transaction) => sum + Math.abs(parseAmount(transaction.amount)),
      0,
    )

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce(
      (sum, transaction) => sum + Math.abs(parseAmount(transaction.amount)),
      0,
    )

  const totalSavings = totalIncome - totalExpenses

  return { totalIncome, totalExpenses, totalSavings }
}

export function getCashFlowChartData(transactions) {
  return [...transactions]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((transaction) => {
      const amount = Math.abs(parseAmount(transaction.amount))

      return {
        date: new Date(transaction.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        income: transaction.type === 'income' ? amount : 0,
        expense: transaction.type === 'expense' ? amount : 0,
      }
    })
}

export function getExpensesByCategory(transactions) {
  return Object.values(
    transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((categories, transaction) => {
        const amount = Math.abs(parseAmount(transaction.amount))

        if (!categories[transaction.category]) {
          categories[transaction.category] = {
            name: transaction.category,
            value: 0,
          }
        }

        categories[transaction.category].value += amount
        return categories
      }, {}),
  )
}

function getMonthlyExpenseTotals(transactions) {
  return Object.values(
    transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((months, transaction) => {
        const transactionDate = new Date(transaction.date)

        if (Number.isNaN(transactionDate.getTime())) {
          return months
        }

        const monthKey = `${transactionDate.getFullYear()}-${String(
          transactionDate.getMonth() + 1,
        ).padStart(2, '0')}`

        if (!months[monthKey]) {
          months[monthKey] = {
            key: monthKey,
            label: transactionDate.toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            }),
            total: 0,
          }
        }

        months[monthKey].total += Math.abs(parseAmount(transaction.amount))
        return months
      }, {}),
  ).sort((a, b) => a.key.localeCompare(b.key))
}

export function getMonthlyExpenseComparison(transactions) {
  const monthlyExpenses = getMonthlyExpenseTotals(transactions)

  if (monthlyExpenses.length < 2) {
    return null
  }

  const currentMonth = monthlyExpenses[monthlyExpenses.length - 1]
  const previousMonth = monthlyExpenses[monthlyExpenses.length - 2]
  const delta = currentMonth.total - previousMonth.total
  const direction =
    delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'

  return {
    currentMonthLabel: currentMonth.label,
    previousMonthLabel: previousMonth.label,
    currentTotal: currentMonth.total,
    previousTotal: previousMonth.total,
    delta,
    absoluteDelta: Math.abs(delta),
    percentDelta:
      previousMonth.total > 0 ? (delta / previousMonth.total) * 100 : 0,
    absolutePercentDelta:
      previousMonth.total > 0
        ? Math.abs((delta / previousMonth.total) * 100)
        : 0,
    direction,
  }
}

export function getInsights(transactions) {
  const expensesByCategory = getExpensesByCategory(transactions)
  const highestSpending =
    [...expensesByCategory].sort((a, b) => b.value - a.value)[0] ?? null
  const monthlyComparison = getMonthlyExpenseComparison(transactions)

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce(
      (sum, transaction) => sum + Math.abs(parseAmount(transaction.amount)),
      0,
    )

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce(
      (sum, transaction) => sum + Math.abs(parseAmount(transaction.amount)),
      0,
    )

  const totalSavings = totalIncome - totalExpenses

  const observation = highestSpending
    ? `${highestSpending.name} is your highest expense category right now.`
    : 'Add expense transactions to unlock spending insights.'

  return {
    highestSpending,
    monthlyComparison,
    totalIncome,
    totalExpenses,
    totalSavings,
    observation,
  }
}
