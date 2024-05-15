
interface SectionProps {
  title: string
  description: string
  svg: number
}

export const DisplaySubject = ({ title, description, svg }: SectionProps) => {
  return (
    <section
      className='relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 hover:rotate-1 duration-300 ease-in-out animate-fade-in animate-duration-150'

    >
      <div
        className='flex flex-col items-center justify-center h-full bg-[#1a63a5] p-6 text-white'
      >
        {
          svg % 2 === 0
            ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-12 h-12 mb-4 fill-[#cdcccb] animate-fade-in-up animate-duration-[550ms]'
              >
                <path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20' />
              </svg>
              )
            : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-12 h-12 mb-4 fill-[#cdcccb] animate-fade-in-up animate-duration-[550ms]'
              >
                <path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
                <path d='m15 5 4 4' />
              </svg>
              )
        }
        <h3
          className='font-bold text-xl animate-fade-in-up animate-duration-[550ms]'
        >
          {title}
        </h3>
        <p
          className='text-sm text-[#cdcccb] mt-2 animate-fade-in-up animate-duration-[550ms]'
        >
          {description}
        </p>
      </div>
    </section>
  )
}
