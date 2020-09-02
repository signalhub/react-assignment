import React from 'react'
import './TradeItem.scss';
import { ITrade, ITradeState } from "../../../typings";
import { selectTrade } from "../../../store/actions/trade";
import { connect, ConnectedProps } from "react-redux";
import Avatar from "../../UI/Avatar/Avatar";
import { NavLink } from "react-router-dom";
import { getAmountValue } from "../../../utils";

const mapStateToProps = (state: { trade: ITradeState }) => ({
  selectedTrade: state.trade.selectedTrade,
  statusMessages: state.trade.statusMessages,
  currentPrice: state.trade.currentPrice
})

const mapDispatchToProps = {
  selectTrade: (id: number | string) => selectTrade(id)
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  trade: ITrade
}

const TradeItem: React.FC<Props> = props => {
  const trade = props.trade
  const currentTrade = props.selectedTrade && props.selectedTrade!.tradeId === trade.tradeId

  let classes = ['card-panel', 'lighten-5', 'z-depth-1', 'Trade']
  const tradeClasses = currentTrade
    ? [...classes, 'Active']
    : classes.concat()

  classes = ['Status']
  const statusClasses = trade.statusMessages || (currentTrade && props.statusMessages)
    ? [...classes, 'Unread']
    : classes.concat()

  classes = ['TradeStatus'];
  const paidClasses = trade.paidStatus
    ? [...classes, 'Paid']
    : classes.concat()

  const onSelectTradeHandler = () => {
    if (props.selectedTrade &&
      props.selectedTrade.tradeId === props.trade.tradeId) {
      return
    }
    props.selectTrade(props.trade.tradeId)
  }

  const getAmount = (value: number) => {
    const rate: number = props.currentPrice.rate_float
    return `${value} USD (${getAmountValue(value, rate)} BTC)`
  }

  return (
    <>
      <NavLink
        to={{
          pathname: '/trades/' + props.trade.tradeId,
        }}
      >
        <div className={tradeClasses.join(' ')}
             onClick={() => onSelectTradeHandler()}>
            <div className="valign-wrapper">
              <div className="col s10 DialogInfo">
                <div className={statusClasses.join(' ')}/>
                <div className="State">
                  <div className="Process">{trade.username} is buying</div>
                  <div className="PaymentMethod">{trade.paymentMethod}</div>
                  <div className="Amount">{getAmount(trade.amount)}</div>
                </div>
              </div>
              <Avatar
                src={trade.avatar} classes={['col', 's2']}>
                <div className={paidClasses.join(' ')}>{trade.paidStatus ? 'paid' : 'not paid'}</div>
              </Avatar>
            </div>
        </div>
      </NavLink>
    </>
  )
}

export default connector(TradeItem)
