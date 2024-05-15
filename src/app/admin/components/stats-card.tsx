'use client'
import { useAnimationIncrementNumber } from '@/hooks/animation-increment-number'

interface StatsCardProps {
  title: string
  value: number
}

export const StatsCard = ({ title, value }: StatsCardProps) => {
  const animation = useAnimationIncrementNumber(1, value, 1)

  return (
    <section className='rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col' data-v0-t='card'>
      <div className='flex flex-col items-center justify-center gap-2 p-6'>
        <span className='text-6xl font-bold text-[#1a63a5]'>{animation}</span>
        <span className='text-lg font-medium text-[#131a2e]'>{title}</span>
      </div>
    </section>
  )
}
