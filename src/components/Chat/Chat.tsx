import React, { useEffect, useRef, useState } from 'react'
import ChatHeader from "./ChatHeader/ChatHeader";
import { IChatState, IMessage, ITrade, ITradeState } from "../../typings";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";
import { connect, ConnectedProps } from "react-redux";
import { clearChatHistory, fetchMessages, MESSAGE_TYPE, postMessage } from "../../store/actions/chat";
import { updateStatusMessages } from "../../store/actions/trade";
import './Chat.scss'
import Switcher from "../UI/Switcher/Switcher";

const mapStateToProps = (state: { chat: IChatState } & { trade: ITradeState }) => ({
  messages: state.chat.messages,
  sellerImage: state.chat.sellerImage,
  loading: state.trade.loading
})

const mapDispatchToProps = {
  fetchMessages: () => fetchMessages(),
  postMessage: (message: IMessage) => postMessage(message),
  updateStatusMessages: (value: boolean) => updateStatusMessages(value),
  clearChatHistory: (id: number | string) => clearChatHistory(id)
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  selectedTrade: ITrade,
  statusMessages: boolean,
  showInfo(): void
}

const Chat: React.FC<Props> = (props: Props) => {
  const [autoScroll, setAutoScroll] = useState(false)
  const [type, setType] = useState(MESSAGE_TYPE.SELLER);
  const fetchMessages = props.fetchMessages
  const updateStatusMessages = props.updateStatusMessages
  const tradeStatusMessages = props.selectedTrade.statusMessages
  const statusMessages = props.statusMessages
  const tradeId = props.selectedTrade.tradeId
  const messages = props.messages
  const refContainer = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    fetchMessages()
  }, [tradeId, fetchMessages])

  useEffect(() => {
    if (tradeStatusMessages && !statusMessages) {
      setAutoScroll(false)
      updateStatusMessages(true)
    }
  }, [updateStatusMessages, tradeStatusMessages, statusMessages])

  useEffect(() => {
    const update = () => {
      const updateScroll = () => {
        const element = refContainer.current!
        element && autoScroll
          ? element.scrollTop = element.scrollHeight
          : tradeStatusMessages
          ? element.scrollTop = 0
          : element.scrollTop = element.scrollHeight
      }
      if (getScrollElement()) {
        updateScroll()
      } else if (tradeStatusMessages && statusMessages && type !== MESSAGE_TYPE.BUYER) {
        updateStatusMessages(false)
      }
    }
    setTimeout(() => {
      update()
    })
  }, [tradeId, tradeStatusMessages, statusMessages, updateStatusMessages, autoScroll, messages, type])

  const sendMessage = (message: string) => {
    props.postMessage({
      message,
      type,
      createdAt: new Date(),
      userId: props.selectedTrade.userId,
      tradeId: props.selectedTrade.tradeId
    })
    if (!autoScroll) {
      setAutoScroll(true)
    }

    if (type === MESSAGE_TYPE.SELLER && tradeStatusMessages) {
      updateStatusMessages(false)
    }

    if (type === MESSAGE_TYPE.BUYER && !tradeStatusMessages) {
      updateStatusMessages(true)
    }
  }

  const getScrollElement = () => {
    return refContainer.current!
      && refContainer.current!.clientHeight < refContainer.current!.scrollHeight
  }

  const getEndOfScrolling = () => {
    return refContainer.current!
      && refContainer.current!.scrollHeight - refContainer.current!.scrollTop <= refContainer.current!.clientHeight + 1
  }

  const onScrollHandler = () => {
    if (!tradeStatusMessages || autoScroll) {
      return
    }
    if (getEndOfScrolling() && tradeStatusMessages) {
      updateStatusMessages(false)
    }
  }

  const onChangeType = (value: boolean) => {
    const type: string = value ? MESSAGE_TYPE.BUYER : MESSAGE_TYPE.SELLER
    setType(type)
    if (type === MESSAGE_TYPE.SELLER && tradeStatusMessages) {
      updateStatusMessages(false)
    }
    if (type === MESSAGE_TYPE.BUYER) {
      setAutoScroll(false)
    }
  }

  const onClearChatHistoryHandler = (id: number | string) => {
    if (!props.messages.length) {
      return
    }
    props.clearChatHistory(id)
    if (tradeStatusMessages) {
      updateStatusMessages(false)
    }
  }

  return (
    <>
      <ChatHeader
        selectedTrade={props.selectedTrade}
        clearChatHistory={(id: number | string) => onClearChatHistoryHandler(id)}
        showInfo={() => props.showInfo()}
      />
      <Switcher
        type={type}
        sellerImage={props.sellerImage}
        buyerImage={props.selectedTrade.avatar}
        onChangeType={(value: boolean) => onChangeType(value)}/>
      <div className="wrapper-messages"
           ref={refContainer}
           onScroll={() => onScrollHandler()}>
        {
          <ChatMessages
            sellerImage={props.sellerImage}
            buyerImage={props.selectedTrade.avatar}
            messages={props.messages}
          />
        }
      </div>

      <ChatInput
        sendMessage={(message: string) => sendMessage(message)}
      />
    </>
  )
}

export default connector(Chat)
