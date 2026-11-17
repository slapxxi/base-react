import { Badge, Input } from '@/components'
import { useState } from 'react'
import './App.css'

export let App: React.FC = () => {
  const [count, setCount] = useState(0)

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    setCount((c) => c + 1)
    e.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative m-2 grid min-h-screen grid-cols-[auto_auto]
      grid-rows-[min-content_auto] content-center justify-center gap-x-4 gap-y-4"
    >
      <div className="grid">
        <label htmlFor="name">Name</label>
        <Input type="text" id="name" />
      </div>

      <div className="grid">
        <label htmlFor="email">Email</label>
        <Input type="email" id="email" />
      </div>

      <button type="submit" className="col-span-2 rounded bg-blue-600 p-2 text-white shadow-xs">
        Submit
      </button>

      <Badge>{count}</Badge>
    </form>
  )
}
