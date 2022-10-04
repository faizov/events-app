import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

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
        onBack={() => navigate("/")}
        title={data.title}
      />

      <Row justify="space-between" gutter={[32, 32]}>
        <Col sm={24} md={16} lg={20}>
          <Row gutter={[32, 32]}>
            <Col span={12} md={24} sm={24} lg={11}>
              <Image
                width={500}
                height={500}
                src={data.image}
                preview={false}
                style={{ objectFit: "cover", borderRadius: 30 }}
              />

              <Statistic
                value={data.likes}
                prefix={<HeartTwoTone twoToneColor="#eb2f96" />}
              />
            </Col>
            <Col md={24} sm={24} lg={9} xl={12}>
              <Text style={{ whiteSpace: "break-spaces" }} type="secondary">
                {data.description}
              </Text>
            </Col>
          </Row>
        </Col>

        <Col span={2} sm={24} lg={2}>
          <Space direction="vertical">
            <Link to={`/edit/${data.id}`}>
              <Button block>Edit Post</Button>
            </Link>
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
