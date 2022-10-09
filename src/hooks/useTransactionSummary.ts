import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useTransactionSummary() {
  const { transactions } = useContext(TransactionsContext)

  const transactionsSummary = transactions.reduce(
    (acc, current) => {
      if (current.type === 'income') {
        acc.income += current.price
        acc.total += current.price
      } else {
        acc.outcome += current.price
        acc.total -= current.price
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  return transactionsSummary
}
