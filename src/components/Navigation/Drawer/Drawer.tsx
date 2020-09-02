import React from 'react'
import Backdrop from "../Backdrop/Backdrop";
import './Drawer.scss'
import Menu from "../../Menu/Menu";

type Props = {
  isOpen: boolean,
  onClose(): void
}

const Drawer: React.FC<Props> = props =>  {
  const cls = ['Drawer']

  if (!props.isOpen) {
    cls.push('close')
  }
  return (
    <>
      <div className={cls.join(' ')}>
        <ul>
          <Menu onClick={() => props.onClose()}/>
        </ul>
      </div>
      {
        props.isOpen
          ? <Backdrop onClick={() => props.onClose()} />
          : null
      }
    </>
  )
}

export default Drawer
