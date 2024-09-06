import { Action, applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from 'redux'
import { appReducer } from './app-reducer'
import { animalsReducer } from './animals/animals-reducer'
import { feedsReducer } from './feeds/feeds-reducer'
import { culturesReducer } from './cultures/cultures-reducer'
import { landResourcesReducer } from './landResources/landResources-reducer'
import { thunk, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { financialResultsReducer } from './financialResults/financialResults-reducer'
import { livestockProductsReducer } from './livestockProducts/livestockProducts-reducer'


const rootReducer = combineReducers({
    app: appReducer,
    animals: animalsReducer,
    feeds: feedsReducer,
    cultures: culturesReducer,
    landResources: landResourcesReducer,
    financialResults: financialResultsReducer,
    livestockProducts: livestockProductsReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
// непосредственно создаём store
//@ts-ignore
export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
// определить автоматически тип всего объекта состояния

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, Action>
export const useAppDispatch= useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store