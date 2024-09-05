import { Dispatch } from 'redux'
import { culturesAPI } from '../../api/api'
import { CultureNames, setSquareAC } from './cultures-reducer'
import { handleError } from '../../utils/handleErrors'
import { cultures } from './cultures'


export const fetchCultureData = () => async (dispatch: Dispatch) => {
  try {
    const data = await culturesAPI.getCulturesData()
    console.log(data)
    for (const [key, value] of Object.entries(data)) {
      // Формируем типизацию ключей в соответствии с культурой
      const cultureName = key as CultureNames;

      // Проверяем, существует ли поле square в CultureType, и если да, диспатчим его значение
      if (value !== undefined) {
        dispatch(setSquareAC(cultureName, value));
      }
    }
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