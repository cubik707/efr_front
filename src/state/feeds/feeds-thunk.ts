import { Dispatch } from 'redux'
import { feedsAPI } from '../../api/api'
import { FeedName, setPriceAC, setVolumeAC } from './feeds-reducer'
import { handleError } from '../../utils/handleErrors'

export const fetchFeedsData = (feedName: FeedName) => async (dispatch: Dispatch) => {
  try {
    const data = await feedsAPI.getFeedsData()




  } catch (error) {
    handleError(error, dispatch)
  }
}