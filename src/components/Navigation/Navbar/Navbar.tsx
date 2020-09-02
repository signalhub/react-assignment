import React from 'react'
import './Navbar.scss';
import { ITradeState } from "../../../typings";
import NavbarHeader from "./NavbarHeader/NavbarHeader";
import { connect, ConnectedProps } from "react-redux";
import SideMenu from "../SideMenu/SideMenu";
import Menu from "../../Menu/Menu";
import Logo from "../../UI/Logo/Logo";

const mapStateToProps = (state: {trade : ITradeState}) => ({
  selectedTrade: state.trade.selectedTrade
})
const connector = connect(mapStateToProps, null)
type PropsFromRedux = ConnectedProps<typeof connector>

const Navbar: React.FC<PropsFromRedux | any> = props => {
  const selectedTrade = props.selectedTrade
  const onClickMenu = () => {

  }
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper white">
          <ul className="right hide-on-small-and-down">
            <Menu onClick={() => onClickMenu()}/>
          </ul>
          <Logo />
          {
            selectedTrade
              ? <NavbarHeader
                trade={selectedTrade} />
              : <SideMenu />
          }
        </div>
      </nav>
    </div>
  )
}

export default connector(Navbar)
