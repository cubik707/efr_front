import axios from 'axios'
import { LandResourcesType } from '../state/landResources/landResources-reducer'
import { FinancialResultsType } from '../state/financialResults/financialResults-reducer'
import { RootObject } from './dataToServerType'

const instance = axios.create({
  baseURL: 'http://localhost:9000',
  //сюда можно в будущем добавить какие-то другие настройки для axios
});

//Функция запроса на сервер
const fetchData = async () => {
  try {
    const response = await instance.post<any>('/calculate');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }
};

// Функция для отправки собранных данных на сервер
export const saveDataToServer = async (data: RootObject) => {
  try {
    const response = await axios.post('http://localhost:5000/save', data);
    console.log('Data successfully saved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to save data', error);
    throw error;
  }
};


//Функционал на будущее, если появится возможность к каждому отдельно делать запросы
export const animalsAPI = {
  async getAnimalsData() {
  },
  setAnimalData(){
    return fetchData()
  }
}

export const feedsAPI = {
  async getFeedsData (){
    const data = await fetchData();
    const feedData = {
      concentrates: {
        mainCows: data.mainConcentratesCows,
        additionalCows: data.additionalConcentratesCows,
        mainYoungCattle: data.mainConcentratesYoungCattle,
        additionalYoungCattle: data.additionalConcentratesYoungCattle,
        toBuy: data.concentratesToBuy,
      },
      silo: {
        mainCows: data.mainSilageCows,
        additionalCows: data.additionalSilageCows,
        mainYoungCattle: data.mainSilageYoungCattle,
        additionalYoungCattle: data.additionalSilageYoungCattle,
        toBuy: data.silageToBuy,
      },
      greenFodder: {
        mainCows: data.mainGreenFodderCows,
        additionalCows: data.additionalGreenFodderCows,
        mainYoungCattle: data.mainGreenFodderYoungCattle,
        additionalYoungCattle: data.additionalGreenFodderYoungCattle,
        toBuy: data.greenFodderToBuy,
      },
      hay: {
        mainCows: data.mainHayCows,
        additionalCows: data.additionalHayCows,
        mainYoungCattle: data.mainhayYoungCattle,
        additionalYoungCattle: data.additionalhayYoungCattle,
        toBuy: data.hayToBuy,
      },
      haylage: {
        mainCows: data.mainHaylageCows,
        additionalCows: data.additionalHaylageCows,
        mainYoungCattle: data.mainhaylageYoungCattle,
        additionalYoungCattle: data.additionalhaylageYoungCattle,
        toBuy: data.haylageToBuy,
      },
      straw: {
        mainCows: data.mainStrawCows,
        additionalCows: data.additionalStrawCows,
        mainYoungCattle: data.mainStrawYoungCattle,
        additionalYoungCattle: data.additionalStrawYoungCattle,
        toBuy: data.strawToBuy,
      }
    };
    return feedData;
  },
  setFeedsData(){
    return fetchData()
  }
}

export const culturesAPI = {
  async getCulturesData() {
    const data = await fetchData(); // Получаем данные

    // Создаем объект с только нужными полями
    const culturesData = {
      winterGrains: data.winterGrainsArea,
      springGrains: data.springGrainsArea,
      pulses: data.pulsesArea,
      rape: data.rapeArea,
      hayGrassHay: data.hayGrassHayArea,
      haylageGrassHay: data.haylageGrassHayArea,
      greenFodderGrassHay: data.greenFodderGrassHayArea,
      annualGrassesGreenFodder: data.annualGrassesGreenFodderArea,
      cornOnSilage: data.cornOnSilageArea,
      hayImprovedHayfieldsAndPastures: data.hayImprovedHayfieldsAndPasturesArea,
      haylageImprovedHayfieldsAndPastures: data.haylageImprovedHayfieldsAndPasturesArea,
      haylageNaturalHayfieldsAndPastures: data.haylageNaturalHayfieldsAndPasturesArea,
      greenFodderNaturalHayfieldsAndPastures: data.greenFodderNaturalHayfieldsAndPasturesArea
    };

    return culturesData; // Возвращаем объект с полями
  },
  setFeedsData(){
    return fetchData()
  }
}

export const landResourcesAPI = {
  setLandResourcesData(data: LandResourcesType){
    return fetchData()
  }
}

export const financialResultsAPI = {
  async getFinancialResultsData() {
    // Получаем данные с сервера
    const data = await fetchData();

    // Отбираем и вычисляем нужные данные для financialResults
    const revenue = data.revenue;
    const cost = data.cost;
    const profit = revenue - cost;

    const financialResultsData = {
      revenue,
      cost,
      profit
    };

    return financialResultsData;
  },
};

export const cowsAPI = {
  async getCowProductivityData(){
    // Получаем данные с сервера
    const data = await fetchData();
    const resultData = {
      increaseInCowProductivity: data.additionalCowProductivity
    }

    return resultData;
  }
};

