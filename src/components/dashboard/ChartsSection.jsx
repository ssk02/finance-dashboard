import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  formatCurrency,
  getCashFlowChartData,
  getExpensesByCategory,
} from '../../lib/finance'

const pieColors = ['#22c55e', '#38bdf8', '#f59e0b', '#f43f5e', '#a78bfa']

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-3 shadow-xl shadow-slate-950/40">
      <p className="text-sm font-medium text-white">{label}</p>
      <div className="mt-2 space-y-1">
        {payload.map((entry) => (
          <p key={entry.name} className="text-sm text-slate-300">
            <span className="capitalize" style={{ color: entry.color }}>
              {entry.name}
            </span>{' '}
            {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    </div>
  )
}

function EmptyChartState({ message }) {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/30 px-6 text-center text-sm text-slate-400">
      {message}
    </div>
  )
}

function ChartsSection({ transactions }) {
  const transactionsByDate = getCashFlowChartData(transactions)
  const expensesByCategory = getExpensesByCategory(transactions)
  const hasTransactions = transactions.length > 0
  const hasExpenseData = expensesByCategory.length > 0

  return (
    <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 transition duration-200 hover:border-cyan-300/20 hover:bg-slate-900/80 sm:p-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Cash flow trend</h2>
          <p className="mt-1 text-sm text-slate-400">
            Income versus expenses over time using your transaction dates.
          </p>
        </div>

        <div className="mt-6 h-80 w-full">
          {hasTransactions ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={transactionsByDate}
                margin={{ top: 8, right: 12, left: -18, bottom: 0 }}
              >
                <CartesianGrid stroke="rgba(148, 163, 184, 0.14)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={56}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ color: '#cbd5e1', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#22c55e', strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#f43f5e"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#f43f5e', strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartState message="No transactions available for cash flow trends." />
          )}
        </div>
      </article>

      <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 transition duration-200 hover:border-cyan-300/20 hover:bg-slate-900/80 sm:p-6">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Expense categories
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Category-wise breakdown of current expenses.
          </p>
        </div>

        <div className="mt-6 h-80 w-full">
          {hasExpenseData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={68}
                  outerRadius={106}
                  paddingAngle={4}
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: '#020617',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    color: '#e2e8f0',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ color: '#cbd5e1', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartState message="No expense transactions available for category insights." />
          )}
        </div>
      </article>
    </section>
  )
}

export default ChartsSection
