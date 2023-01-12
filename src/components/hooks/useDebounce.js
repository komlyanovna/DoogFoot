import { useEffect, useState } from 'react'

export const useDebounse = (value, ms = 300) => {
  const [debounseValue, setDebounseValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounseValue(value)
    }, ms)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value])

  return debounseValue
}
