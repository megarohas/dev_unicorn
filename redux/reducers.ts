import { combineReducers } from "redux";
import * as types from "./redux_types";
import { withReduxStateSync } from "redux-state-sync";

const configReducer = (state = { items_per_page: 10 }, { type, payload }) => {
  switch (type) {
    case types.SET_CONFIG:
      return { ...state, ...payload };
    default:
      return state;
  }
};

const currentUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.SET_USER:
      return payload;
    case types.DROP_USER:
      return {};
    default:
      return state;
  }
};

const sidebarReducer = (state: boolean = false, { type }) => {
  switch (type) {
    case types.TOGGLE_SIDEBAR:
      return !state;
    default:
      return state;
  }
};

const companiesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.SET_COMPANIES:
      return payload;
    default:
      return state;
  }
};

interface IStore {
  current_user: (state: any, action: { type: string; payload: any }) => any;
  config: (state: any, action: { type: string; payload: any }) => any;
  sidebar: (state: boolean, action: { type: string; payload: any }) => boolean;
  companies: (state: any, action: { type: string; payload: any }) => any;
}

const reducers: IStore = {
  current_user: currentUserReducer,
  sidebar: sidebarReducer,
  config: configReducer,
  companies: companiesReducer,
};

const app_reducer = combineReducers(reducers);

// const rootReducer = (state, action) => {
//   if (action.type === "HYDRATE") {
//     // For me on Nextjs the action type is HYDRATE not RESET_STORE
//     // clear storage as @ghost suggested
//     Object.keys(state).forEach((key) => {
//       state.removeItem(`persist:${key}`);
//     });
//     // now destructor the returned action.payload object and get rig of _persist key
//     state = (({ _persist, ...rest }) => rest)(action.payload);
//   }
//
//   return app_reducer(state, action);
// };

// export default app_reducer;
export default withReduxStateSync(app_reducer);
