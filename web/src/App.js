import React, {  useState } from 'react';
  import './App.css';
  import { Layout, Menu, Icon } from 'antd';
  import Bisection from './root/bisection';
  import Falsepos from './root/False-Position';
  import Home from './home.js'
  import Secant from './root/Secant';
  import OnePoint from './root/One-point';
  import Newton from './root/Newton';
  import Forwardh from './Differentiation/Forwardh';
  import Backwardh from './Differentiation/backwardh';
  import Forwardh2 from './Differentiation/Forwardh2';
  import Backwardh2 from './Differentiation/backwardh2';
  import Centralh from './Differentiation/centralh';
  import Centralh4 from './Differentiation/centralh4';
  import Trap from './Integration/CompositeTrapzoidal';
  import Simp from './Integration/CompositeSimpson';
  //import Cramer from './Liner/Cramer';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

  function App(){
 const [collapsed, setCollapsed] = useState(false);
 const onCollapse = () => setCollapsed (!collapsed);
 const [page, setpage] = useState();
const bisectionpage = () => setpage(<Bisection />)
 const falseonpage = () => setpage(<Falsepos />)
 const OnePointpage = () => setpage(<OnePoint />)
 const Secantpagepage = () => setpage(<Secant />)
 const newtonpage = () => setpage(<Newton />)
  const homepage = () => setpage()
  const Forwardhpage = () => setpage(<Forwardh />)
  const Backwardhpage = () => setpage(<Backwardh />)
  const Forwardh2page = () => setpage(<Forwardh2 />)
  const Backwardh2page = () => setpage(<Backwardh2 />)
  const Centralhhpage = () => setpage(<Centralh />)
  const Centralh4page = () => setpage(<Centralh4 />)
  const Trappage = () => setpage(<Trap />)
  const Simpsonpage = () => setpage(<Simp />)
  const Testpage = () => setpage(<Home />)
  //const Cramerpage = () => setpage(<Cramer />)
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="App" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item onClick={homepage}>
                <Icon type="home" />
                <span>Home</span>
              </Menu.Item>
            <SubMenu
                key="M1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>Root of equations</span>
                  </span>
                }
                
              >
                <Menu.Item  onClick={bisectionpage} >Bisection Method</Menu.Item>
                <Menu.Item  onClick={falseonpage}>False-Position Method</Menu.Item>
                <Menu.Item  onClick={OnePointpage}>One-Point Iteration Method</Menu.Item>
                <Menu.Item  onClick={newtonpage}>Newton</Menu.Item>
                <Menu.Item onClick={Secantpagepage}>Secant</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="user" />
                    <span>Integration</span>
                  </span>
                }
              >
                <Menu.Item onClick={Trappage}>CompositeTrapzoidal rule</Menu.Item>
                <Menu.Item onClick={Simpsonpage}>CompositeSimpson rule</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="user" />
                    <span>Differentiation</span>
                  </span>
                }
              >
                <Menu.Item onClick={Forwardhpage}>Forwardh</Menu.Item>
                <Menu.Item onClick={Forwardh2page}>ForwardH2</Menu.Item>
                <Menu.Item onClick={Backwardhpage}>Backwardh</Menu.Item>
                <Menu.Item onClick={Backwardh2page}>BackwardH2</Menu.Item>
                <Menu.Item onClick={Centralhhpage}>Cantralh</Menu.Item>
                <Menu.Item onClick={Centralh4page}>Cantralh4</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>         
          <Layout>     
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <h1>Numerical Method</h1>
              {page}
            </Content>
          </Layout>

        </Layout>
        
      );
    
  }

  export default App;
  




  

