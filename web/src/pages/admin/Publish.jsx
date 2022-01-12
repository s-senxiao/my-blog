import React, { useState, useRef } from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './style.scss'

const { Option } = Select

export default function () {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false)
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }
  const formRef = useRef(null)


  const handlePublish = (data) => {
    setIsSubmitBtnLoading(true)
    const params = Object.assign({}, data)
    params.content = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    fetch('/api/admin/publish', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json; charset=utf-8" }
    }).then(() => {
      message.success('发布成功！')
      formRef.current.resetFields()
      setIsSubmitBtnLoading(false)
    })
  }

  const isLogin = cookie.load('isLogin')

  if (!isLogin) {
    return <Redirect to="/login"></Redirect>
  }
  return (
    <div className="page-container page-container-admin">
      <Form name="form" ref={formRef} onFinish={handlePublish}>
        <Form.Item
          label="标题"
          name="title"
          required
          rules={[{ required: true, message: '请填写标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="分类"
          name="category"
          required
          rules={[{ required: true, message: '请填写分类' }]}>
          <Select>
            <Option value="html">html</Option>
            <Option value="css">css</Option>
            <Option value="javascript">javascript</Option>
            <Option value="node">node</Option>
            <Option value="sql">sql</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="标签"
          name="tag"
          required
          rules={[{ required: true, message: '请填写标签' }]}>
          <Select mode="tags">
            <Option value="html">html</Option>
            <Option value="css">css</Option>
            <Option value="javascript">javascript</Option>
            <Option value="vue">vue</Option>
            <Option value="react">react</Option>
            <Option value="node">node</Option>
            <Option value="sql">sql</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="摘要"
          name="abstract"
          required
          rules={[{ required: true, message: '请填写摘要' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          required
          rules={[{ required: true, message: '请填写内容' }]}>
          {/* <TextArea type="textarea" rows={5}/> */}
          <Editor
            editorState={editorState}
            toolbarClassName="editor-tollbar"
            wrapperClassName="editor-wrapper"
            editorClassName="editor-main"
            onEditorStateChange={onEditorStateChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitBtnLoading}>发布</Button>
          {/* <Button htmlType="submit">保存</Button> */}
        </Form.Item>
      </Form>
    </div>
  )
}
