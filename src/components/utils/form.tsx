
interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

export const Form = ({ children, onSubmit, action, className, ...props }: Props) => (
  <form onSubmit={onSubmit} action={action} className={`w-full gap-2 flex flex-col ${className ?? ''}`} {...props}>
    {children}
  </form>
)
