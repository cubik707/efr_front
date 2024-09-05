import { financialResultsAPI } from '../../api/api'
import { Dispatch } from 'redux'
import { setCostAC, setProfitAC, setRevenueAC } from './financialResults-reducer'

export const fetchFinancialResultsData = () => async (dispatch: Dispatch) => {
  try {
    const data = await financialResultsAPI.getFinancialResultsData();

    // Диспатчим экшены для обновления состояния
    dispatch(setRevenueAC(data.revenue));
    dispatch(setCostAC(data.cost));
    dispatch(setProfitAC(data.profit));
  } catch (error) {
    console.error('Failed to fetch financial results data:', error);
    // Обработайте ошибку, если нужно
  }
};