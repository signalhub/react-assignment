import React from 'react'
import './Avatar.scss'

type Props = {
  src: string,
  size?: 'small' | 'medium'
  classes?: string[]
}

const Avatar: React.FC<Props> = props => {
  const classes = (props.classes && props.classes.join(' ')) || ''
  const size = props.size || 'small'
  return (
    <div className={`Avatar ${classes} ${size}`}>
      <img src={props.src}
           alt=""
           className="circle responsive-img" />
      {
        props.children
      }
    </div>
  )
}

export default Avatar
