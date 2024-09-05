
//-------Типизация для данных
export type FeedType = {
    volume: number, //Объем
    price: number, //Цена
}

export type FeedName = 'concentrates' | 'silo' | 'greenFodder' | 'hay' | 'haylage' | 'straw'

type FeedsStateType = {
    [feedName in FeedName]: FeedType
}

//-------Action creators
export const setVolumeAC = (feedName: FeedName, volume: number) => ({
    type: 'SET-VOLUME',
    feedName,
    volume
} as const)

export const setPriceAC = (feedName: FeedName, price: number) => ({
    type: 'SET-PRICE',
    feedName,
    price
} as const)

//-------Типизация экшенов
type ActionsType = ReturnType<typeof setVolumeAC> | ReturnType<typeof setPriceAC>

//-------Начальное состояние
const initialState: FeedsStateType = {
    concentrates: { volume: 0, price: 0 },
    silo: { volume: 0, price: 0 },
    greenFodder: { volume: 0, price: 0 },
    hay: { volume: 0, price: 0 },
    haylage: { volume: 0, price: 0 },
    straw: { volume: 0, price: 0 }
};

//-------Редьюсер
export const feedsReducer = (state: FeedsStateType = initialState, action: ActionsType): FeedsStateType  => {
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


