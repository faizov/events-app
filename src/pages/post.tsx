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
  Button,
  Spin,
  Timeline
} from "antd";
import { HeartTwoTone, FieldTimeOutlined } from "@ant-design/icons";

import {
  useGetEventByIdQuery,
  useDeleteEventMutation
} from "../__data__/services/events";

const { Text, Paragraph } = Typography;

export const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetEventByIdQuery(id);
  const [
    deleteEvent,
    { isLoading: isLoadingDelete }
  ] = useDeleteEventMutation();

  if (isLoading) return <Spin />;

  const confirm = async () => {
    if (id) {
      try {
        await deleteEvent(id).then(() => {
          message.success("Post deleted!");
          navigate("/");
        });
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  const startTime = new Date(data.dateEvent[0]).toLocaleDateString("ru-RU", {
    day: "2-digit",
    year: "2-digit",
    month: "2-digit",
    hour: "2-digit"
  });

  const endTime = new Date(data.dateEvent[1]).toLocaleDateString("ru-RU", {
    day: "2-digit",
    year: "2-digit",
    month: "2-digit",
    hour: "2-digit"
  });

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate("/")}
        title={data.title}
        style={{
          padding: "0 0 40px 0"
        }}
      />

      <Row justify="space-between" gutter={[32, 32]}>
        <Col sm={24} md={16} lg={20}>
          <Row gutter={[32, 32]}>
            <Col span={12} md={24} sm={24} lg={10}>
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
            <Col md={24} sm={24} lg={9} xl={10}>
              <Paragraph>
                <FieldTimeOutlined
                  style={{ color: "#2f82eb", marginRight: 10 }}
                />
                {startTime}ч - {endTime}ч
              </Paragraph>
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
              <Button block danger loading={isLoadingDelete}>
                Delete Post
              </Button>
            </Popconfirm>
          </Space>
        </Col>
      </Row>
    </>
  );
};
