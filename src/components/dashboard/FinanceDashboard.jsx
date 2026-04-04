import { useEffect, useMemo, useState } from 'react'
import DashboardShell from '../layout/DashboardShell'
import ChartsSection from './ChartsSection'
import InsightsPanel from './InsightsPanel'
import TransactionsTable from './TransactionsTable'
import {
  holdings,
  summaryCards,
  transactionRows,
} from '../../data/dashboardData'
import { getRecentTransactions } from '../../lib/finance'
import {
  loadStoredRole,
  loadStoredTransactions,
  saveStoredRole,
  saveStoredTransactions,
} from '../../lib/storage'

const toneClasses = {
  positive: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20',
  negative: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/20',
  neutral: 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20',
}

function FinanceDashboard() {
  const [role, setRole] = useState(() => loadStoredRole('viewer'))
  const [transactions] = useState(() => loadStoredTransactions(transactionRows))

  useEffect(() => {
    saveStoredRole(role)
  }, [role])

  useEffect(() => {
    saveStoredTransactions(transactions)
  }, [transactions])

  const recentTransactions = useMemo(
    () => getRecentTransactions(transactions),
    [transactions],
  )

  return (
    <DashboardShell>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/40 backdrop-blur">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-cyan-400/20 via-transparent to-emerald-400/20 blur-3xl" />

        <div className="relative flex flex-col gap-8 p-5 sm:gap-10 sm:p-8">
          <header className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <span className="inline-flex w-fit items-center rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Finance Dashboard
              </span>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Your money at a glance
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                  A starter layout for balances, portfolio tracking, and recent
                  account activity.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <label className="w-full lg:w-52">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Role
                </span>
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40"
                >
                  <option value="viewer">Viewer</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-slate-900">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Updated
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">Apr 1</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-slate-900">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Accounts
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">4 linked</p>
                </div>
                <div className="col-span-2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-slate-900 sm:col-span-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Goal progress
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">72%</p>
                </div>
              </div>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-slate-900/85"
              >
                <p className="text-sm text-slate-400">{card.title}</p>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <p className="text-2xl font-semibold text-white">
                    {card.value}
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[card.tone]}`}
                  >
                    {card.change}
                  </span>
                </div>
              </article>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition duration-200 hover:border-cyan-300/20 hover:bg-slate-900/80">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Portfolio overview
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Top holdings and current allocation.
                  </p>
                </div>
                <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white">
                  View report
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {holdings.map((holding) => (
                  <div
                    key={holding.symbol}
                    className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:border-cyan-300/20 hover:bg-white/[0.07] md:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))] md:items-center"
                  >
                    <div>
                      <p className="font-medium text-white">{holding.name}</p>
                      <p className="text-sm text-slate-400">{holding.symbol}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Allocation
                      </p>
                      <p className="mt-1 text-sm text-slate-200">
                        {holding.allocation}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Value
                      </p>
                      <p className="mt-1 text-sm text-slate-200">
                        {holding.value}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Performance
                      </p>
                      <p className="mt-1 text-sm text-emerald-300">
                        {holding.performance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition duration-200 hover:border-cyan-300/20 hover:bg-slate-900/80">
              <h2 className="text-xl font-semibold text-white">
                Recent activity
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Latest cash movement across your accounts.
              </p>

              {recentTransactions.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={`${transaction.title}-${transaction.date}`}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:border-cyan-300/20 hover:bg-white/[0.07]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-white">
                            {transaction.title}
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            {transaction.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${
                              transaction.type === 'income'
                                ? 'text-emerald-300'
                                : 'text-rose-300'
                            }`}
                          >
                            {transaction.amount}
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-slate-950/40 px-4 py-10 text-center text-sm text-slate-400">
                  No transactions available.
                </div>
              )}
            </article>
          </section>

          <InsightsPanel transactions={transactions} />

          <ChartsSection transactions={transactions} />

          <TransactionsTable role={role} transactions={transactions} />
        </div>
      </div>
    </DashboardShell>
  )
}

export default FinanceDashboard
