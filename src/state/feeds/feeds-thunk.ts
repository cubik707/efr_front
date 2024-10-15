import { Dispatch } from 'redux'
import { feedsAPI } from '../../api/api'
import {
  FeedName,
  setAdditionalCowsAC,
  setAdditionalYoungCattleAC,
  setMainCowsAC,
  setMainYoungCattleAC,
  setToBuyAC,
} from './feeds-reducer'
import { handleError } from '../../utils/handleErrors'

export const fetchFeedsData = () => async (dispatch: Dispatch) => {
  try {
    const data = await feedsAPI.getFeedsData()

    Object.entries(data).forEach(([feedName, feedData]) => {
      dispatch(setMainCowsAC(feedName as FeedName, feedData.mainCows))
      dispatch(
        setAdditionalCowsAC(feedName as FeedName, feedData.additionalCows)
      )
      dispatch(
        setMainYoungCattleAC(feedName as FeedName, feedData.mainYoungCattle)
      )
      dispatch(
        setAdditionalYoungCattleAC(
          feedName as FeedName,
          feedData.additionalYoungCattle
        )
      )
      dispatch(setToBuyAC(feedName as FeedName, feedData.toBuy))
    })
  } catch (error) {
    handleError(error, dispatch)
  }
}
