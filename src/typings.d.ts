import { compose } from "redux";
import { MESSAGE_TYPE } from "./store/actions/trade";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export interface IAction {
  type: string
  payload: any
}

/**
 * Trade types and interfaces
 */
export interface ITrade {
  tradeId: number | string
  userId: number | string
  username: string
  avatar: string
  reputation: {
    positive: number
    negative: number
  }
  paymentMethod: string
  amount: number
  statusMessages: boolean
  paidStatus: boolean
  countTrades: number
  hash: string
  startedDate?: Date
}

export interface ITradeState {
  trades: ITrade[]
  loading: boolean
  statusMessages: boolean
  selectedTrade?: ITrade,
  currentPrice?: any
  error?: any
}

/**
 * Chat types and interfaces
 */
export interface IMessage {
  userId: string | number
  tradeId: string | number
  type: MESSAGE_TYPE.BUYER | MESSAGE_TYPE.SELLER
  message: string
  createdAt: Date
}

export interface IChatState {
  messages: IMessage[],
  sellerImage: string
}
