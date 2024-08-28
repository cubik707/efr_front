import { Dispatch } from 'redux'
import { feedsAPI } from '../../api/api'
import { setPriceAC, setVolumeAC } from './feeds-reducer'

export const fetchFeedsData = (feedName: string) => async (dispatch: Dispatch) => {
  try {
    const data = await feedsAPI.getFeedsData()


    // Обрабатываем данные и создаем экшены
    dispatch(setVolumeAC(feedName, data[0]))
    dispatch(setPriceAC(feedName, data[1]))
  } catch (error) {
    console.error(error)
    // dispatch(setAppErrorAC(error))
    // Можно добавить обработку ошибок или dispatch ошибок экшенов
  }
}