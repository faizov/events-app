import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  PageHeader,
  Image,
  Statistic,
  Row,
  Col,
  Space,
  Typography,
  message,
  Popconfirm,
  Button
} from "antd";
import { HeartTwoTone } from "@ant-design/icons";

const { Text } = Typography;

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

export const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Event>();

  useEffect(() => {
    if (id) {
      fetch(`https://6338577a132b46ee0bee7f64.mockapi.io/api/v1/events/${id}`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }, [id]);

  if (!data) return <>Loading...</>;

  const confirm = () => {
    console.log();
    if (id) {
      fetch(`https://6338577a132b46ee0bee7f64.mockapi.io/api/v1/events/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status) {
          message.success("Post deleted!");
          navigate("/");
        }
      });
    }
  };

  return (
    <Space align="start" direction="vertical" size="large">
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title={data.title}
      />

      <Row>
        <Space align="start" size="large">
          <Image
            width={500}
            height={500}
            src={data.image}
            preview={false}
            style={{ objectFit: "cover", borderRadius: 30 }}
          />
          <Col span={12}>
            <Text type="secondary">{data.description}</Text>
          </Col>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete Post</Button>
          </Popconfirm>
        </Space>
      </Row>

      <Statistic
        value={data.likes}
        prefix={<HeartTwoTone twoToneColor="#eb2f96" />}
      />
    </Space>
  );
};
