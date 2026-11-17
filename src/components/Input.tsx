type InputProps = React.ComponentProps<'input'> & {}

export let Input: React.FC<InputProps> = (props) => {
  return <input type="text" className="w-full rounded border border-gray-300 p-2" {...props} />
}
