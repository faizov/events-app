import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, PageHeader, Space, Col, message } from "antd";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 12 }
};

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

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: Date;
  likes: number;
}

export const Edit = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetch(`https://6338577a132b46ee0bee7f64.mockapi.io/api/v1/events/${id}`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }, [id]);

  if (!data) return <>Loading...</>;

  const edit = (values: any) => {
    message.loading("Action in progress..", 5);
    setLoading(true);
    if (id && values) {
      fetch(`https://6338577a132b46ee0bee7f64.mockapi.io/api/v1/events/${id}`, {
        method: "PUT",
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
        if (response.status) {
          message.success("Loading finished", 2.5);
          navigate(`/event/${id}`);
        }
      });
    }
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title="Edit post"
      />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={edit}
        validateMessages={validateMessages}
      >
        <Form.Item name={"title"} label="Title" rules={[{ required: true }]}>
          <Input defaultValue={data.title} />
        </Form.Item>
        <Form.Item
          name={"description"}
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={10} defaultValue={data.description} />
        </Form.Item>
        <Form.Item name={"image"} label="Image" rules={[{ required: true }]}>
          <Input defaultValue={data.image} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Edit post
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};
