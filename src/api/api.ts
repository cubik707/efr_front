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

//Функционал на будущее, если появится возможность к каждому отдельно делать запросы
export const animalsAPI = {
  getAnimalsData(){
    return fetchData() //тут нужно будет отобрать нужные данные
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
  getCulturesData(){
    return fetchData() //тут нужно будет отобрать нужные данные
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


