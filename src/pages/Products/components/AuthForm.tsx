import { Modal, Form, Input } from 'antd';
import React, { PropsWithChildren, useEffect } from 'react';

interface AuthFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onOk: (data:ProductAPI.Params_TokenInfo__) => void;
}

const AuthForm: React.FC<PropsWithChildren<AuthFormProps>> = (props) => {
  const { modalVisible, onCancel, onOk } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (modalVisible) {
      form.resetFields();
    }
  }, [modalVisible])

  const handleOk = () => {
    form.validateFields().then(val => {
      onOk(val);
    })
  }
  return (
    <Modal
      destroyOnClose
      title="Grant Access"
      width={420}
      open={modalVisible}
      onCancel={onCancel}
      onOk={handleOk}
      cancelText="Cancel"
      okText="Submit"
    >
      <Form
        form={form}
        autoComplete='off'
        labelCol= {{ span: 6 }}
        wrapperCol={{ span: 18 }}
      > 
        <Form.Item<ProductAPI.Params_TokenInfo__>
          label="email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<ProductAPI.Params_TokenInfo__>
          label="password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthForm;
