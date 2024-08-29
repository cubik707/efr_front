import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  //сюда можно в будущем добавить какие-то другие настройки для axios
});

//Функция запроса на сервер
const fetchData = async () => {
  try {
    const response = await instance.post<number[]>('/calculate');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }
};

// Доп функция, чтобы вырезать нужные данных
const extractDataRange = (data: number[], start: number, end: number): number[] => {
  return data.slice(start, end);
};

//Функционал на будущее, если появится возможность к каждому отдельно делать запросы
export const animalsAPI = {
  async getAnimalsData() {
    const data = await fetchData();
    return extractDataRange(data, 14, 32);
  },
  setAnimalData(){
    return fetchData()
  }
}

export const feedsAPI = {
  getFeedsData(){
    return fetchData() //тут нужно будет отобрать нужные данные
  },
  setFeedsData(){
    return fetchData()
  }
}

export const culturesAPI = {
  async getCulturesData() {
    const data = await fetchData();
    return extractDataRange(data, 0, 14);
  },
  setFeedsData(){
    return fetchData()
  }
}

export const landResourcesAPI = {
  getLandResourcesData(){
    return fetchData() //тут нужно будет отобрать нужные данные
  },
  setLandResourcesData(){
    return fetchData()
  }
}


