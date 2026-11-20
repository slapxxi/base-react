import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { createQueryClient } from '@/components/QueryProvider.config'

type QueryProviderProps = {
  children: React.ReactNode
}

export let QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  let [client] = useState(createQueryClient)

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
