import { handleError } from '../../utils/handleErrors'
import { Dispatch } from 'redux'
import { setIncreaseInCowProductivityAC } from './increaseInCowProductivity-reducer'
import { cowsAPI } from '../../api/api'

export const fetchCowProductivityData = () => async (dispatch: Dispatch) => {
  try {
    const data = await cowsAPI.getCowProductivityData() // Запрос данных через API
    console.log(data)

    // Обрабатываем данные и диспатчим значение увеличения продуктивности
    if (data.increaseInCowProductivity !== undefined) {
      dispatch(setIncreaseInCowProductivityAC(data.increaseInCowProductivity))
    }
  } catch (error) {
    handleError(error, dispatch) // Обработка ошибок
  }
}
