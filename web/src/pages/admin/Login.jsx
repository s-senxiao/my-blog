import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import axios from 'axios'
import cookie from 'react-cookies'

let isLoginBtnLoading = false

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

export default function Login () {
  const [isLogin, setLogin] = useState(false)
  const handleLogin = async (data) => {
    const res = await axios.post('/api/admin/login', data)
    console.log('res----', res)
    setLogin(true)
    cookie.save('isLogin', true)
  }

  return (
    isLogin ? (<Redirect to="/"></Redirect>) :
    (<div className="page-container page-container-login">
      <h1 className="text-center title">登录</h1>
      <Form 
        {...layout}
        name="form"
        onFinish={handleLogin}>
        <Form.Item
          label="用户名"
          name="username"
          required
          rules={[{ required: true, message: '请填写用户名' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          required
          rules={[{ required: true, message: '请填写密码' }]}>
          <Input type="password" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={isLoginBtnLoading}>登录</Button>
          {/* <Button htmlType="submit">保存</Button> */}
        </Form.Item>
      </Form>
    </div>)
  )
}

