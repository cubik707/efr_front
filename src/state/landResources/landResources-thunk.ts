import { Dispatch } from 'redux'
import { landResourcesAPI } from '../../api/api'
import {
  setArableLandAC,
  setHayfieldsAndPastureImprovedAC,
  setHayfieldsAndPastureNaturalAC,
} from './landResources-reducer'
import { handleError } from '../../utils/handleErrors'

export const fetchLandResourcesData = () => async (dispatch: Dispatch) => {
  try {
    const data = await landResourcesAPI.getLandResourcesData()

    // Обрабатываем данные и создаем экшены
    dispatch(setArableLandAC(data[0]));
    dispatch(setHayfieldsAndPastureImprovedAC(data[1]));
    dispatch(setHayfieldsAndPastureNaturalAC(data[2]));
  } catch (error) {
    handleError(error, dispatch)
  }
};