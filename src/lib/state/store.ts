// store/store.js
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// Store function that returns a configured store
const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of the store instance
export type AppStore = ReturnType<typeof createStore>;

// Infer the `RootState` and `AppDispatch` types from the store instance
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default createStore;
