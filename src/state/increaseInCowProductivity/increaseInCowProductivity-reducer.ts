//-------Типизация для данных
export type IncreaseInCowProductivityType = {
  increaseInCowProductivity: number
}

//-------Action creators
export const setIncreaseInCowProductivityAC = (increaseInCowProductivity: number) => ({
  type: 'SET-INCREASE-IN-COW-PRODUCTIVITY',
  increaseInCowProductivity
} as const)

//-------Типизация экшенов
type ActionsType = ReturnType<typeof setIncreaseInCowProductivityAC>

//-------Начальное состояние
const initialState: IncreaseInCowProductivityType = {
  increaseInCowProductivity: 0
}

//-------Редьюсер
export const increaseInCowProductivityReducer = (
  state: IncreaseInCowProductivityType = initialState,
  action: ActionsType
): IncreaseInCowProductivityType => {
  switch (action.type) {
    case 'SET-INCREASE-IN-COW-PRODUCTIVITY':
      return {
        ...state,
        increaseInCowProductivity: action.increaseInCowProductivity
      }
    default:
      return state
  }
}
