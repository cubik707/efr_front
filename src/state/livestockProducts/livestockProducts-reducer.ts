type LivestockProductsType = {
  sellingPricePerCent: number // цена реализации продукции за ц
  costPrice: number // себестоимость
}

type LivestockProductsStateType = {
  milk: LivestockProductsType
  cattleMeat: LivestockProductsType
}

export type LivestockProductName = 'milk' | 'cattleMeat'

//-------Action creators
export const setSellingPricePerCentLivestockAC = (
  livestockProduct: LivestockProductName,
  sellingPricePerCent: number
) =>
  ({
    type: 'SET-SELLING-PRICE-PER-CENT',
    livestockProduct,
    sellingPricePerCent,
  }) as const

export const setCostPriceLivestockAC = (
  livestockProduct: LivestockProductName,
  costPrice: number
) =>
  ({
    type: 'SET-COST-PRICE',
    livestockProduct,
    costPrice,
  }) as const

//-------Типизация экшенов
type ActionsType =
  | ReturnType<typeof setSellingPricePerCentLivestockAC>
  | ReturnType<typeof setCostPriceLivestockAC>

//-------Начальное состояние
const initialState: LivestockProductsStateType = {
  milk: {
    sellingPricePerCent: 0,
    costPrice: 0,
  },
  cattleMeat: {
    sellingPricePerCent: 0,
    costPrice: 0,
  },
}

//-------Редьюсер
export const livestockProductsReducer = (
  state: LivestockProductsStateType = initialState,
  action: ActionsType
): LivestockProductsStateType => {
  switch (action.type) {
    case 'SET-SELLING-PRICE-PER-CENT':
      return {
        ...state,
        [action.livestockProduct]: {
          ...state[action.livestockProduct],
          sellingPricePerCent: action.sellingPricePerCent,
        },
      }
    case 'SET-COST-PRICE':
      return {
        ...state,
        [action.livestockProduct]: {
          ...state[action.livestockProduct],
          costPrice: action.costPrice,
        },
      }
    default:
      return state
  }
}
