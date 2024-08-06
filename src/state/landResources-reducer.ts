
//-------Типизация для данных
type LandResourcesType = {
    arableLand: number, //Пашня
    hayfieldsAndPastureImproved: number, //Сенокосы и пастбища улучшенные
    hayfieldsAndPastureNatural: number, //Сенокосы и пастбища естественные
}

//-------Action creators
export const setArableLandAC = (arableLand: number) => ({
    type: 'SET-ARABLE-LAND',
    arableLand
} as const)

export const setHayfieldsAndPastureImprovedAC = (hayfieldsAndPastureImproved: number) => ({
    type: 'SET-HAYFIELDS-AND-PASTURE-IMPROVED',
    hayfieldsAndPastureImproved
} as const)

export const setHayfieldsAndPastureNaturalAC = (hayfieldsAndPastureNatural: number) => ({
    type: 'SET-HAYFIELDS-AND-PASTURE-NATURAL',
    hayfieldsAndPastureNatural
} as const)

//-------Типизация экшенов
type ActionsType = ReturnType<typeof setArableLandAC>
    | ReturnType<typeof setHayfieldsAndPastureImprovedAC>
    | ReturnType<typeof setHayfieldsAndPastureNaturalAC>

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

