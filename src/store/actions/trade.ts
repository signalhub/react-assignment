import axios from '../../axios/axios-price'
import {
  CATCH_ERROR,
  CLOSE_SELECTED_TRADE, FETCH_CURRENT_PRICE,
  FETCH_TRADE_SUCCESS,
  FETCH_TRADES_SUCCESS,
  READ_MESSAGES, SHOW_LOADER, UNREAD_MESSAGES
} from "./actionTypes";
import { IAction, ITrade, ITradeState } from "../../typings";
import testData from '../data.json'


export const fetchCurrentPrice = () => {
  return async (dispatch: any) => {
    try {
      const response: any =  await axios.get('/USD.json')
      const currentPrice = response.data.bpi.USD
      dispatch(fetchCurrentPriceSuccess(currentPrice))
    } catch (e) {
      console.error(e)
      dispatch(catchError(e))
    }
    dispatch(fetchTrades())
  }
}

const fetchCurrentPriceSuccess = (currentPrice: any) => {
  return {
    type: FETCH_CURRENT_PRICE,
    payload: currentPrice
  }
}

export const fetchTrades = () => {
  return async (dispatch: any, getState: any) => {
    dispatch(showLoader())
    const state = getState()
    let trades = testData
    const storage = localStorage.getItem('messages')
    if (state.selectedTrade || !storage) {
      dispatch(fetchTradesSuccess(trades))
      return
    }
    const messages = JSON.parse(storage)
    trades = trades.map((trade) => {
      const statusMessages = !!messages[trade.tradeId] && !!messages[trade.tradeId].length
      return {
        ...trade,
        statusMessages,
        startedDate: !!messages[trade.tradeId] && messages[trade.tradeId].length && messages[trade.tradeId][0].createdAt
      }
    })
    dispatch(fetchTradesSuccess(trades))
  }
}

const fetchTradesSuccess = (trades: any): IAction => {
  return {
    type: FETCH_TRADES_SUCCESS,
    payload: trades
  }
}

export const selectTrade = (tradeId: number | string | undefined) => {
  return async (dispatch: any, getState: any) => {
    const trades = getState().trade.trades
    const trade = trades.find((item: any) => item.tradeId === Number(tradeId))
    dispatch(fetchTradeSuccess(trade))
  }
}

const fetchTradeSuccess = (trade: any): IAction => {
  return {
    type: FETCH_TRADE_SUCCESS,
    payload: trade
  }
}

export const updateStatusMessages = (value: boolean) => {
  return (dispatch: any, getState: any) => {
    const state: { trade: ITradeState } = getState()
    const selectedTrade = state && state.trade.selectedTrade
    if (!selectedTrade) {
      return
    }
    selectedTrade!.statusMessages = value
    dispatch(updateStatusMessagesSuccess(selectedTrade))
  }
}

const updateStatusMessagesSuccess = (selectedTrade: ITrade): IAction => {
  return {
    type: selectedTrade.statusMessages ? UNREAD_MESSAGES : READ_MESSAGES,
    payload: selectedTrade
  }
}

export const closeSelectedTrade = () => {
  return {
    type: CLOSE_SELECTED_TRADE
  }
}

const showLoader = () => {
  return {
    type: SHOW_LOADER
  }
}

const catchError = (e: any) => {
  return {
    type: CATCH_ERROR,
    payload: e
  }
}


