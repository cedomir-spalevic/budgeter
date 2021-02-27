import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypeOf } from "yup";

const rootReducer = combineReducers({})


const store = configureStore({
    reducer
})

export type RootState = ReturnType<typeof rootReducer>