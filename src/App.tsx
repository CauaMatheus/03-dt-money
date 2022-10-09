import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Transactions } from './pages/Transactions'
import { TransactionsContextProvider } from './contexts/TransactionsContext'
import { Header } from './components/Header'
import { Summary } from './components/Summary'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsContextProvider>
        <Header />
        <Summary />
        <Transactions />
      </TransactionsContextProvider>
    </ThemeProvider>
  )
}
