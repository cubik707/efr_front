import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  //сюда можно в будущем добавить какие-то другие настройки для axios
});

//Функция запроса на сервер
const fetchData = async () => {
  try {
    const response = await instance.post<string>('/calculate');
    let dataString = response.data;

    // Удаление нежелательных символов или замена некорректных значений
    dataString = dataString
      .replace(/None/g, 'null') // Заменить 'None' на 'null' или другой подходящий заменитель
      .replace(/[^0-9.,-]/g, ''); // Удалить все символы, кроме цифр, запятых, точек и минусов

    // Преобразование очищенной строки в массив чисел
    const dataArray = dataString
      .split(',') // Разделить строку по запятым
      .map(value => parseFloat(value.trim())) // Преобразовать каждое значение в число, удаляя пробелы
      .filter(value => !isNaN(value)); // Удалить любые значения NaN

    return dataArray;
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


