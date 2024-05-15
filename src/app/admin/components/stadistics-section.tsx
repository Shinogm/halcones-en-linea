'use client'

import React from 'react'
import { StatsCard } from './stats-card'

export const StadisticsSection = () => {
  return (
    <>
      <header className='space-y-2'>
        <h2 className='text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl'>
          University Online Classes
        </h2>
        <p className='max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
          Explore our comprehensive statistics on our online className offerings.
        </p>
      </header>

      <section className='w-full py-12 md:py-24 lg:py-32 '>
        <div className='container grid gap-6 px-4 md:px-6 bg-white rounded-xl'>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col' data-v0-t='card'>
              <div className='flex flex-col items-center justify-center gap-2 p-6'>
                <div className='text-6xl font-bold text-[#1a63a5]'>12,345</div>
                <div className='text-lg font-medium text-[#131a2e]'>Students</div>
              </div>
            </div>
            <div className='rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col' data-v0-t='card'>
              <div className='flex flex-col items-center justify-center gap-2 p-6'>
                <div className='text-6xl font-bold text-[#1a63a5]'>345</div>
                <div className='text-lg font-medium text-[#131a2e]'>Subjects</div>
              </div>
            </div>
            <StatsCard title='Groups' value={78} />
            <div className='rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col' data-v0-t='card'>
              <div className='flex flex-col items-center justify-center gap-2 p-6'>
                <div className='text-6xl font-bold text-[#1a63a5]'>78</div>
                <div className='text-lg font-medium text-[#131a2e]'>Groups</div>
              </div>
            </div>
            <div className='rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col' data-v0-t='card'>
              <div className='flex flex-col items-center justify-center gap-2 p-6'>
                <div className='text-6xl font-bold text-[#1a63a5]'>125</div>
                <div className='text-lg font-medium text-[#131a2e]'>Teachers</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
