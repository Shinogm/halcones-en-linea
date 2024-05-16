type InputProps = React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>

interface LabeledInputProps extends InputProps {
  label: string
  multiline?: boolean
}

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`rounded-md px-2 outline-none ${className ?? ''}`}
    {...props}
  />
)

export const TextArea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={`rounded-md px-2 outline-none ${className ?? ''}`}
    {...props}
  />
)

export const LabeledInput = ({
  label,
  multiline = false,
  ...props
}: LabeledInputProps) =>
  !multiline
    ? (
      <label
        className='flex flex-col gap-1 '
      >
        <span
          className='flex flex-col text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white'
        >
          {label}
        </span>
        <Input className='flex flex-col h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/10 text-white placeholder:text-[#cdcccb] focus:bg-white/20' {...props} />
      </label>
      )
    : (
      <label
        className='flex flex-col gap-1 mt-1'
      >
        <span
          className='text-white font-medium'
        >
          {label}
        </span>

        <TextArea {...props} />
      </label>
      )

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
  label: string
}

export const LabeledSelect = ({ children, label, ...props }: SelectProps) => (
  <label
    className='flex flex-col gap-1 mt-1 '
  >
    <span
      className='text-white font-medium '
    >
      {label}
    </span>
    <Select {...props}>
      {children}
    </Select>
  </label>
)

export const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className='bg-white/10 text-black placeholder:text-[#cdcccb] focus:bg-white/20 '
    {...props}
  >
    {children}
  </select>
)
