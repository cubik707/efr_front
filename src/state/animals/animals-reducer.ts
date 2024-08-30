//todo: прописать строго, какие могут быть имена у животных отдельным типом
//-------Типизация для данных
import { animalsAPI } from '../../api/api'
import { Dispatch } from 'redux'
import { setAppErrorAC } from '../app-reducer'

type AnimalType = {
    productivity: number, //Продуктивно(базовая)
    livestock: number, //Поголовье
    consumptionOfFU: number //расход ц кормовых единиц(?) на 1 ц продукции
}

type AnimalsStateType = {
    [animalName: string]: AnimalType
}

//-------Action creators
export const setProductivityAC = (animalName: string, productivity: number) => ({
    type: 'SET-PRODUCTIVITY',
    animalName,
    productivity
} as const)

export const setLivestockAC = (animalName: string, livestock: number) => ({
    type: 'SET-LIVESTOCK',
    animalName,
    livestock
} as const)

export const setConsumptionOfFUAC = (animalName: string, consumptionOfFU: number) => ({
    type: 'SET-CONSUMPTION-OF-FU',
    animalName,
    consumptionOfFU
} as const)

//-------Типизация экшенов
type ActionsType = ReturnType<typeof setProductivityAC>
    | ReturnType<typeof setLivestockAC>
    | ReturnType<typeof setConsumptionOfFUAC>

//-------Начальное состояние
const initialState: AnimalsStateType = {
    'Коровы': {
        productivity: 0,
        livestock: 0,
        consumptionOfFU: 0
    },
    'Молодняк КРС': {
        productivity: 0,
        livestock: 0,
        consumptionOfFU: 0
    }
}

//-------Редьюсер
export const animalsReducer = (state: AnimalsStateType = initialState, action: ActionsType): AnimalsStateType  => {
    switch (action.type) {
        case 'SET-PRODUCTIVITY':
            return {
                ...state,
                [action.animalName]: {
                    ...state[action.animalName],
                    productivity: action.productivity
                }
            }
        case 'SET-LIVESTOCK':
            return {
                ...state,
                [action.animalName]: {
                    ...state[action.animalName],
                    livestock: action.livestock
                }
            }
        case 'SET-CONSUMPTION-OF-FU':
            return {
                ...state,
                [action.animalName]: {
                    ...state[action.animalName],
                    consumptionOfFU: action.consumptionOfFU
                }
            }
        default:
            return state
    }
}




