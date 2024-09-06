// state/store.ts

import { Action, applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { appReducer } from './app-reducer';
import { animalsReducer } from './animals/animals-reducer';
import { feedsReducer } from './feeds/feeds-reducer';
import { culturesReducer } from './cultures/cultures-reducer';
import { landResourcesReducer } from './landResources/landResources-reducer';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { financialResultsReducer } from './financialResults/financialResults-reducer';
import { livestockProductsReducer } from './livestockProducts/livestockProducts-reducer';
import { loadState, saveState } from '../utils/localStorage-utils';

// Объединяем редукторы
const rootReducer = combineReducers({
    app: appReducer,
    animals: animalsReducer,
    feeds: feedsReducer,
    cultures: culturesReducer,
    landResources: landResourcesReducer,
    financialResults: financialResultsReducer,
    livestockProducts: livestockProductsReducer,
});

// Определяем тип состояния стора
export type AppRootStateType = ReturnType<typeof rootReducer>;

// Загружаем сохраненное состояние
const persistedState = loadState();

// Создаем стор с сохраненным состоянием
export const store = legacy_createStore(
  rootReducer,
  persistedState, // Передаем загруженное состояние
  composeWithDevTools(applyMiddleware(thunk))
);

// Подписка на изменения состояния для сохранения в localStorage
store.subscribe(() => {
    saveState(store.getState());
});

// Определяем тип Dispatch
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, Action>;

// Создаем типизированные хуки
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// Для доступа к стору из консоли браузера
// @ts-ignore
window.store = store;
