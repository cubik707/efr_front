import {combineReducers, legacy_createStore} from "redux";
import { appReducer } from './app-reducer'
import { animalsReducer } from './animals-reducer'
import { feedsReducer } from './feeds-reducer'
import { culturesReducer } from './cultures-reducer'
import { landResourcesReducer } from './landResources-reducer'


const rootReducer = combineReducers({
    app: appReducer,
    animals: animalsReducer,
    feeds: feedsReducer,
    cultures: culturesReducer,
    landResources: landResourcesReducer
})

// непосредственно создаём store
export const store = legacy_createStore(rootReducer)
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store