import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "../reducers/TodoReducer"
import storage from 'redux-persist/lib/storage';
import { persistStore,persistReducer } from "redux-persist";
const persistStorage={
    key:'root',
    storage
}
const persistedReducers=persistReducer(persistStorage,TodoReducer)

export let store=configureStore({
    reducer:persistedReducers
})
export let persistor=persistStore(store)