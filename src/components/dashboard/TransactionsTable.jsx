import { useState } from 'react'
import AddTransactionModal from '../ui/AddTransactionModal'
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

function TransactionsTable({ role, transactions, onAddTransaction, showToast }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddTransaction = (newTransaction) => {
    onAddTransaction(prev => [...prev, newTransaction])
    showToast('Transaction added successfully!')
  }

  const filteredTransactions = filterTransactions(
    transactions,
    searchQuery,
    selectedType,
    dateFrom,
    dateTo,
  )
  const hasTransactions = transactions.length > 0

  const exportToCSV = () => {
    const headers = ['Date', 'Amount', 'Category', 'Type', 'Title']
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(tx => [
        tx.date,
        tx.amount,
        tx.category,
        tx.type,
        `"${tx.title}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'transactions.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Transactions exported to CSV!')
  }

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(filteredTransactions, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'transactions.json')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Transactions exported to JSON!')
  }

  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 transition duration-200 hover:border-cyan-300/20 hover:bg-slate-900/80 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Transactions</h2>
          <p className="mt-1 text-sm text-slate-400">
            Mock transaction history for recent account activity.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {role === 'admin' ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:text-white"
              aria-label="Add new transaction"
            >
              Add Transaction
            </button>
          ) : null}
          {hasTransactions ? (
            <>
              <button
                onClick={exportToCSV}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                aria-label="Export transactions to CSV file"
              >
                Export CSV
              </button>
              <button
                onClick={exportToJSON}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                aria-label="Export transactions to JSON file"
              >
                Export JSON
              </button>
            </>
          ) : null}
        </div>
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

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <label className="block md:w-full">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            From date
          </span>
          <div className="relative">
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              placeholder="From date"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 pr-11 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 3V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 3V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 9H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
            </span>
          </div>
        </label>
        <label className="block md:w-full">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            To date
          </span>
          <div className="relative">
            <input
              type="date"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
              placeholder="To date"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 pr-11 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 3V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 3V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 9H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
            </span>
          </div>
        </label>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr className="text-left text-xs uppercase tracking-[0.22em] text-slate-400">
                <th className="px-4 py-3 font-medium">Title</th>
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
                    <td className="px-4 py-4 text-sm text-slate-200">
                      {transaction.title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-200">
                      {transaction.date}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-4 text-sm font-semibold ${amountTone}`}
                    >
                      {formatCurrency(numericAmount)}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {transaction.category}
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
                    colSpan="5"
                    className="px-4 py-8 text-center text-sm text-slate-400"
                  >
                    No transactions available.
                  </td>
                </tr>
              ) : null}

              {hasTransactions && filteredTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
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
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </article>
  )
}

export default TransactionsTable
