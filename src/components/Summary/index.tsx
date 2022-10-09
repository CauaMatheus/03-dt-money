import { SummaryCard, SummaryContainer } from './styles'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { priceFormatter } from '../../utils/formatter'
import { useTransactionSummary } from '../../hooks/useTransactionSummary'

export function Summary() {
  const transactionsSummary = useTransactionSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span> <ArrowCircleUp size={32} color="#00B37E" />
        </header>

        <strong>{priceFormatter.format(transactionsSummary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span> <ArrowCircleDown size={32} color="#F75A68" />
        </header>

        <strong>{priceFormatter.format(transactionsSummary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span> <CurrencyDollar size={32} color="#FFF" />
        </header>

        <strong>{priceFormatter.format(transactionsSummary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
