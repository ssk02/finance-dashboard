import FinanceDashboard from './components/dashboard/FinanceDashboard'
import ErrorBoundary from './components/ui/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <FinanceDashboard />
    </ErrorBoundary>
  )
}

export default App
