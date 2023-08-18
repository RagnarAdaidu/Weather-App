import { createStore, combineReducers, applyMiddleware } from "redux";
import CountrySlice from "./features/countrySlice/CountrySlice";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
// import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  country: CountrySlice,
});

const persistConfig = {
  key: "root", // Key for the root of your reducer state
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export { store, persistor };
