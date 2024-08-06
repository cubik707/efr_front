
//-------Типизация для данных
type FeedType = {
    volume: number, //Объем
    price: number, //Цена
}

type FeedsStateType = {
    [feedName: string]: FeedType
}

//-------Action creators
export const setVolumeAC = (feedName: string, volume: number) => ({
    type: 'SET-VOLUME',
    feedName,
    volume
} as const)

export const setPriceAC = (feedName: string, price: number) => ({
    type: 'SET-PRICE',
    feedName,
    price
} as const)

//-------Типизация экшенов
type ActionsType = ReturnType<typeof setVolumeAC> | ReturnType<typeof setPriceAC>

//-------Начальное состояние
const initialState: FeedsStateType = {}

//-------Редьюсер
export const animalsReducer = (state = initialState, action: ActionsType): FeedsStateType  => {
    switch (action.type) {
        case 'SET-VOLUME':
            return {
                ...state,
                [action.feedName]: {
                    ...state[action.feedName],
                    volume: action.volume
                }
            }
        case 'SET-PRICE':
            return {
                ...state,
                [action.feedName]: {
                    ...state[action.feedName],
                    price: action.price
                }
            }
        default:
            return state
    }
}

