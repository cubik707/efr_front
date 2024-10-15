export type FinancialResultsType = {
  revenue: number // Доход
  cost: number // Расходы
  profit: number // Прибыль
  profitability: number //Рентабельность
}
// Action creator для установки дохода
export const setRevenueAC = (revenue: number) =>
  ({
    type: 'SET-REVENUE',
    revenue,
  }) as const

// Action creator для установки расходов
export const setCostAC = (cost: number) =>
  ({
    type: 'SET-COST',
    cost,
  }) as const

// Action creator для установки прибыли
export const setProfitAC = (profit: number) =>
  ({
    type: 'SET-PROFIT',
    profit,
  }) as const

// Типизация всех возможных экшенов для финансовых результатов
type ActionsType =
  | ReturnType<typeof setRevenueAC>
  | ReturnType<typeof setCostAC>
  | ReturnType<typeof setProfitAC>

// Начальное состояние для финансовых результатов
const initialState: FinancialResultsType = {
  revenue: 0,
  cost: 0,
  profit: 0,
  profitability: 0, // Изначально рентабельность равна 0
}

// Редьюсер для управления состоянием финансовых результатов
export const financialResultsReducer = (
  state: FinancialResultsType = initialState,
  action: ActionsType
): FinancialResultsType => {
  switch (action.type) {
    case 'SET-REVENUE':
      const newRevenue = action.revenue
      const newProfit = state.profit // Прибыль остается без изменений
      return {
        ...state,
        revenue: newRevenue,
        profitability: newRevenue !== 0 ? (newProfit / newRevenue) * 100 : 0, // Пересчитываем рентабельность
      }
    case 'SET-COST':
      const newCost = action.cost
      const calculatedProfit = state.revenue - newCost // Пересчитываем прибыль
      return {
        ...state,
        cost: newCost,
        profit: calculatedProfit,
        profitability:
          state.revenue !== 0 ? (calculatedProfit / state.revenue) * 100 : 0, // Пересчитываем рентабельность
      }
    case 'SET-PROFIT':
      const newProfitFromAction = action.profit
      return {
        ...state,
        profit: newProfitFromAction,
        profitability:
          state.revenue !== 0 ? (newProfitFromAction / state.revenue) * 100 : 0, // Пересчитываем рентабельность
      }
    default:
      return state
  }
}
