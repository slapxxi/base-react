type BadgeProps = React.ComponentProps<'span'> & {}

export let Badge: React.FC<BadgeProps> = (props) => {
  return (
    <span
      className="absolute col-[2/3] row-[1/2] inline-grid grid-cols-[minmax(20px,auto)] grid-rows-[minmax(20px,auto)] 
      place-items-center justify-self-end rounded-full bg-red-500 p-px text-xs font-bold text-white"
      {...props}
    />
  )
}
