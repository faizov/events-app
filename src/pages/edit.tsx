import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, PageHeader, Space, Spin } from "antd";

import {
  useGetEventByIdQuery,
  useUpdateEventMutation
} from "../__data__/services/events";

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
  const { data, isLoading: loadingEvent } = useGetEventByIdQuery(id);
  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  if (loadingEvent || isLoading) {
    return <Spin />;
  }

  const edit = async (patch: any) => {
    if (id && patch) {
      try {
        await updateEvent({ id, ...patch }).then(
          () => navigate(`/event/${id}`)
        );
      } catch (e) {
        console.log("error", e);
      }
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
        initialValues={{
          title: data.title,
          description: data.description,
          image: data.image
        }}
      >
        <Form.Item name={"title"} label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={"description"}
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={10} />
        </Form.Item>
        <Form.Item name={"image"} label="Image" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Edit post
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};
