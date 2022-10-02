import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Alert, Row, Col, message } from "antd";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 6 }
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
  const navigate = useNavigate();

  const openMessage = (success: boolean) => {
    const key = "updatable";

    message.loading({ content: "Loading...", key });

    if (success) {
      message.success({ content: "Post added!", key, duration: 2 });
      navigate("/");
    }
  };

  const onFinish = (values: any) => {
    openMessage(false);
    if (values) {
      fetch("https://6338577a132b46ee0bee7f64.mockapi.io/api/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          image: values.image,
          date: new Date()
        })
      }).then((response) => {
        if (response) {
          openMessage(true);
        }
      });
    }
  };

  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name={"title"} label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={"description"}
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name={"image"} label="Image" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
