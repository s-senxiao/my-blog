import React, { useState, useEffect } from 'react'
import { Table, Tooltip, Button, Popconfirm } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import './style.scss'
import $api from '../../helper/api'
import { formatDate } from '../../helper/utils'


export default function () {
  const [list, setList] = useState([])
  const [isDeleteBtnLoading, setIsDeleteBtnLoading] = useState(false)

  async function getAdminList () {
    const { data } = await $api.getAdminList()
    console.log('data----', data)
    setList(data)
  }

  useEffect(() => {
    getAdminList()
  }, [])

  const gotoEdit = () => {
    console.log('go to edit page...')
  }

  const deleteRow = async (id) => {
    setIsDeleteBtnLoading(true)
    try {
      await $api.deleteArticle(id)
      getAdminList()
    } finally {
      setIsDeleteBtnLoading(false)
    }
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      minWidth: '300px',
      ellipsis: true,
      render: (text, record) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )
    },
    {
      title: '摘要',
      dataIndex: 'abstract',
      key: 'abstract',
      minWidth: '500px',
      ellipsis: true,
      render: (text, record) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )
    },
    {
      title: '发布日期',
      dataIndex: 'create_date',
      key: 'create_date',
      minWidth: '120px',
      render: (text) => (
        <span>{formatDate(text)}</span>
      )
    },
    {
      title: '更新日期',
      dataIndex: 'modify_date',
      key: 'modify_date',
      minWidth: '120px',
      render: (text) => (
        <span>{formatDate(text)}</span>
      )
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      minWidth: '100px',
      render: (text, record) => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              style={{marginRight: '5px'}}
              onClick={gotoEdit}>
                编辑
            </Button>
            <Popconfirm
              title="确认删除该文章吗？"
              icon={<QuestionCircleOutlined
              style={{ color: 'red' }} />}
              onConfirm = {() => deleteRow(record.id)}
            >
              <Button
                type="primary"
                danger
                size="small"
                loading={isDeleteBtnLoading}>
                  删除
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ];

  const isLogin = cookie.load('isLogin')

  if (!isLogin) {
    return <Redirect to="/login"></Redirect>
  }
  return (
    <div className="page-container page-container-admin-list">
      <Table dataSource={list} columns={columns} bordered rowKey="id" />
    </div>
  )
}
