import { Dispatch } from 'redux'
import { feedsAPI } from '../../api/api'
import { FeedName, setPriceAC, setVolumeAC } from './feeds-reducer'
import { handleError } from '../../utils/handleErrors'

export const fetchFeedsData = (feedName: FeedName) => async (dispatch: Dispatch) => {
  // try {
  //   const data = await feedsAPI.getFeedsData()
  //
  //
  //   // Обрабатываем данные и создаем экшены
  //   dispatch(setVolumeAC(feedName, data[0]))
  //   dispatch(setPriceAC(feedName, data[1]))
  // } catch (error) {
  //   handleError(error, dispatch)
  // }
}