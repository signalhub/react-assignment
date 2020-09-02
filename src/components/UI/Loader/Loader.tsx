import React from 'react'
import './Loader.scss'

const Loader = () => {
  return (
    <div className="Loader">
      <div className="preloader-wrapper small active">
        <div className="spinner-layer">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
