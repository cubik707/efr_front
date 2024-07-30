
//-------Типизация для данных
type AnimalType = {
    productivity: number, //Продуктивно(базовая)
    livestock: number, //Поголовье
    consumptionOfFU: number //расход ц кормовых единиц(?) на 1 ц продукции
}

type AnimalsStateType = {
    [animalName: string]: AnimalType
}

//-------Типизация экшенов
type SetProductivityActionType = {
    type: 'SET-PRODUCTIVITY',
    animalName: string,
    productivity: number
}

type SetLivestockActionType = {
    type: 'SET-LIVESTOCK',
    animalName: string,
    livestock: number
}

type SetConsumptionOfFUActionType = {
    type: 'SET-CONSUMPTION-OF-FU',
    animalName: string,
    consumptionOfFU: number
}

type ActionsType = SetProductivityActionType
    | SetLivestockActionType
    | SetConsumptionOfFUActionType

//-------Начальное состояние
const initialState: AnimalsStateType = {}

//-------Редьюсер
export const animalsReducer = (state = initialState, action: ActionsType): AnimalsStateType  => {
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

//-------Action creators
export const setProductivity = (animalName: string, productivity: number): SetProductivityActionType => ({
    type: 'SET-PRODUCTIVITY',
    animalName,
    productivity
})

export const setLivestock = (animalName: string, livestock: number): SetLivestockActionType => ({
    type: 'SET-LIVESTOCK',
    animalName,
    livestock
})

export const setConsumptionOfFU = (animalName: string, consumptionOfFU: number): SetConsumptionOfFUActionType => ({
    type: 'SET-CONSUMPTION-OF-FU',
    animalName,
    consumptionOfFU
})