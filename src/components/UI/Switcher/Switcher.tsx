import React from 'react'
import './Switcher.scss'

type Props = {
  type: string,
  sellerImage: string,
  buyerImage: string,
  onChangeType(value: boolean): void
}

const Switcher: React.FC<Props> = props => {
  return (
    <>
      <div className="switch">
        <span className="Avatar col s2">
          <img src={props.sellerImage}
               alt=""
               className="circle responsive-img" />
        </span>
        <label>
          <span>
            <span>Seller</span>
          </span>
          <input
            type="checkbox"
            onChange={event => props.onChangeType(event.target.checked)}/>
          <span className="lever" />
          <span style={{color: '#395e84', fontWeight: 700}}>
            <span>Buyer</span>
          </span>
        </label>
        <span className="Avatar col s2">
          <img src={props.buyerImage}
               alt=""
               className="circle responsive-img" />
        </span>
      </div>
      <div className="Divider divider" />
    </>
  )
}

export default Switcher
