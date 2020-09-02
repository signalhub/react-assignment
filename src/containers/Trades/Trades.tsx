import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import { connect, ConnectedProps } from "react-redux";
import './Trades.scss';
import { ITradeState } from "../../typings";
import TradeList from "../../components/TradeList/TradeList";
import Chat from "../../components/Chat/Chat";
import TradeInfo from "../../components/TradeInfo/TradeInfo";
import { fetchCurrentPrice, selectTrade } from "../../store/actions/trade";
import Loader from "../../components/UI/Loader/Loader";

const mapStateToProps = (state: { trade: ITradeState }) => ({
  trades: state.trade.trades,
  loading: state.trade.loading,
  selectedTrade: state.trade.selectedTrade,
  currentPrice: state.trade.currentPrice,
  statusMessages: state.trade.statusMessages
})

const mapDispatchToProps = {
  fetchCurrentPrice: () => fetchCurrentPrice(),
  fetchTradeById: (id: number | string ) => selectTrade(id)
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type PathParamsType = {
  tradeId: string,
}
type Props = PropsFromRedux & RouteComponentProps<PathParamsType>

const Trades: React.FC<Props> = props => {
  const [visibleInfo, setVisibleInfo] = useState(false)
  const fetchCurrentPrice = props.fetchCurrentPrice
  const selectedTrade = props.selectedTrade
  const tradesLength = props.trades.length
  const tradeId = props.match.params.tradeId
  const fetchTradeById = props.fetchTradeById

  useEffect(() => {
    fetchCurrentPrice()
  }, [fetchCurrentPrice])

  useEffect(() => {
    if (tradesLength && tradeId && !selectedTrade) {
      fetchTradeById(tradeId)
    }
  }, [tradesLength, tradeId, fetchTradeById, selectedTrade])

  let classes = ['row h100 Container']
  const containerClasses = props.selectedTrade
    ? [...classes, 'SelectedTrade']
    : classes.concat()

  classes = ['col xl4 Column Reverse TradeInfo animated fadeInRight']
  const infoClasses = visibleInfo
    ? [...classes, 'Show']
    : classes.concat()

  const renderTrades = () => {
    return (
      <div className={containerClasses.join(' ')}>
        <div className="col s12 m6 xl4 h100 Column TradeList">
          <TradeList
            trades={props.trades}
            loading={props.loading}
          />
        </div>
        <div className="col s12 m6 l8 h100 Chat">
          {
            props.selectedTrade
              ? <Chat
                showInfo={() => setVisibleInfo(true)}
                selectedTrade={props.selectedTrade}
                statusMessages={props.statusMessages}
              />
              : <h5 className="EmptyChatMessage">Choose corresponding trade, please</h5>
          }

        </div>
        {
          props.selectedTrade
            ? <div className={infoClasses.join(' ')}>
              <TradeInfo
                currentPrice={props.currentPrice}
                trade={props.selectedTrade}
                onClose={() => setVisibleInfo(false)}
              />
            </div>
            : null
        }
      </div>
    )
  }

  return (
    <div className="WrapperContainer">
      {
        props.loading
        ?  <Loader />
        : renderTrades()
      }
    </div>
  )
}

export default connector(withRouter(Trades))
