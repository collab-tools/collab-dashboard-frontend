import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const enhancers = [];
const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware), ...enhancers);

export default () => {
  const store = createStore(persistedReducer, enhancer);
  return { store, persistor: persistStore(store) };
};
