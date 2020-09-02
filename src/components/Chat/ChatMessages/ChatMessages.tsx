import React from 'react'
import { IMessage } from "../../../typings";
import './ChatMessages.scss';
import { MESSAGE_TYPE } from "../../../store/actions/chat";
import Avatar from "../../UI/Avatar/Avatar";

type IMessagesProps = {
  messages: IMessage[],
  sellerImage: string
  buyerImage: string
}

const ChatMessages: React.FC<IMessagesProps> = props => {
  const renderMessage = (message: IMessage) => {
    return (
      message.type === MESSAGE_TYPE.BUYER ?
        <>
          <div className="col s10 animated fadeIn">
            <div className={`Message Bubble Right Message__${message.type}`}>{message.message}</div>
            <div className={`Date Date__${message.type} `}>{new Date(message.createdAt).toLocaleTimeString()}</div>
          </div>
          <Avatar
            src={props.buyerImage}
            classes={['col', 's2']}
          />
        </>
        :
        <>
          <Avatar
            src={props.sellerImage}
            classes={['col', 's2']}
          />
          <div className="col s10 animated fadeIn">
            <div className={`Message Bubble Left Message__${message.type}`}>{message.message}</div>
            <div className={`Date Date__${message.type} `}>{new Date(message.createdAt).toLocaleTimeString()}</div>
          </div>
        </>
    )
  }

  return (
    <>
      {
        props.messages.map((message: IMessage, index: number) => {
          return (
            <div key={index} className="ItemMessage">
              <div className="valign-wrapper">
                {renderMessage(message)}
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default ChatMessages
