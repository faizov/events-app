import { Button, Form, Input } from "antd";
import React from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!"
  },
  number: {
    range: "${label} must be between ${min} and ${max}"
  }
};
/* eslint-enable no-template-curly-in-string */

export const AddPost = () => {
  const onFinish = (values: any) => {
    console.log(values);
    if (values) {
      fetch("https://6338577a132b46ee0bee7f64.mockapi.io/api/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: values.title,
          image: values.image,
          date: new Date()
        })
      });
    }
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item name={"title"} label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={"image"} label="Image" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
