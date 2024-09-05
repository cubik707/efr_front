import axios from 'axios'
import { LandResourcesType } from '../state/landResources/landResources-reducer'

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  //сюда можно в будущем добавить какие-то другие настройки для axios
});

//Функция запроса на сервер
const fetchData = async () => {
  try {
    const response = await instance.post<any>('/calculate');
    console.log(response)
    // const data = await fs.readFile('D:\\univer\\efr-py\\back\\server\\output.json', 'utf8');
    // const jsonData = JSON.parse(data); // Parse JSON data
    // console.log(jsonData);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
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

    // Отбираем только нужные данные для financialResults
    const financialResultsData = {
      revenue: data.revenue,
      cost: data.cost,
      profit: data.revenue - data.cost  // Предполагаем, что прибыль рассчитывается как разница между доходом и расходами
    };

    return financialResultsData;
  },
};

