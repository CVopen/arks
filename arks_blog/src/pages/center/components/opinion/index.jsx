/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import style from './index.module.scss'
import Empty from '../empty/index'
import { formDate } from '@/utils/utils'
import { Image, Form, Input, Button, notification } from 'antd'
import { AddOpinion } from '@/api/center'

export default function Opinion(props) {
  const [state, changeState] = useState(1)
  
  useEffect(() => {
    console.log(props);
  }, [props.list, state])

  const change = (key) => {
    return () => {
      changeState(key)
    }
  }

  return (
    <div className={style.opinion}>
      <div className={style.btn}>
        <span onClick={change(1)}>已处理</span>
        <span onClick={change(2)}>未处理</span>
        <span onClick={change(3)}>去反馈</span>
      </div>
      {
        state === 3 ? 
        <SubmiteForm getList={props.getList} />
        : (props.list[state === 1 ? 'complete' : 'hang'].length > 0 ? 
        <div className={style.content}>
          {
            props.list[state === 1 ? 'complete' : 'hang'].map((item, index) => {
              return (
                <div className={style.item} key={item.ID}>
                  <div>
                    <div style={{margin: '5px 0'}}>{index + 1}、时间：{formDate(item.CreatedAt)} 内容：{item.content}</div>
                    { state === 1 && <p style={{marginBottom: '10px'}}>处理意见：{item.message}</p> }
                  </div>
                  { item.images.length > 0 && <ImageItem images={item.images} />}
                </div>
              )
            })
          }
        </div> :
        <Empty tab={4} />)
      }
    </div>
  )
}

const ImageItem = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Image
        preview={{ visible: false }}
        width={120}
        src={props.images[0]}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          {
            props.images.map((item, index) => <Image key={index} src={item} />)
          }
        </Image.PreviewGroup>
      </div>
    </div>
  )
}

const SubmiteForm = (props) => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    AddOpinion(values).then(() => {
      notification.success({ message: '操作成功' });
      props.getList()
      form.resetFields()
    })
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="内容"
        name="content"
        rules={[{ required: true, message: '请输入内容' }]}
      >
        <Input placeholder="请输入内容" />
      </Form.Item>

      <Form.Item
        label="图片"
        name="images"
      >
        <Input.TextArea placeholder="多张图片请';'隔开" rows={5} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
        <Button htmlType="submit" style={{marginRight: '10px'}}>提交</Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </Form.Item>
    </Form>
  )
}
