import React from 'react'
import { ITrade } from "../../typings"
import './TradeInfo.scss'
import Avatar from "../UI/Avatar/Avatar";
import Icon from "../UI/Icon/Icon";
import { getAmountValue } from "../../utils";

type Props = {
  trade: ITrade,
  onClose(): void,
  currentPrice: any
}

const TradeInfo: React.FC<Props> = props => {
  const getLastTimeValue = (startTime: Date) => {
    const startStamp = new Date(startTime).getTime();
    const current = new Date().getTime();

    let diff = Math.round((current - startStamp) / 1000);
    const d = Math.floor(diff / (24 * 60 * 60));
    diff = diff - (d * 24 * 60 * 60);
    const h = Math.floor(diff / (60 * 60));
    diff = diff - (h * 60 * 60);
    const m = Math.floor(diff / (60));
    diff = diff - (m * 60);
    const s = diff;
    return (d ? d + 'day(s), ' : '')
      + (h ? h + ' hour(s), ' : '')
      + (m ? m + ' minute(s), ' : '')
      + (s ? s + 'second(s)' : '') + ' ago';
  }

  const getAmount = (value: number) => {
    const rate: number = props.currentPrice.rate_float
    return getAmountValue(value, rate)
  }

  return (
    <>
      <div className="IconClose">
        <Icon
          classes={['Dark', 'TopLeft']}
          onClick={() => props.onClose()}
          name={'close'}
        />
      </div>
      <div className="Info center">
        <div className="UserName">Your are trading with <span style={{fontWeight: 700}}>{props.trade.username}</span>
        </div>
        <div className="Date">
          {
            props.trade.startedDate
              ? `Started ${getLastTimeValue(props.trade.startedDate)}`
              : `Not started yet`
          }
        </div>
        <button className={`Button ${props.trade.paidStatus ? 'Pointer' : 'Disabled'}`}>Release bitcoins</button>
        <div className="Details">
          <div className="row Item">
            <div className="col s6">
              <div className="ItemName">
                <Avatar
                  src={props.trade.avatar}
                  classes={['Outline']}
                />
              </div>
              <div className="ItemValue">
                <span className="Reputation">
                  <span className="Positive">{props.trade.reputation.positive}</span>
                  <span>&nbsp;/&nbsp;</span>
                  <span className="Negative">{props.trade.reputation.negative}</span>
                </span>
              </div>
            </div>
            <div className="col s6">
              <div className="ItemName"># of trades</div>
              <div className="ItemName">{props.trade.countTrades}</div>
            </div>
          </div>
          <div className="row Item">
            <div className="col s6">
              <div className="ItemName">Trade status</div>
              <div
                className={`ItemValue TradeStatus ${props.trade.paidStatus ? 'Paid' : ''}`}>
                {props.trade.paidStatus ? 'paid' : 'not paid'}
              </div>
            </div>
            <div className="col s6">
              <div className="ItemName">Trade hash</div>
              <div className="ItemValue Grey">{props.trade.hash}</div>
            </div>
          </div>
          <div className="row Item">
            <div className="col s6">
              <div className="ItemName">Amount USD</div>
              <div className="ItemValue Grey">{props.trade.amount}</div>
            </div>
            <div className="col s6">
              <div className="ItemName">Amount BTC</div>
              <div className="ItemValue Grey">{getAmount(props.trade.amount)} BTC</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TradeInfo
