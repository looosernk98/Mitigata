import React from 'react'
import { Tooltip, Popconfirm, Space } from 'antd';
import { MdBlock } from "react-icons/md"; // block
import { IoMdInformationCircleOutline } from "react-icons/io"; // inactive
import { TiTick } from "react-icons/ti"; // active

const TableAction = ({record, updateStatus}) => {
  const isUserAlreadyBlocked = record?.about?.status === 'BLOCKED'
  const isUserAlreadyInvited = record?.about?.status === 'INVITED'
  const isUserAlreadyActive = record?.about?.status === 'ACTIVE'
  return (
    <Space size="middle">
      <Tooltip placement="bottom" title={isUserAlreadyBlocked ? 'User is already blocked': 'Block the user'}>
        <Popconfirm
          title="Block the user"
          description="Are you sure to block this user?"
          onConfirm={() => {
            if(isUserAlreadyBlocked) return;
            updateStatus(record, 'BLOCKED')
          }}
          onCancel={() => { }}
          okText="Yes"
          cancelText="No"
        >
          <div style={{cursor: isUserAlreadyBlocked ? 'not-allowed': 'pointer'}} className='action-icon block'><MdBlock /></div>
        </Popconfirm>
      </Tooltip>
      <Tooltip placement="bottom" title={isUserAlreadyActive? 'User is already active': 'Mark user active'}>
        <Popconfirm
          title="Mark user active"
          description="Are you sure to mark this user active?"
          onConfirm={() => {
            if(isUserAlreadyActive) return;
            updateStatus(record, 'ACTIVE')
          }}
          onCancel={() => { }}
          okText="Yes"
          cancelText="No"
        >
          <div style={{cursor: isUserAlreadyActive ? 'not-allowed': 'pointer'}} className='action-icon active'><TiTick /></div>
        </Popconfirm>
      </Tooltip>
      <Tooltip placement="bottom" title={isUserAlreadyInvited? 'User is already invited': 'Mark user inactive / invite'}>
        <Popconfirm
          title="Mark user inactive"
          description="Are you sure to mark this user inactive?"
          onConfirm={() => {
            if(isUserAlreadyInvited) return;
            updateStatus(record, 'INVITED')
          }}
          onCancel={() => { }}
          okText="Yes"
          cancelText="No"
        >
          <div style={{cursor: isUserAlreadyInvited ? 'not-allowed': 'pointer'}} className='action-icon inactive'><IoMdInformationCircleOutline /></div>
        </Popconfirm>
      </Tooltip>
    </Space>
  )
}

export default TableAction