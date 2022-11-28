import { configureStore } from "@reduxjs/toolkit";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from "redux-state-sync";
import { useMemo } from "react";
import storage from "redux-persist/lib/storage";
import * as types from "./redux_types";

import app_reducer from "./reducers";

const syncConfig = {
  blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
  // prepareState: (state) => {
  //   console.log("prepareState:", state);
  //   return state;
  // },
  // receiveState: (prevState, nextState) => {
  //   console.log("nextState:", nextState);
  //   return nextState;
  // },
};

const persistConfig = {
  key: "root",
  storage,
};

const isServer: boolean = typeof window === "undefined";

let store: any;

let middlewares = isServer ? [] : [createStateSyncMiddleware(syncConfig)];

function initStore(initialState: any) {
  return configureStore({
    reducer: app_reducer,

    // reducer: isServer
    //   ? app_reducer
    //   : persistReducer(persistConfig, app_reducer),
    preloadedState: initialState,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return [
        ...getDefaultMiddleware({ serializableCheck: false }),
        ...middlewares,
      ];
    },
  });
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (isServer) return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  // console.log("1 useStore store:", { ...store.getState() });
  initStateWithPrevTab(store);
  // console.log("2 useStore store:", { ...store.getState() });
  // initMessageListener(store);

  // let persistor = persistStore(store);
  return { store };
}
