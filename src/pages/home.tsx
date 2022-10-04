import { Col, Row, Spin } from "antd";

import { useGetEventsQuery, Event } from "../__data__/services/events";

import { CardEvent } from "../components/card";

export const Home = () => {
  const { data, isLoading } = useGetEventsQuery();

  if (isLoading) return <Spin size="large" />;

  return (
    <div>
      <Row gutter={[32, 32]} justify="start">
        {data &&
          data
            .map((item: Event) => {
              return (
                <Col span={24} sm={24} md={12} xl={6} key={item.id}>
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
            })
            .reverse()}
      </Row>
    </div>
  );
};
