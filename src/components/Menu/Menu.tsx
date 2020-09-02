import React from 'react'
import { NavLink } from "react-router-dom";
import { closeSelectedTrade } from "../../store/actions/trade";
import { connect, ConnectedProps } from "react-redux";
import { MenuItems } from "../../config";
import './Menu.scss'

const mapDispatchToProps = {
  closeSelectedTrade: ()=> closeSelectedTrade()
}
const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  onClick(): void
}

const Menu: React.FC<Props> = props => {
  const links: typeof MenuItems = MenuItems
  const onCloseHandler = () => {
    props.closeSelectedTrade()
    props.onClick()
  }
  return (
    <>
      {
        links.map((link, index) => {
          return (
            <li key={index}>
              <NavLink
                to={link.to}
                exact={link.exact}
                activeClassName={'Active'}
                onClick={() => onCloseHandler()}
              >
                {link.label}
              </NavLink>
            </li>
          )
        })
      }
    </>
  )
}

export default connector(Menu)
