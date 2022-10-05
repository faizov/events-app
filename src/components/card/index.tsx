import React from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Col, Row, Typography, Statistic } from "antd";

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
  date: Date;
  likes: number;
}

export const CardEvent: React.FC<Event> = ({
  id,
  title,
  image,
  author,
  authorAvatar,
  dateCreate,
  likes
}) => {
  return (
    <>
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
                <Text type="secondary">
                  {new Date(dateCreate).toLocaleDateString()}
                </Text>
              </Col>
            </Row>
          </div>
        </Card>
      </Link>
    </>
  );
};
