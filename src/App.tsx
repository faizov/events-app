import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { Header as HeaderComponent } from "./components/header";
import "antd/dist/antd.css";

const { Header, Footer, Content } = Layout;

export default function App() {
  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: "#2B2E4A" }}>
        <HeaderComponent />
      </Header>
      <Content style={{ padding: 50 }}>
        <Outlet />
      </Content>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  );
}
