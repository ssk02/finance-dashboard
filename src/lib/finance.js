export function parseAmount(amount) {
  return Number(amount.replace(/[$,]/g, ''))
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function filterTransactions(transactions, searchQuery, selectedType) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return transactions.filter((transaction) => {
    const matchesSearch =
      !normalizedQuery ||
      transaction.title.toLowerCase().includes(normalizedQuery) ||
      transaction.category.toLowerCase().includes(normalizedQuery)

    const matchesType =
      selectedType === 'all' || transaction.type === selectedType

    return matchesSearch && matchesType
  })
}

export function getRecentTransactions(transactions, limit = 3) {
  return [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
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

export function getInsights(transactions) {
  const expensesByCategory = getExpensesByCategory(transactions)
  const highestSpending =
    [...expensesByCategory].sort((a, b) => b.value - a.value)[0] ?? null

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
    totalIncome,
    totalExpenses,
    totalSavings,
    observation,
  }
}
