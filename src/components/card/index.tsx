import React from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Col, Row, Typography, Statistic, Tag } from "antd";

import { UserOutlined, HeartTwoTone } from "@ant-design/icons";

import "./style.scss";

const { Meta } = Card;
const { Text } = Typography;

interface Event {
  id: string;
  title: string;
  image: string;
  author: string;
  authorAvatar: string;
  dateCreate: Date;
  dateEvent: string[];
  likes: number;
}

export const CardEvent: React.FC<Event> = ({
  id,
  title,
  image,
  author,
  authorAvatar,
  dateCreate,
  dateEvent,
  likes
}) => {
  const startTime =
    dateEvent && new Date(dateEvent[0]).toLocaleDateString("ru-RU");

  return (
    <div className="content">
      <div className="tags">
        <Tag color="#108ee9">Event</Tag>
      </div>

      <Link to={`event/${id}`}>
        <Card
          bordered={false}
          className="card"
          cover={<img alt={title} src={image} className="card-image" />}
        >
          <div className="card-content">
            <Row align="middle" justify="space-between">
              <Col span={17}>
                <Meta title={title} />
              </Col>
              <Statistic
                valueStyle={{ fontSize: 16 }}
                value={likes}
                suffix={
                  <HeartTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: 16 }}
                  />
                }
              />
            </Row>

            <Row justify="space-between" align="middle">
              <Col>
                <Meta
                  avatar={
                    <Avatar
                      size="small"
                      src={authorAvatar}
                      icon={<UserOutlined />}
                    />
                  }
                  description={author}
                  className="card-footer-author"
                />
              </Col>
              <Col>
                <Text type="secondary">{startTime}</Text>
              </Col>
            </Row>
          </div>
        </Card>
      </Link>
    </div>
  );
};
