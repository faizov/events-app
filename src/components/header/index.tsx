import { Avatar, Badge, Dropdown, Menu, Button } from "antd";

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
  return (
    <div className="header-profile">
      <Button type="primary" href="add">
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
