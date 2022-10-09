import { createContext, ReactNode, useEffect, useState } from 'react'

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

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then((data) => data.json())
      .then((data) => {
        setTransactions(data)
      })
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
