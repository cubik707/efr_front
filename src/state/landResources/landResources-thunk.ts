import { Dispatch } from 'redux'
import { landResourcesAPI } from '../../api/api'
import {
  setArableLandAC,
  setHayfieldsAndPastureImprovedAC,
  setHayfieldsAndPastureNaturalAC,
} from './landResources-reducer'

export const fetchLandResourcesData = () => async (dispatch: Dispatch) => {
  try {
    const data = await landResourcesAPI.getLandResourcesData()

    // Обрабатываем данные и создаем экшены
    dispatch(setArableLandAC(data[0]));
    dispatch(setHayfieldsAndPastureImprovedAC(data[1]));
    dispatch(setHayfieldsAndPastureNaturalAC(data[2]));
  } catch (error) {
    console.error(error);
    // dispatch(setAppErrorAC(error))
    // Можно добавить обработку ошибок или dispatch ошибок экшенов
  }
};