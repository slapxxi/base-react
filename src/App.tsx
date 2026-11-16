import { useState } from 'react'
import './App.css'

export let App: React.FC = () => {
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    console.log(counter)
    setCounter((c) => c + 1)
  }

  return (
    <div onClick={handleClick} className="flex items-center gap-2 bg-amber-400 p-2 select-none">
      example react application
      <span className="bg-black p-1 text-white">{counter}</span>
    </div>
  )
}
