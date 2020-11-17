import React from 'react'
import './State-PageCss.css'

function State_Page(props){
  const STATENAME = props.sName
  return(
    <div id="StatePage-container">
      <div className="a-api_feed_title">PUBLIC COMMENT</div>
      <div className="a-api_feed_container"></div>
      <div className="a-state_name_container"><h2>{STATENAME}</h2></div>
      <div className="a-state_info_container"></div>
    </div>

  )
}

export default State_Page