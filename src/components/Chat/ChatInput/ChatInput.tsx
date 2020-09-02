import React, { useState } from 'react'
import './ChatInput.scss';

interface IInputMessage {
  sendMessage(message: string): void
}

const ChatInput: React.FC<IInputMessage> = (props: IInputMessage) => {
  const [value, setValue] = useState('');

  const submitHandler = (event: MouseEvent | any) => {
    event.preventDefault();
    if (!value) {
      return
    }
    props.sendMessage(value)
    setValue('')
  }

  return (
    <div className="wrapper-form">
      <form
        onSubmit={submitHandler}
        className="form-container">
        <div className="form-group">
          <input
            type="text"
            className="form-control col s8"
            placeholder="Type your message..."
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <i className="material-icons right col s2 Send IconSend Pointer"
             onClick={event => submitHandler(event)}>send</i>
          <span className="right col s2 Send Text TextSend Pointer"
                onClick={event => submitHandler(event)}>send</span>

        </div>
      </form>
    </div>
  )
}

export default ChatInput
