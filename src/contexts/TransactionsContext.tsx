import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

export interface ITransaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface ITransactionsContextData {
  transactions: ITransaction[]
  fetchTransactions: (query?: string) => Promise<void>
}

export const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData,
)

interface ITransactionsProviderProps {
  children: ReactNode
}

export function TransactionsContextProvider({
  children,
}: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query,
      },
    })
    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
