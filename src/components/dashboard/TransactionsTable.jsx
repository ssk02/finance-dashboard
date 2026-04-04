import { useState } from 'react'
import {
  filterTransactions,
  formatCurrency,
  parseAmount,
} from '../../lib/finance'

const amountStyles = {
  positive: 'text-emerald-300',
  negative: 'text-rose-300',
}

const typeStyles = {
  income: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20',
  expense: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/20',
}

function TransactionsTable({ role, transactions }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const filteredTransactions = filterTransactions(
    transactions,
    searchQuery,
    selectedType,
  )
  const hasTransactions = transactions.length > 0

  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 transition duration-200 hover:border-cyan-300/20 hover:bg-slate-900/80 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Transactions</h2>
          <p className="mt-1 text-sm text-slate-400">
            Mock transaction history for recent account activity.
          </p>
        </div>
        {role === 'admin' ? (
          <button className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:text-white">
            Add Transaction
          </button>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <label className="flex-1">
          <span className="sr-only">Search transactions</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title or category"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
          />
        </label>

        <label className="md:w-48">
          <span className="sr-only">Filter by type</span>
          <select
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr className="text-left text-xs uppercase tracking-[0.22em] text-slate-400">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/40">
              {filteredTransactions.map((transaction) => {
                const numericAmount = parseAmount(transaction.amount)
                const amountTone =
                  numericAmount >= 0
                    ? amountStyles.positive
                    : amountStyles.negative

                return (
                  <tr
                    key={transaction.id}
                    className="transition duration-150 hover:bg-white/5"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-200">
                      {transaction.date}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-4 text-sm font-semibold ${amountTone}`}
                    >
                      {formatCurrency(numericAmount)}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300">
                      <div className="min-w-[12rem]">
                        <p className="font-medium text-slate-200">
                          {transaction.category}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {transaction.title}
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${typeStyles[transaction.type]}`}
                      >
                        {transaction.type[0].toUpperCase() +
                          transaction.type.slice(1)}
                      </span>
                    </td>
                  </tr>
                )
              })}

              {!hasTransactions ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-sm text-slate-400"
                  >
                    No transactions available.
                  </td>
                </tr>
              ) : null}

              {hasTransactions && filteredTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-sm text-slate-400"
                  >
                    No transactions match your search or filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  )
}

export default TransactionsTable
