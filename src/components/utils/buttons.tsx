import { IconPlus } from '@tabler/icons-react'
import Link, { LinkProps } from 'next/link'

export const SubmitButton = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className='p-2 gap-3 bg-primary rounded-md text-white px-1 mt-4 shadow-lg bg-itesus-primary w-full py-1 hover:bg-itesus-secondary transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-itesus-secondary focus:border-transparent'
    type='submit'
    {...props}
  >
    {children}
  </button>
)

interface RedirectProps extends LinkProps {
  className?: string
}

export const RedirectPlus = ({ className, ...props }: RedirectProps) => (
  <Link
    className={`flex w-fit p-1 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-300 ease-in-out ${className ?? ''}`}
    {...props}
  >
    <IconPlus color='#fff' />
  </Link>
)

export const PlusButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded transition-colors'
    {...props}
  >
    <IconPlus size={20} />
  </button>
)
