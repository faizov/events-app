import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  message,
  DatePicker,
  PageHeader,
  Space
} from "antd";

import { useAddEventMutation } from "../__data__/services/events";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 6 }
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

export const AddPost = () => {
  const navigate = useNavigate();
  const [addEvent, { isLoading }] = useAddEventMutation();

  const onFinish = async (values: any) => {
    message.loading("Post in progress..");

    try {
      await addEvent(values).then(() => {
        message.success("Post Added");
        navigate("/");
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title="Add post"
      />
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
        <Form.Item
          name={"dateEvent"}
          label="Date Event"
          rules={[{ required: true }]}
        >
          <RangePicker showTime={{ format: "HH" }} format="YYYY-MM-DD HH" />
        </Form.Item>

        <Form.Item name={"image"} label="Image" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Add post
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};
