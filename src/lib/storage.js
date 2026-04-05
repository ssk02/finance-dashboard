const ROLE_KEY = 'finance-dashboard-role'
const TRANSACTIONS_KEY = 'finance-dashboard-transactions'
const TRANSACTIONS_VERSION_KEY = 'finance-dashboard-transactions-version'
const TRANSACTIONS_VERSION = '2026-04-realistic-demo-v1'

export function loadStoredRole(defaultRole) {
  if (typeof window === 'undefined') {
    return defaultRole
  }

  return window.localStorage.getItem(ROLE_KEY) ?? defaultRole
}

export function saveStoredRole(role) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(ROLE_KEY, role)
}

export function loadStoredTransactions(defaultTransactions) {
  if (typeof window === 'undefined') {
    return defaultTransactions
  }

  const storedVersion = window.localStorage.getItem(TRANSACTIONS_VERSION_KEY)
  const storedTransactions = window.localStorage.getItem(TRANSACTIONS_KEY)

  if (!storedTransactions || storedVersion !== TRANSACTIONS_VERSION) {
    return defaultTransactions
  }

  try {
    return JSON.parse(storedTransactions)
  } catch {
    return defaultTransactions
  }
}

export function saveStoredTransactions(transactions) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions))
  window.localStorage.setItem(TRANSACTIONS_VERSION_KEY, TRANSACTIONS_VERSION)
}
