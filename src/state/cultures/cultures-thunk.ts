import { Dispatch } from 'redux'
import { culturesAPI } from '../../api/api'
import {
  setContractDeliveriesAC,
  setCostPriceAC,
  setOnFeedAC,
  setOnProductAC,
  setOnSeedsAC,
  setSellingPricePerCentAC,
  setYieldForecastAC,
} from './cultures-reducer'

export const fetchCultureData = (cultureName: string) => async (dispatch: Dispatch) => {
  try {
    const data = await culturesAPI.getCulturesData()

    // Обрабатываем данные и создаем экшены
    dispatch(setYieldForecastAC(cultureName, data[0]))
    dispatch(setOnFeedAC(cultureName, data[1]))
    dispatch(setOnProductAC(cultureName, data[2]))
    dispatch(setOnSeedsAC(cultureName, data[3]))
    dispatch(setContractDeliveriesAC(cultureName, data[4]))
    dispatch(setSellingPricePerCentAC(cultureName, data[5]))
    dispatch(setCostPriceAC(cultureName, data[6]))
  } catch (error) {
    console.error(error);
    // dispatch(setAppErrorAC(error))
    // Можно добавить обработку ошибок или dispatch ошибок экшенов
  }
};