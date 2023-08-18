import { createStore, combineReducers, applyMiddleware } from "redux"
import CountrySlice from "./features/countrySlice/CountrySlice"
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension"

const rootReducer = combineReducers({
  country: CountrySlice,

})

// const persistedState = JSON.parse(localStorage.getItem('reduxState')) || {};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store