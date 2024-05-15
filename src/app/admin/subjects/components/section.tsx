'use client'

import { motion } from 'framer-motion'

interface SectionProps {
  title: string
  description: string
  svg: number
}

export const DisplaySubject = ({ title, description, svg }: SectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      className='relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform cursor-pointer'

    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className='flex flex-col items-center justify-center h-full bg-[#1a63a5] p-6 text-white'
      >
        {
          svg === 1
            ? (
              <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-12 h-12 mb-4 fill-[#cdcccb]'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20' />
              </motion.svg>
              )
            : (
              <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-12 h-12 mb-4 fill-[#cdcccb]'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
                <path d='m15 5 4 4' />
              </motion.svg>
              )
        }
        <motion.h3
          className='font-bold text-xl'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className='text-sm text-[#cdcccb] mt-2'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.section>
  )
}
