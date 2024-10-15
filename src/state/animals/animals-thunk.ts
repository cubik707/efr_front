import { Dispatch } from 'redux'
import { animalsAPI } from '../../api/api'
import {
  setConsumptionOfFUAC,
  setLivestockAC,
  setProductivityAC,
} from './animals-reducer'
import { handleError } from '../../utils/handleErrors'

export const fetchAnimalsData =
  (animalName: string) => async (dispatch: Dispatch) => {
    // try {
    //   const data = await animalsAPI.getAnimalsData();
    //
    //   // Обрабатываем данные и создаем экшены
    //   dispatch(setProductivityAC(animalName, data[0]));
    //   dispatch(setLivestockAC(animalName, data[1]));
    //   dispatch(setConsumptionOfFUAC(animalName, data[2]));
    // } catch (error) {
    //   handleError(error, dispatch)
    // }
  }
