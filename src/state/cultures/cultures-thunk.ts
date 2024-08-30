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
  'Зерновые озимовые',
  'Зерновые яровые',
  'Зернобобовые',
  'Рапс',
  'Пожнивные на сенаж',
  'Многолетние травы на сено',
  'Многолетние травы на сенаж',
  'Многолетние травы на зеленый корм',
  'Однолетние травы на зеленый корм',
  'Кукуруза на силос',
  'Сенокосы и пастбища улучшенные на сено',
  'Сенокосы и пастбища улучшенные на сенаж',
  'Сенокосы и пастбища естественных на зеленый корм',
  'Сенокосы и пастбища естественных на сенаж'
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