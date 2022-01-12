import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom'
import { CalendarOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import $api from '../../helper/api'
import './style.scss'

export default function Home () {
  const [list, setList] = useState([])

  useEffect(() => {
    async function getArticleList () {
      const { data } = await $api.getArticleList()
      setList(data)
    }
    getArticleList()
  }, [])
  
  return (
    <div className="page-container page-container-home">
      {list.map((item) => (
        <div className="post" key={item.id}>
          <div className="post-title">
            <Link to={`/detail/${item.id}`}>{item.title}</Link>
          </div>
          <div className="post-meta">
            <CalendarOutlined />
            <span className="date">{dayjs(item.create_date).format('YYYY-MM-DD')}</span>
          </div>
          <div className="post-content">
            {item.abstract}
          </div>
        </div>
      ))} 
    </div>
  )
}
