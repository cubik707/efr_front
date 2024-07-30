
//-------Типизация для данных
type CultureType = {
    yieldForecast: number //урожайность прогнозная
    onFeed: number //на корм
    onProduct: number //на товар
    onSeeds: number //на семена
    contractDeliveries: number //договорные поставки
    sellingPricePerCent: number //цена реализации продукции за ц
    costPrice: number //себестоимость
}

export type CultureStateType = {
    [cultureName: string]: CultureType
}

//-------Типизация экшенов
export type SetYieldForecastActionType = {
    type: 'SET-YIELD-FORECAST',
    cultureName: string,
    yieldForecast: number
}

export type SetOnFeedActionType = {
    type: 'SET-ON-FEED',
    cultureName: string,
    onFeed: number
}

export type SetOnProductActionType = {
    type: 'SET-ON-PRODUCT',
    cultureName: string,
    onProduct: number
}

export type SetOnSeedsActionType = {
    type: 'SET-ON-SEEDS',
    cultureName: string,
    onSeeds: number
}

export type SetContractDeliveriesActionType = {
    type: 'SET-CONTRACT-DELIVERIES',
    cultureName: string,
    contractDeliveries: number
}

export type SetSellingPricePerCentActionType = {
    type: 'SET-SELLING-PRICE-PER-CENT',
    cultureName: string,
    sellingPricePerCent: number
}

export type SetCostPriceActionType = {
    type: 'SET-COST-PRICE',
    cultureName: string,
    costPrice: number
}

export type ActionsType = SetYieldForecastActionType
    | SetOnFeedActionType
    | SetOnProductActionType
    | SetOnSeedsActionType
    | SetContractDeliveriesActionType
    | SetSellingPricePerCentActionType
    | SetCostPriceActionType

//-------Начальное состояние
const initialState: CultureStateType = {}

//-------Редьюсер
export const culturesReducer = (state = initialState, action: ActionsType): CultureStateType  => {
    switch (action.type) {
        case 'SET-YIELD-FORECAST':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    yieldForecast: action.yieldForecast
                }
            }
        case 'SET-ON-FEED':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    onFeed: action.onFeed
                }
            }
        case 'SET-ON-PRODUCT':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    onProduct: action.onProduct
                }
            }
        case 'SET-ON-SEEDS':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    onSeeds: action.onSeeds
                }
            }
        case 'SET-CONTRACT-DELIVERIES':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    contractDeliveries: action.contractDeliveries
                }
            }
        case 'SET-SELLING-PRICE-PER-CENT':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    sellingPricePerCent: action.sellingPricePerCent
                }
            }
        case 'SET-COST-PRICE':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    costPrice: action.costPrice
                }
            }
        default:
            return state
    }
}

//-------Action creators
export const setYieldForecast = (cultureName: string, yieldForecast: number): SetYieldForecastActionType => ({
    type: 'SET-YIELD-FORECAST',
    cultureName,
    yieldForecast
})

export const setOnFeed = (cultureName: string, onFeed: number): SetOnFeedActionType => ({
    type: 'SET-ON-FEED',
    cultureName,
    onFeed
})

export const setOnProduct = (cultureName: string, onProduct: number): SetOnProductActionType => ({
    type: 'SET-ON-PRODUCT',
    cultureName,
    onProduct
})

export const setOnSeeds = (cultureName: string, onSeeds: number): SetOnSeedsActionType => ({
    type: 'SET-ON-SEEDS',
    cultureName,
    onSeeds
})

export const setContractDeliveries = (cultureName: string, contractDeliveries: number): SetContractDeliveriesActionType => ({
    type: 'SET-CONTRACT-DELIVERIES',
    cultureName,
    contractDeliveries
})

export const setSellingPricePerCent = (cultureName: string, sellingPricePerCent: number): SetSellingPricePerCentActionType => ({
    type: 'SET-SELLING-PRICE-PER-CENT',
    cultureName,
    sellingPricePerCent
})

export const setCostPrice = (cultureName: string, costPrice: number): SetCostPriceActionType => ({
    type: 'SET-COST-PRICE',
    cultureName,
    costPrice
})