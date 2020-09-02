import { IAction, IMessage, ITradeState } from "../../typings";
import { CLEAR_MESSAGES_SUCCESS, FETCH_MESSAGES_SUCCESS, POST_MESSAGE_SUCCESS } from "./actionTypes";

export const MESSAGE_TYPE = {
  BUYER: 'buyer',
  SELLER: 'seller'
}

export const fetchMessages = () => {
  return async (dispatch: any, getState: any) => {
    const state: { trade: ITradeState } = getState()
    const selectedTrade = state && state.trade.selectedTrade
    if (!selectedTrade) {
      return
    }
    const tradeId = selectedTrade.tradeId
    const storage = localStorage.getItem('messages')
    const messages: { [key: string]: IMessage[] } = (storage && JSON.parse(storage)) || {}
    const result = messages[tradeId] || []
    dispatch(fetchMessagesSuccess(result))
  }
}

export const postMessage = (message: IMessage) => {
  return async (dispatch: any) => {
    const storage = localStorage.getItem('messages')
    if (!storage) {
      const messages = { [message.tradeId]: [message] }
      localStorage.setItem('messages', JSON.stringify(messages))
      dispatch(postMessageSuccess(message))
      return
    }
    const messages = JSON.parse(storage)
    if (!messages.hasOwnProperty(message.tradeId)) {
      messages[message.tradeId] = []
    }
    messages[message.tradeId].push(message)
    localStorage.setItem('messages', JSON.stringify(messages))
    dispatch(postMessageSuccess(message))
  }
}

const postMessageSuccess = (message: IMessage): IAction => {
  return {
    type: POST_MESSAGE_SUCCESS,
    payload: message
  }
}

const fetchMessagesSuccess = (messages: IMessage[]): IAction => {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: messages
  }
}

export const clearChatHistory = (tradeId: number | string) => {
  return async (dispatch: any) => {
    const storage = localStorage.getItem('messages')
    if (!storage) {
      return
    }
    const messages = JSON.parse(storage)
    if (messages.hasOwnProperty(tradeId)) {
      messages[tradeId] = []
      localStorage.setItem('messages', JSON.stringify(messages))
    }
    dispatch(clearChatHistorySuccess())
  }
}

const clearChatHistorySuccess = () => {
  return {
    type: CLEAR_MESSAGES_SUCCESS
  }
}

