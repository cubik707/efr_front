// -------Типизация для данных
type CultureType = {
    yieldForecast: number; // урожайность прогнозная
    onFeed: number; // на корм
    onProduct: number; // на товар
    onSeeds: number; // на семена
    contractDeliveries: number; // договорные поставки
    sellingPricePerCent: number; // цена реализации продукции за ц
    costPrice: number; // себестоимость
};

export type CultureStateType = {
    [cultureName: string]: CultureType;
};

// -------Action creators
export const setYieldForecastAC = (cultureName: string, yieldForecast: number) => ({
    type: 'SET-YIELD-FORECAST',
    cultureName,
    yieldForecast
} as const);

export const setOnFeedAC = (cultureName: string, onFeed: number) => ({
    type: 'SET-ON-FEED',
    cultureName,
    onFeed
} as const);

export const setOnProductAC = (cultureName: string, onProduct: number) => ({
    type: 'SET-ON-PRODUCT',
    cultureName,
    onProduct
} as const);

export const setOnSeedsAC = (cultureName: string, onSeeds: number) => ({
    type: 'SET-ON-SEEDS',
    cultureName,
    onSeeds
} as const);

export const setContractDeliveriesAC = (cultureName: string, contractDeliveries: number) => ({
    type: 'SET-CONTRACT-DELIVERIES',
    cultureName,
    contractDeliveries
} as const);

export const setSellingPricePerCentAC = (cultureName: string, sellingPricePerCent: number) => ({
    type: 'SET-SELLING-PRICE-PER-CENT',
    cultureName,
    sellingPricePerCent
} as const);

export const setCostPriceAC = (cultureName: string, costPrice: number) => ({
    type: 'SET-COST-PRICE',
    cultureName,
    costPrice
} as const);

// -------Типизация экшенов с использованием ReturnType
export type ActionsType =
    | ReturnType<typeof setYieldForecastAC>
    | ReturnType<typeof setOnFeedAC>
    | ReturnType<typeof setOnProductAC>
    | ReturnType<typeof setOnSeedsAC>
    | ReturnType<typeof setContractDeliveriesAC>
    | ReturnType<typeof setSellingPricePerCentAC>
    | ReturnType<typeof setCostPriceAC>;

// -------Начальное состояние
const initialState: CultureStateType = {};

// -------Редьюсер
export const culturesReducer = (state = initialState, action: ActionsType): CultureStateType => {
    switch (action.type) {
        case 'SET-YIELD-FORECAST':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    yieldForecast: action.yieldForecast
                }
            };
        case 'SET-ON-FEED':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    onFeed: action.onFeed
                }
            };
        case 'SET-ON-PRODUCT':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    onProduct: action.onProduct
                }
            };
        case 'SET-ON-SEEDS':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    onSeeds: action.onSeeds
                }
            };
        case 'SET-CONTRACT-DELIVERIES':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    contractDeliveries: action.contractDeliveries
                }
            };
        case 'SET-SELLING-PRICE-PER-CENT':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    sellingPricePerCent: action.sellingPricePerCent
                }
            };
        case 'SET-COST-PRICE':
            return {
                ...state,
                [action.cultureName]: {
                    ...state[action.cultureName],
                    costPrice: action.costPrice
                }
            };
        default:
            return state;
    }
};
