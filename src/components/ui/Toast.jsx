import { useEffect, useState } from 'react'

function Toast({ message, type = 'success', onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Allow fade out animation
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success' ? 'bg-emerald-500/15 border-emerald-400/20' : 'bg-red-500/15 border-red-400/20'
  const textColor = type === 'success' ? 'text-emerald-300' : 'text-red-300'

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className={`rounded-2xl border ${bgColor} px-4 py-3 shadow-lg`}>
        <p className={`text-sm font-medium ${textColor}`}>{message}</p>
      </div>
    </div>
  )
}

export default Toast