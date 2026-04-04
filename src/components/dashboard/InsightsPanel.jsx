import { formatCurrency, getInsights } from '../../lib/finance'

function InsightsPanel({ transactions }) {
  const { highestSpending, totalIncome, totalExpenses, totalSavings, observation } =
    getInsights(transactions)
  const hasTransactions = transactions.length > 0

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-slate-900/80">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Highest spending
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          {highestSpending?.name ?? 'No expense data'}
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          {highestSpending
            ? `${formatCurrency(highestSpending.value)} in total expenses.`
            : 'Add expense transactions to see your top spending category.'}
        </p>
      </article>

      <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-slate-900/80">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Total savings
        </p>
        <h2
          className={`mt-3 text-2xl font-semibold ${
            totalSavings >= 0 ? 'text-emerald-300' : 'text-rose-300'
          }`}
        >
          {formatCurrency(totalSavings)}
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Income of {formatCurrency(totalIncome)} minus expenses of{' '}
          {formatCurrency(totalExpenses)}.
        </p>
      </article>

      <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-slate-900/80">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Observation
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Quick note</h2>
        <p className="mt-2 text-sm text-slate-300">
          {hasTransactions
            ? observation
            : 'No transactions available yet. Add data to unlock dashboard insights.'}
        </p>
      </article>
    </section>
  )
}

export default InsightsPanel
