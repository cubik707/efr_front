import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  //сюда можно в будущем добавить какие-то другие настройки для axios
});

//Функция запроса на сервер
const fetchData = async () => {
  try {
    const response = await instance.post('/calculate');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }
};

export const animalsAPI = {
  getAnimalsData(){
    //Функционал на будущее, если появится возможность к каждому отдельно делать запросы
    return fetchData() //тут нужно будет отобрать нужные данные
  },
  setAnimalData(){
    return fetchData()
  }
}

export const feedsAPI = {
  getFeedsData(){
    //Функционал на будущее, если появится возможность к каждому отдельно делать запросы
    return fetchData() //тут нужно будет отобрать нужные данные
  },
  setFeedsData(){
    return fetchData()
  }
}

export const culturesAPI = {
  getCulturesData(){
    //Функционал на будущее, если появится возможность к каждому отдельно делать запросы
    return fetchData() //тут нужно будет отобрать нужные данные
  },
  setFeedsData(){
    return fetchData()
  }
}

export const landResourcesAPI = {
  getLandResourcesData(){
    //Функционал на будущее, если появится возможность к каждому отдельно делать запросы
    return fetchData() //тут нужно будет отобрать нужные данные
  },
  setLandResourcesData(){
    return fetchData()
  }
}


