import { animationIncrement } from '@/utils/numbers'
import { useEffect, useState } from 'react'

export const useAnimationIncrementNumber = (start: number, end: number, intervalTime?: number) => {
  const [current, setCurrent] = useState(start)

  useEffect(() => {
    console.log('start', start)

    animationIncrement(start, end, (value) => {
      setCurrent(value)
    }, intervalTime)
  }, [start, end])

  return current
}
