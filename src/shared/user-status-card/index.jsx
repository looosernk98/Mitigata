import React from 'react'
import { BiLinkExternal } from "react-icons/bi";
import { ICONS } from '../../constants/constants'
import './index.scss'


const UserStatusCard = ({
  status
}) => {
  const Icon = ICONS[status?.key]
  return (
    <div className='card-container'>
      <div className='user-status-icon'>{<Icon />}</div>
      <div className="user-info-wrapper">
        <div className="status-text">{status?.title}<BiLinkExternal /></div>
        <h1 className="count">{status?.count}</h1>
      </div>
    </div>
  )
}

export default UserStatusCard