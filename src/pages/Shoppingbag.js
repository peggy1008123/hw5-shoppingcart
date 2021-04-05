import { Layout } from "antd";
import NavBar from "../components/NavBar";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import Shoppingproduct from "../components/Shoppingproduct";

const { Header, Content, Footer } = Layout;

export default function ShoppingBag() {
  
  return (
    <Layout className="container main-layout">
         <NavBar />
      <Layout className="bg-gray">
        <Header className="layout-header">
          <AppHeader title="Shopping Cart" />
        </Header>
        <Content className="layout-content">
          <Shoppingproduct />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}
