import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactRouter from './router/router'
import AppHeader from './components/header';
import AppFooter from './components/footer';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="mainLayout">
      <Header>
        <AppHeader />
      </Header>
      <Content>
        <Router>
          <ReactRouter />
        </Router>
      </Content>
      <Footer>
        <AppFooter />
      </Footer>
    </Layout>

  );
}

export default App;
