import React from 'react';
import { CalendarOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import './style.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      create_date: ''
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    fetch(`/api/article/detail?id=${id}`, {
      method: 'get',
      headers: { "Content-Type": "application/json; charset=utf-8" }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState(data.data)
    })
  }

  render() {
    return (
      <div className="page-container page-container-detail">
        <div className="post">
          <div className="post-title">{this.state.title}</div>
          <div className="post-meta">
            <CalendarOutlined />
            <span className="date">{dayjs(this.state.create_date).format('YYYY-MM-DD')}</span>
          </div>
          <div className="post-content" dangerouslySetInnerHTML={{__html: this.state.content}}>
            {/* <p>{this.state.content}</p> */}
          </div>
        </div>
      </div>
    );
  }

}

export default App;
