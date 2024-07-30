
//-------Типизация для данных
type FeedType = {
    volume: number, //Объем
    price: number, //Цена
}

type FeedsStateType = {
    [feedName: string]: FeedType
}

//-------Типизация экшенов
type SetVolumeActionType = {
    type: 'SET-VOLUME',
    feedName: string,
    volume: number
}

type SetPriceActionType = {
    type: 'SET-PRICE',
    feedName: string,
    price: number
}

type ActionsType = SetVolumeActionType | SetPriceActionType

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

//-------Action creators
export const setVolume = (feedName: string, volume: number): SetVolumeActionType => ({
    type: 'SET-VOLUME',
    feedName,
    volume
})

export const setPrice = (feedName: string, price: number): SetPriceActionType => ({
    type: 'SET-PRICE',
    feedName,
    price
})