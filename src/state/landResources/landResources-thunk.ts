import { Dispatch } from 'redux'
import { landResourcesAPI } from '../../api/api'
import {
  LandResourcesType,
  setArableLandAC,
  setHayfieldsAndPastureImprovedAC,
  setHayfieldsAndPastureNaturalAC,
} from './landResources-reducer'
import { handleError } from '../../utils/handleErrors'


export const setLandResourcesData = (data: LandResourcesType) => async (dispatch: Dispatch) => {
  try {
    await landResourcesAPI.setLandResourcesData(data)

    dispatch(setArableLandAC(data.arableLand))
    dispatch(setHayfieldsAndPastureImprovedAC(data.hayfieldsAndPastureImproved))
    dispatch(setHayfieldsAndPastureNaturalAC(data.hayfieldsAndPastureNatural))
  } catch (error) {
    handleError(error, dispatch)
  }
}

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