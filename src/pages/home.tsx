import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";

import { CardEvent } from "../components/card";

export const Home = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://6338577a132b46ee0bee7f64.mockapi.io/api/v1/events")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <Row gutter={[32, 32]} justify="start">
        {data &&
          data.map((item) => {
            return (
              <Col key={item.id}>
                <CardEvent
                  id={item.id}
                  title={item.title}
                  author={item.author}
                  image={item.image}
                  authorAvatar={item.authorAvatar}
                  date={item.date}
                  likes={item.likes}
                />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
