
//-------Типизация для данных
type LandResourcesType = {
    arableLand: number, //Пашня
    hayfieldsAndPastureImproved: number, //Сенокосы и пастбища улучшенные
    hayfieldsAndPastureNatural: number, //Сенокосы и пастбища естественные
}

//-------Типизация экшенов
type SetArableLandActionType = {
    type: 'SET-ARABLE-LAND',
    arableLand: number
}

type SetHayfieldsAndPastureImprovedActionType = {
    type: 'SET-HAYFIELDS-AND-PASTURE-IMPROVED',
    hayfieldsAndPastureImproved: number
}

type SetHayfieldsAndPastureNaturalActionType = {
    type: 'SET-HAYFIELDS-AND-PASTURE-NATURAL',
    hayfieldsAndPastureNatural: number
}

type ActionsType = SetArableLandActionType
    | SetHayfieldsAndPastureImprovedActionType
    | SetHayfieldsAndPastureNaturalActionType

//-------Начальное состояние
const initialState: LandResourcesType = {
    arableLand: 0,
    hayfieldsAndPastureImproved: 0,
    hayfieldsAndPastureNatural: 0
}

//-------Редьюсер
export const animalsReducer = (state = initialState, action: ActionsType): LandResourcesType  => {
    switch (action.type) {
        case 'SET-ARABLE-LAND':
            return {
                ...state,
                arableLand: action.arableLand
            }
        case 'SET-HAYFIELDS-AND-PASTURE-IMPROVED':
            return {
                ...state,
                hayfieldsAndPastureImproved: action.hayfieldsAndPastureImproved
            }
        case 'SET-HAYFIELDS-AND-PASTURE-NATURAL':
            return {
                ...state,
                hayfieldsAndPastureNatural: action.hayfieldsAndPastureNatural
            }
        default:
            return state
    }
}

//-------Action creators
export const setArableLand = (arableLand: number): SetArableLandActionType => ({
    type: 'SET-ARABLE-LAND',
    arableLand
})

export const setHayfieldsAndPastureImproved = (hayfieldsAndPastureImproved: number): SetHayfieldsAndPastureImprovedActionType => ({
    type: 'SET-HAYFIELDS-AND-PASTURE-IMPROVED',
    hayfieldsAndPastureImproved
})

export const setHayfieldsAndPastureNatural = (hayfieldsAndPastureNatural: number): SetHayfieldsAndPastureNaturalActionType => ({
    type: 'SET-HAYFIELDS-AND-PASTURE-NATURAL',
    hayfieldsAndPastureNatural
})