import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Breadcrumb,
  Image,
  Statistic,
  Row,
  Col,
  Space,
  Typography
} from "antd";
import { LikeOutlined } from "@ant-design/icons";

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

  return (
    <Space align="start" direction="vertical" size="large">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{data.title}</Breadcrumb.Item>
      </Breadcrumb>

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
        </Space>
      </Row>

      <Statistic value={1128} prefix={<LikeOutlined />} />
    </Space>
  );
};
