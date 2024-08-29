import { Dispatch } from 'redux'
import { culturesAPI } from '../../api/api'
import {
  setContractDeliveriesAC,
  setCostPriceAC,
  setOnFeedAC,
  setOnProductAC,
  setOnSeedsAC,
  setSellingPricePerCentAC, setSquareAC,
  setYieldForecastAC,
} from './cultures-reducer'
import { handleError } from '../../utils/handleErrors'

const culturesName = [
  'зерновые озимовые',
  'зерновые яровые',
  'зернобобовые',
  'рапс',
  'пожнивные на сенаж',
  'многолетние травы на сено',
  'многолетние травы на сенаж',
  'многолетние травы на зеленый корм',
  'однолетние травы на зеленый корм',
  'кукуруза на силос',
  'сенокосы и пастбища улучшенные на сено',
  'сенокосы и пастбища улучшенные на сенаж',
  'сенокосы и пастбища естественных на зеленый корм',
  'сенокосы и пастбища естественных на сенаж',
]

export const fetchCultureData = () => async (dispatch: Dispatch) => {
  try {

    const data = await culturesAPI.getCulturesData()
    console.log(data)
    // Обрабатываем данные и создаем экшены
    data.forEach((el, index)=>{
      dispatch(setSquareAC(culturesName[index], el))
    })
  } catch (error) {
    handleError(error, dispatch)
  }
};






//TC на будущее если вдруг с сервера начнут приходить НОРМАЛЬНЫЕ ДАННЫЕ)))
// export const fetchCultureData = (cultureName: string) => async (dispatch: Dispatch) => {
//   try {
//     const data = await culturesAPI.getCulturesData()
//
//     // Обрабатываем данные и создаем экшены
//     dispatch(setSquareAC(cultureName,))
//   } catch (error) {
//     handleError(error, dispatch)
//   }
// };