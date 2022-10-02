import { Avatar, Badge, Dropdown, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const menu = (
  <Menu
    items={[
      {
        label: "Profile",
        key: "0"
      },
      {
        label: "Notification",
        key: "1"
      },
      {
        type: "divider"
      },
      {
        label: "Logout",
        danger: true,
        key: "3"
      }
    ]}
  />
);

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-profile">
      <Button type="primary" onClick={() => navigate("/add")}>
        Create Event
      </Button>
      <span className="avatar-item">
        <Badge dot>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
          </Dropdown>
        </Badge>
      </span>
    </div>
  );
};
