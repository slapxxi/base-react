type BadgeProps = React.ComponentProps<'span'> & {}

export let Badge: React.FC<BadgeProps> = ({ className = '', ...props }) => {
  return (
    <span
      className={`inline-flex min-w-5 items-center justify-center rounded-full 
        bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white ${className}`.trim()}
      {...props}
    />
  )
}
