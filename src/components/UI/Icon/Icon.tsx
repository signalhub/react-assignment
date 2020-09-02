import React from 'react'
import './Icon.scss'

type Props = {
  name: string,
  onClick(): void,
  classes?: string[]
}

const Icon: React.FC<Props> = props => {
  const classes = (props.classes && props.classes.join(' ')) || ''
  return (
    <>
      <i className={`Icon Pointer material-icons ${classes}`}
         onClick={() => props.onClick()}>{props.name}</i>
    </>
  )
}

export default Icon
