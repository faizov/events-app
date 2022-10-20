import { useState, useEffect } from "react";
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
  Spin
} from "antd";
import { HeartTwoTone, FieldTimeOutlined } from "@ant-design/icons";

import {
  useGetEventByIdQuery,
  useDeleteEventMutation,
  useUpdateEventMutation
} from "../../__data__/services/events";
import { setIdEvent, getIdEvent } from "../../__data__/services/localeStorage";

import "./style.scss";

const { Text } = Typography;

export const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const { data, isLoading } = useGetEventByIdQuery(id);
  const [deleteEvent, { isLoading: isLoadingDelete }] =
    useDeleteEventMutation();

  const [updateEvent, { isLoading: isLoadingLike }] = useUpdateEventMutation();

  useEffect(() => {
    if (data && !isLoadingLike) {
      setLikeCount(data.likes);
    }
  }, [data]);

  useEffect(() => {
    const getLikeEvent = getIdEvent(id as string);
    setLike(getLikeEvent);
  }, []);

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

  const onclickLike = async () => {
    if (id && data) {
      setLike(!like);
      setIdEvent(id);
      setLikeCount(like ? data.likes - 1 : data.likes + 1);
      !isLoadingLike &&
        (await updateEvent({
          id,
          likes: like ? data.likes - 1 : data.likes + 1
        }));
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
            <Col span={24} md={24} sm={24} lg={10}>
              <Image
                className="post-image"
                src={data.image}
                fallback="data:image/png;base64,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"
                preview={false}
              />
            </Col>
            <Col md={24} sm={24} lg={9} xl={10}>
              <Space align="baseline" className="post-header-info">
                <Typography.Title level={5}>
                  <FieldTimeOutlined className="post-header-info-icon" />
                  {startTime}ч - {endTime}ч
                </Typography.Title>
                <Space>
                  <Statistic value={likeCount} />
                  <Button
                    type={like ? "primary" : "text"}
                    shape="circle"
                    icon={<HeartTwoTone twoToneColor="#eb2f96" />}
                    onClick={() => onclickLike()}
                    disabled={isLoadingLike}
                    danger={like}
                  />
                </Space>
              </Space>
              <Text className="post-description" type="secondary">
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
