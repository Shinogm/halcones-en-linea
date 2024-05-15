
export const animationIncrement = (start: number, end: number, cb: (value: number) => void, intervalTime: number = 10) => {
  const step = (end - start) / 100

  let current = start
  const interval = setInterval(() => {
    current += step

    if (current >= end) {
      clearInterval(interval)
      cb(Number(end.toFixed(0)))
    } else {
      cb(Number(current.toFixed(0)))
    }
  }, intervalTime)
}
