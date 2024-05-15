
export const animationIncrement = (start: number, end: number, cb: (value: number) => void, intervalTime: number = 10) => {
  const step = (end - start) / 100
  console.log('step', step)

  let current = start
  const interval = setInterval(() => {
    current += step
    console.log('current', current)

    if (current >= end) {
      clearInterval(interval)
      cb(end)
    } else {
      cb(current)
    }
  }, intervalTime)
}
