
//-------Типизация для данных
interface  InitialStateType {
   error: string
}

//-------Action creators
export const setAppErrorAC = (error: string) => ({
    type: 'SET-ERROR',
    error
} as const)

//-------Типизация экшенов
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type ActionsType = SetAppErrorActionType

//-------Начальное состояние
const initialState: InitialStateType = {
    error: ''
}

//-------Редьюсер
export const appReducer = (state: InitialStateType = initialState, action: ActionsType)  => {
    switch (action.type) {
        case 'SET-ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

