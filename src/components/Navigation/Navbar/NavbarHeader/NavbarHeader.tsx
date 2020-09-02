import React from 'react'
import Avatar from "../../../UI/Avatar/Avatar";
import { ITrade, ITradeState } from "../../../../typings";
import './NavbarHeader.scss'
import Icon from "../../../UI/Icon/Icon";
import { connect, ConnectedProps } from "react-redux";
import { closeSelectedTrade } from "../../../../store/actions/trade";
import { NavLink } from "react-router-dom";

const mapStateToProps = (state: { trade: ITradeState }) => ({
  selectedTrade: state.trade.selectedTrade
})

const mapDispatchToProps = {
  closeSelectedTrade: () => closeSelectedTrade()
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  trade: ITrade
}

const NavbarHeader: React.FC<Props> = props => {
  let classes = ['TradeStatus'];
  const paidClasses = props.trade.paidStatus
    ? [...classes, 'Paid']
    : classes.concat()
  return (
    <div className="NavbarHeader">
      <ul className="left">
        <li>
          <NavLink to={{
            pathname: '/trades'
          }}>
            <Icon
              name={'arrow_back'}
              classes={['Dark']}
              onClick={() => props.closeSelectedTrade()}/>
          </NavLink>
        </li>
      </ul>
      <ul className="right" style={{display: "flex", alignItems: 'center'}}>
        <li>
          <div className={paidClasses.join(' ')}>{props.trade.paidStatus ? 'paid' : 'not paid'}</div>
        </li>
        <li>
          <Avatar
            src={props.trade.avatar}
            size={'small'}/>
        </li>
      </ul>
    </div>
  )
}

export default connector(NavbarHeader)
