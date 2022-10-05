import { Link } from "react-router-dom";
import { Col, Row, Spin, Empty, Button } from "antd";

import { useGetEventsQuery, Event } from "../__data__/services/events";

import { CardEvent } from "../components/card";

export const Home = () => {
  const { data, isLoading } = useGetEventsQuery();

  if (isLoading) return <Spin size="large" />;

  if (data?.length === 0) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60
        }}
        description={<span>No Events :(</span>}
      >
        <Link to="/add">
          <Button type="primary">Create Event</Button>
        </Link>
      </Empty>
    );
  }

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
                    dateCreate={item.dateCreate}
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
