import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import './style.scss'

// const { subMenu } = Menu;

export default class home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      current: 'home'
    };
  }

  handleMenuItemClick = (e) => {
    this.setState({current: e.key});
  }

  render () {
    const { current } = this.state;
    return (
      <div className="header">
        <Menu onClick={this.handleMenuItemClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="home">
            <Link to="/home">首页</Link>
          </Menu.Item>
          <Menu.Item key="about">
          <Link to="/about">关于</Link>
          </Menu.Item>
          {/* <Menu.Item key="javascript">Javascript</Menu.Item>
          <Menu.Item key="node">Node</Menu.Item>
          <Menu.Item key="data">数据算法</Menu.Item>
          <Menu.Item key="other">其它</Menu.Item> */}
        </Menu>
      </div>
    )
  }
}

