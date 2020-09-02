import { combineReducers } from "redux";
import { tradeReducer } from './trade'
import { chatReducer } from "./chat";

export default combineReducers({
  trade: tradeReducer,
  chat: chatReducer
})
