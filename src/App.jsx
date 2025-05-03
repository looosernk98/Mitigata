import React from 'react';
import { Space, Table, Button, Dropdown, DatePicker, Input } from 'antd';
import { BsSortUp } from "react-icons/bs";
import { BsSortDown } from "react-icons/bs";
import { DATA } from './constants/data'
import UserStatusCard from './shared/user-status-card';
import { useState } from 'react';
import { useEffect } from 'react';
import { ACTIVE, ASC_ORDER, BLOCKED, DESC_ORDER, INVITED, TOTAL, USER_STATUS_DETAILS } from './constants/constants';
import { calculateUserStatusPercentage, formatDate, getChipLabel, sortUserData } from './utils/utils';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Chip from './shared/chip'
import TableAction from './shared/table-action';
import { isEmpty } from 'lodash'
import './App.scss'

const { RangePicker } = DatePicker;
const { Search } = Input;

const STATUS_FILTER_OPTIONS = [
  {
    label: 'Active',
    key: ACTIVE,
    icon: <UserOutlined />,
  },
  {
    label: 'Blocked',
    key: BLOCKED,
    icon: <UserOutlined />,
  },
  {
    label: 'Inactive',
    key: INVITED,
    icon: <UserOutlined />,
  },

];
const App = () => {
  const [userStatusList, setUserStatusList] = useState(USER_STATUS_DETAILS)
  const [userData, setUserData] = useState(DATA)
  const [appliedFilters, setAppliedFilters] = useState({})
  const [sorting, setSorting] = useState({})
  const [searchInput, setSearchInput] = useState('');
  const [dateInput, setDateInput] = useState();

  const applySorting = (key, order) => {
    if (Object.keys(sorting)?.includes(key) && sorting[key] === order) {
      const sortConfig = { ...sorting };
      delete sortConfig[key]
      setSorting(sortConfig)
      return;
    }
    setSorting({ ...sorting, [key]: order })
  }

  const renderColumnName = (colName, sortKey) => (
    <div className='column-name'>
      <span>{colName}</span>
      <BsSortUp className={sorting[sortKey] === ASC_ORDER ? 'sort-asc' : ''} onClick={() => applySorting(sortKey, ASC_ORDER)} />
      <BsSortDown className={sorting[sortKey] === DESC_ORDER ? 'sort-desc' : ''} onClick={() => applySorting(sortKey, DESC_ORDER)} />
    </div>
  )

  const updateStatus = (record, updatedStatus) => {
    const updatedUserList = [...userData];
    const user = updatedUserList?.find(user => user?.id === record?.id)
    user.about.status = updatedStatus;
    setUserData(updatedUserList)
  }

  const columns = [
    {
      title: renderColumnName('Name', 'name'),
      dataIndex: 'name',
      key: 'name',
      render: (_, row) => <span className='name-col'>{row?.about?.name}</span>,
    },
    {
      title: renderColumnName('Email', 'email'),
      dataIndex: 'email',
      key: 'email',
      render: (_, row) => row?.about?.email,
    },
    {
      title: renderColumnName('Start Date', 'date'),
      dataIndex: 'date',
      key: 'date',
      render: (_, row) => formatDate(new Date(row?.details?.date)),
    },
    {
      title: renderColumnName('Invited by', 'invited_by'),
      dataIndex: 'invited_by',
      key: 'invited_by',
      render: (_, row) => row?.details?.invitedBy,
    },
    {
      title: renderColumnName('Status', 'status'),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Button size='large' style={{ width: 100, cursor: 'initial' }} className={`status-${record?.about.status.toLowerCase()}`} color="default" variant="outlined">
          {record?.about.status.toLowerCase()}
        </Button>
      ),

    },
    {
      title: <span className='column-name'>Action</span>,
      key: 'action',
      render: (_, record) => (
        <TableAction record={record} updateStatus={updateStatus} />
      ),
    },
  ];

  useEffect(() => {
    if (!sorting || isEmpty(sorting)) {
      setAppliedFilters({ ...appliedFilters })
      return;
    };
    const sortedData = sortUserData(userData, sorting)
    setUserData(sortedData)
  }, [sorting])

  useEffect(() => {
    if (!appliedFilters || isEmpty(appliedFilters) || Object.values(appliedFilters).join('').length == 0) {
      setUserData(DATA);
      return;
    }

    const filteredData = DATA.filter((item) => {
      let isValidItem = true;
      Object.entries(appliedFilters).map(([key, value]) => {
        if (key === 'status' && item?.about?.status !== value) {
          isValidItem = false;
        }
        if (key === 'search_query' && !item?.about?.name?.toLowerCase()?.includes(value.toLowerCase())) {

          isValidItem = false;
        }
        let [start, end] = value?.split('@')
        start = new Date(start)
        end = new Date(end)
        const date = new Date(item?.details?.date)
        if (key === 'date' && !(date.getTime() >= start?.getTime() && date?.getTime() <= end?.getTime())) {
          isValidItem = false;
        }
      })

      return isValidItem;
    })
    setUserData(filteredData)

  }, [appliedFilters])

  useEffect(() => {
    const copiedUserStatusList = [...userStatusList]
    copiedUserStatusList.forEach((item) => {
      if (item.key === TOTAL) {
        item.count = userData?.length ?? 0;
      }
      if (item.key === ACTIVE) {
        item.count = userData?.filter(user => user?.about?.status === ACTIVE).length;
      }
      if (item.key === INVITED || item.key === BLOCKED) {
        item.count = calculateUserStatusPercentage(userData, item?.key)
      }
    })
    setUserStatusList(copiedUserStatusList)
  }, [userData])

  const applyFilter = (key) => (filter) => {
    let value = filter?.key ?? filter
    if (key === 'date') {
      setDateInput(value)
      const start = filter[0]?.$d
      const end = filter[1]?.$d
      value = start + "@" + end;
    }
    setAppliedFilters({ ...appliedFilters, [key]: value })
  }

  const removeFilter = (key) => {
    const copiedFilters = { ...appliedFilters }
    delete copiedFilters[key]
    setAppliedFilters(copiedFilters)
    setDateInput(null)
  };

  const handleClearFilter = (key) => {
    if (key === 'ALL') {
      setAppliedFilters({})
      return;
    }
    removeFilter(key);
    setSearchInput('')
  }

  const menuProps = {
    items: STATUS_FILTER_OPTIONS,
    onClick: applyFilter('status'),
  };

  return (
    <main>
      <section className='top-section'>
        <h2>User Details</h2>
        <Button size='large' color="default" variant="solid"> Download Report</Button>
      </section>
      <p>Information about as user, including name, email, start date, inviter, status and available actions</p>
      <div className="status-container">
        {
          userStatusList?.map((status, index) => (
            <UserStatusCard key={`${status.key}-${index}`} status={status} />
          ))
        }
      </div>
      <div className="filters-container">
        {/* Search Bar */}
        <Search 
          size='large' 
          className='searchbar'
          placeholder="Search" 
          allowClear
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={applyFilter('search_query')} 
          onClear={()=>handleClearFilter('search_query')}
        />

        <div className="filters">
          {/* Status Filter */}
          <Dropdown menu={menuProps}>
            <Button size='large'>
              <Space>
                Status
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          {/* Date Filter */}
          <RangePicker
            allowClear={false} 
            value={dateInput}
            format={"DD MMM YYYY"} 
            onChange={applyFilter('date')}
          />
        </div>
      </div>
      <div className='applied-filters-container'>
        {
          // rendering applied filters chips
          Object.entries(appliedFilters).map(([key, value], index) => {
            if (!value) return null;
            return (
              <Chip key={index} clearFilter={() => handleClearFilter(key)} label={getChipLabel(key, value)} />
            )
          })

        }
        {
          // Reset filters / Clear-All as last chip
          Object.keys(appliedFilters).length ?
            <Chip key={'last'} clearFilter={() => handleClearFilter('ALL')} label={'Clear All'} />
            : null

        }
      </div>
      <Table
        className='table'
        pagination={{ position: ['bottomCenter'] }}
        columns={columns}
        dataSource={userData}
      />
    </main>
  )
}
export default App;