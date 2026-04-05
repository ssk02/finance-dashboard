import { formatCurrency, getInsights } from '../../lib/finance'

const comparisonToneClasses = {
  up: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/20',
  down: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20',
  flat: 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20',
}

function InsightsPanel({ transactions }) {
  const {
    highestSpending,
    monthlyComparison,
    totalIncome,
    totalExpenses,
    totalSavings,
    observation,
  } = getInsights(transactions)
  const hasTransactions = transactions.length > 0

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
          Monthly comparison
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          {monthlyComparison?.currentMonthLabel ?? 'More history needed'}
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          {monthlyComparison
            ? `${formatCurrency(monthlyComparison.currentTotal)} in ${
                monthlyComparison.currentMonthLabel
              } versus ${formatCurrency(
                monthlyComparison.previousTotal,
              )} in ${monthlyComparison.previousMonthLabel}.`
            : 'Add expense data across at least two months to compare spending.'}
        </p>
        {monthlyComparison ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                comparisonToneClasses[monthlyComparison.direction]
              }`}
            >
              {monthlyComparison.direction === 'up'
                ? 'Up'
                : monthlyComparison.direction === 'down'
                  ? 'Down'
                  : 'Flat'}{' '}
              by {formatCurrency(monthlyComparison.absoluteDelta)}
            </span>
            <span className="inline-flex rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">
              {monthlyComparison.absolutePercentDelta.toFixed(1)}%
            </span>
          </div>
        ) : null}
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
