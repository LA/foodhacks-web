import { ACTIONS } from "./actionTypes";
import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import rootSaga from "./sagas";

const initialState = {
  donations: [],
  token: "",
  loading: false,
  accountType: ""
};

const reducer = function(state = initialState, action: any) {
  switch (action.type) {
    case ACTIONS.CORE.FINISH: {
      return {
        ...state,
        token: action.payload
      };
    }
    case ACTIONS.ADD_DONATION: {
      return {
        ...state,
        donations: [...state.donations, action.payload],
      }
    }
    case ACTIONS.FETCH_DONATIONS.SUCCESS: {
      return {
        ...state,
        donations: action.payload
      };
    }
    case ACTIONS.UPDATE_ACCOUNT_TYPE: {
      return {
        ...state,
        accountType: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

console.log("Running Saga Middleware");

export default store;
