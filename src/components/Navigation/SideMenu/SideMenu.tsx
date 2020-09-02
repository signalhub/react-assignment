import React, { useState } from 'react'
import Icon from "../../UI/Icon/Icon";
import Drawer from "../Drawer/Drawer";

const SideMenu: React.FC = () => {
  const [isOpen, triggerMenu] = useState(false)
  return (
    <div className="NavbarHeader">
      <ul className="left">
        <li>
          <Icon
            name={'menu'}
            classes={['Dark']}
            onClick={() => triggerMenu(!isOpen)} />
        </li>
      </ul>
      <Drawer
        isOpen={isOpen}
        onClose={() => triggerMenu(!isOpen)}
      />
    </div>
  )
}

export default SideMenu
