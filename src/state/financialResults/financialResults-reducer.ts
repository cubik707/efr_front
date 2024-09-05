export type FinancialResultsType = {
  revenue: number,  // Доход
  cost: number,     // Расходы
  profit: number    // Прибыль
}

// Action creator для установки дохода
export const setRevenueAC = (revenue: number) => ({
  type: 'SET-REVENUE',
  revenue
} as const)

// Action creator для установки расходов
export const setCostAC = (cost: number) => ({
  type: 'SET-COST',
  cost
} as const)

// Action creator для установки прибыли
export const setProfitAC = (profit: number) => ({
  type: 'SET-PROFIT',
  profit
} as const)

// Типизация всех возможных экшенов для финансовых результатов
type ActionsType =
  | ReturnType<typeof setRevenueAC>
  | ReturnType<typeof setCostAC>
  | ReturnType<typeof setProfitAC>

// Начальное состояние для финансовых результатов
const initialState: FinancialResultsType = {
  revenue: 0,
  cost: 0,
  profit: 0
}

// Редьюсер для управления состоянием финансовых результатов
export const financialResultsReducer = (state: FinancialResultsType = initialState, action: ActionsType): FinancialResultsType => {
  switch (action.type) {
    case 'SET-REVENUE':
      return {
        ...state,
        revenue: action.revenue
      }
    case 'SET-COST':
      return {
        ...state,
        cost: action.cost
      }
    case 'SET-PROFIT':
      return {
        ...state,
        profit: action.profit
      }
    default:
      return state
  }
}
