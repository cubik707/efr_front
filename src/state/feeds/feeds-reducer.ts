
//-------Типизация для данных
export type FeedType = {
    volume: number, //Объем
    price: number, //Цена
    mainCows: number,
    additionalCows: number,
    mainYoungCattle: number,
    additionalYoungCattle: number,
    toBuy: number
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

export const setMainCowsAC = (feedName: FeedName, mainCows: number) => ({
    type: 'SET-MAIN-COWS',
    feedName,
    mainCows
} as const);

export const setAdditionalCowsAC = (feedName: FeedName, additionalCows: number) => ({
    type: 'SET-ADDITIONAL-COWS',
    feedName,
    additionalCows
} as const);

export const setMainYoungCattleAC = (feedName: FeedName, mainYoungCattle: number) => ({
    type: 'SET-MAIN-YOUNG-CATTLE',
    feedName,
    mainYoungCattle
} as const);

export const setAdditionalYoungCattleAC = (feedName: FeedName, additionalYoungCattle: number) => ({
    type: 'SET-ADDITIONAL-YOUNG-CATTLE',
    feedName,
    additionalYoungCattle
} as const);

export const setToBuyAC = (feedName: FeedName, toBuy: number) => ({
    type: 'SET-TO-BUY',
    feedName,
    toBuy
} as const);


//-------Типизация экшенов
type ActionsType =
  | ReturnType<typeof setVolumeAC>
  | ReturnType<typeof setPriceAC>
  | ReturnType<typeof setMainCowsAC>
  | ReturnType<typeof setAdditionalCowsAC>
  | ReturnType<typeof setMainYoungCattleAC>
  | ReturnType<typeof setAdditionalYoungCattleAC>
  | ReturnType<typeof setToBuyAC>;

//-------Начальное состояние
const initialState: FeedsStateType = {
    concentrates: { volume: 0, price: 0, mainCows: 0, additionalCows: 0, mainYoungCattle: 0, additionalYoungCattle: 0, toBuy: 0 },
    silo: { volume: 0, price: 0, mainCows: 0, additionalCows: 0, mainYoungCattle: 0, additionalYoungCattle: 0, toBuy: 0 },
    greenFodder: { volume: 0, price: 0, mainCows: 0, additionalCows: 0, mainYoungCattle: 0, additionalYoungCattle: 0, toBuy: 0 },
    hay: { volume: 0, price: 0, mainCows: 0, additionalCows: 0, mainYoungCattle: 0, additionalYoungCattle: 0, toBuy: 0 },
    haylage: { volume: 0, price: 0, mainCows: 0, additionalCows: 0, mainYoungCattle: 0, additionalYoungCattle: 0, toBuy: 0 },
    straw: { volume: 0, price: 0, mainCows: 0, additionalCows: 0, mainYoungCattle: 0, additionalYoungCattle: 0, toBuy: 0 }
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
        case 'SET-MAIN-COWS':
            return {
                ...state,
                [action.feedName]: {
                    ...state[action.feedName],
                    mainCows: action.mainCows
                }
            };
        case 'SET-ADDITIONAL-COWS':
            return {
                ...state,
                [action.feedName]: {
                    ...state[action.feedName],
                    additionalCows: action.additionalCows
                }
            };
        case 'SET-MAIN-YOUNG-CATTLE':
            return {
                ...state,
                [action.feedName]: {
                    ...state[action.feedName],
                    mainYoungCattle: action.mainYoungCattle
                }
            };
        case 'SET-ADDITIONAL-YOUNG-CATTLE':
            return {
                ...state,
                [action.feedName]: {
                    ...state[action.feedName],
                    additionalYoungCattle: action.additionalYoungCattle
                }
            };
        case 'SET-TO-BUY':
            return {
                ...state,
                [action.feedName]: {
                    ...state[action.feedName],
                    toBuy: action.toBuy
                }
            };
        default:
            return state
    }
}


