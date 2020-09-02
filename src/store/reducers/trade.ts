import { IAction, ITradeState } from "../../typings";
import {
  CATCH_ERROR,
  CLOSE_SELECTED_TRADE, FETCH_CURRENT_PRICE,
  FETCH_TRADE_SUCCESS,
  FETCH_TRADES_SUCCESS,
  READ_MESSAGES, SHOW_LOADER,
  UNREAD_MESSAGES,
} from "../actions/actionTypes";

const initialState: ITradeState = {
  trades: [],
  loading: true,
  selectedTrade: undefined,
  statusMessages: false,
  currentPrice: undefined,
  error: null
}

/**
 * Trade reducer
 * @param state
 * @param action
 * @returns {{trades: any, loading: boolean, selectedTrade: ITrade | null, unreadStatus: boolean} | ITradeState | {trades: ITrade[], loading: boolean, selectedTrade: any, unreadStatus: boolean, unreadStatus: boolean} | {trades: ITrade[], loading: boolean, selectedTrade: any, unreadStatus: boolean, unreadStatus: boolean} | {trades: ITrade[], loading: boolean, selectedTrade: any, unreadStatus: boolean, unreadStatus: boolean}}
 */
export const tradeReducer = (state: ITradeState = initialState, action: IAction): ITradeState => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        loading: true,
        error: null
      }
    case CATCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case FETCH_CURRENT_PRICE:
      return {
        ...state,
        currentPrice: action.payload,
        loading: false
      }
    case FETCH_TRADES_SUCCESS:
      return {
        ...state,
        trades: action.payload,
        loading: false
      }
    case FETCH_TRADE_SUCCESS:
      return {
        ...state,
        selectedTrade: action.payload,
        statusMessages: false,
        loading: false
      }
    case CLOSE_SELECTED_TRADE:
      return {
        ...state,
        selectedTrade: undefined,
        statusMessages: false
      }
    case READ_MESSAGES:
      return {
        ...state,
        selectedTrade: action.payload,
        statusMessages:  action.payload.statusMessages,
      }
    case UNREAD_MESSAGES:
      return {
        ...state,
        selectedTrade: action.payload,
        statusMessages: action.payload.statusMessages
      }
    default:
      return state;
  }
}
