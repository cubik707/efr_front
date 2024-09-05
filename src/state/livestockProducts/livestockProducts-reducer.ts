type LivestockProductsType = {
  mainCows: number,
  additionalCows: number,
  mainYoungCattle: number,
  additionalYoungCattle: number,
}

type LivestockProductsStateType = {
  milk: LivestockProductsType,
  cattleMeat: LivestockProductsType
}

//-------Action creators
type LivestockProduct = 'milk' | 'cattleMeat';

export const setMainCowsAC = (livestockProduct: LivestockProduct, mainCows: number) => ({
  type: 'SET-MAIN-COWS',
  livestockProduct,
  mainCows
} as const);

export const setAdditionalCowsAC = (livestockProduct: LivestockProduct, additionalCows: number) => ({
  type: 'SET-ADDITIONAL-COWS',
  livestockProduct,
  additionalCows
} as const);

export const setMainYoungCattleAC = (livestockProduct: LivestockProduct, mainYoungCattle: number) => ({
  type: 'SET-MAIN-YOUNG-CATTLE',
  livestockProduct,
  mainYoungCattle
} as const);

export const setAdditionalYoungCattleAC = (livestockProduct: LivestockProduct, additionalYoungCattle: number) => ({
  type: 'SET-ADDITIONAL-YOUNG-CATTLE',
  livestockProduct,
  additionalYoungCattle
} as const);

export const setToBuyAC = (livestockProduct: LivestockProduct, toBuy: number) => ({
  type: 'SET-TO-BUY',
  livestockProduct,
  toBuy
} as const);

//-------Типизация экшенов
type ActionsType =
  | ReturnType<typeof setMainCowsAC>
  | ReturnType<typeof setAdditionalCowsAC>
  | ReturnType<typeof setMainYoungCattleAC>
  | ReturnType<typeof setAdditionalYoungCattleAC>
  | ReturnType<typeof setToBuyAC>;

//-------Начальное состояние
const initialState: LivestockProductsStateType = {
  milk: {
    mainCows: 0,
    additionalCows: 0,
    mainYoungCattle: 0,
    additionalYoungCattle: 0
  },
  cattleMeat: {
    mainCows: 0,
    additionalCows: 0,
    mainYoungCattle: 0,
    additionalYoungCattle: 0
  }
}

//-------Редьюсер
export const livestockProductsReducer = (state: LivestockProductsStateType = initialState, action: ActionsType): LivestockProductsStateType => {
  switch (action.type) {
    case 'SET-MAIN-COWS':
      return {
        ...state,
        [action.livestockProduct]: {
          ...state[action.livestockProduct],
          mainCows: action.mainCows
        }
      };
    case 'SET-ADDITIONAL-COWS':
      return {
        ...state,
        [action.livestockProduct]: {
          ...state[action.livestockProduct],
          additionalCows: action.additionalCows
        }
      };
    case 'SET-MAIN-YOUNG-CATTLE':
      return {
        ...state,
        [action.livestockProduct]: {
          ...state[action.livestockProduct],
          mainYoungCattle: action.mainYoungCattle
        }
      };
    case 'SET-ADDITIONAL-YOUNG-CATTLE':
      return {
        ...state,
        [action.livestockProduct]: {
          ...state[action.livestockProduct],
          additionalYoungCattle: action.additionalYoungCattle
        }
      };
    default:
      return state
  }
}