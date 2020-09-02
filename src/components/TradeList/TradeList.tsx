import React from 'react'
import TradeItem from './TradeItem/TradeItem';
import { ITrade } from "../../typings";

interface ITradeList {
  trades: ITrade[]
  loading: boolean
}

const TradeList: React.FC<ITradeList> = props => {
  return (
    <>
      {
        props.trades.map((trade: any, index: number) => {
          return (
            <TradeItem
              key={index}
              trade={trade}
            />
          )
        })
      }
    </>
  )
}

export default TradeList
