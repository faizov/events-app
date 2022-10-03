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
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title={data.title}
      />

      <Row justify="space-between" gutter={[32, 32]}>
        <Col span={16} sm={24} md={16}>
          <Row gutter={[32, 32]}>
            <Col span={12} md={24} sm={24} lg={12}>
              <Image
                width={500}
                height={500}
                src={data.image}
                preview={false}
                style={{ objectFit: "cover", borderRadius: 30 }}
              />
            </Col>
            <Col span={12} md={24} sm={24} lg={24} xl={12}>
              <Text type="secondary">{data.description}</Text>
            </Col>
            <Col span={12} md={24} sm={24} lg={24} xl={12}>
              <Statistic
                value={data.likes}
                prefix={<HeartTwoTone twoToneColor="#eb2f96" />}
              />
            </Col>
          </Row>
        </Col>

        <Col span={2} sm={24} lg={2}>
          <Space direction="vertical">
            <Button block disabled>
              Edit Post
            </Button>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Button block danger>
                Delete Post
              </Button>
            </Popconfirm>
          </Space>
        </Col>
      </Row>
    </>
  );
};
