import React from 'react'
import { ITrade } from "../../../typings"
import './ChatHeader.scss'
import Icon from "../../UI/Icon/Icon";

type Props = {
  selectedTrade: ITrade,
  clearChatHistory(id: number | string): void,
  showInfo(): void
}

const ChatHeader: React.FC<Props> = (props: Props) => {
  const onClearHandler = () => {
    props.clearChatHistory(props.selectedTrade.tradeId)
  }

  return (
    <>
      <div className="WrapperHeader">
        <div className="col s3">
          <i className="Icon Delete Pointer material-icons" onClick={() => onClearHandler()}>delete</i>
        </div>
        <div className="col s6">
          <div className="Header">
            <div className='Method'>{props.selectedTrade.paymentMethod}</div>
            <span className="Reputation">
              <span>{props.selectedTrade.username}&nbsp;</span>
              <span className="Positive">{props.selectedTrade.reputation.positive}</span>
              <span>&nbsp;/&nbsp;</span>
              <span className="Negative">{props.selectedTrade.reputation.negative}</span>
            </span>
          </div>
        </div>
        <div className="col s3 IconRelease" style={{ textAlign: 'right'}}>
          <Icon
            classes={['Active']}
            name={'power_settings_new'}
            onClick={() => props.showInfo()}
          />
        </div>
      </div>
      <div className="Divider divider"/>
    </>
  )
}

export default ChatHeader
