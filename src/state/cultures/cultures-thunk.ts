import { Dispatch } from 'redux'
import { culturesAPI } from '../../api/api'
import { setSquareAC } from './cultures-reducer'
import { handleError } from '../../utils/handleErrors'
import { cultures } from './cultures'


export const fetchCultureData = () => async (dispatch: Dispatch) => {
  // try {
  //
  //   const data = await culturesAPI.getCulturesData()
  //   console.log(data)
  //   // Обрабатываем данные и создаем экшены
  //   Object.keys(cultures).forEach((key, index) => {
  //     const cultureKey = key as keyof typeof cultures; // Ensuring TypeScript understands the key type
  //     dispatch(setSquareAC(cultureKey, data[index]));
  //   });
  // } catch (error) {
  //   handleError(error, dispatch)
  // }
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