import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

export interface ITransaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface ICreateNewTransactionData {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
}

interface ITransactionsContextData {
  transactions: ITransaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createNewTransaction: (data: ICreateNewTransactionData) => Promise<void>
}

export const TransactionsContext = createContext<ITransactionsContextData>({
  createNewTransaction: () => Promise.resolve(),
  fetchTransactions: () => Promise.resolve(),
  transactions: [],
} as ITransactionsContextData)

interface ITransactionsProviderProps {
  children: ReactNode
}

export function TransactionsContextProvider({
  children,
}: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }, [])

  const createNewTransaction = useCallback(
    async (transaction: ICreateNewTransactionData) => {
      const { description, price, category, type } = transaction

      const response = await api.post<ITransaction>('/transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date().toISOString(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createNewTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
