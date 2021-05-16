import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import * as Icon from '@ant-design/icons';
import {adminRouter} from '../../routes'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 动态生成icon节点
const iconElement = (name)=>{
  console.log(React.createElement(name,{style: { fontSize: '16px'}}))
  React.createElement(name,{style: { fontSize: '16px'}})
}

export default class Frame extends Component {
    render() {
        return (
            <Layout>
            <Header className="header">
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </Header>
            <Layout>
              <Sider width={200} className="site-layout-background">
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['0']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  {
                    this.props.menus.map((item, index) => {
                      if(item.isNav){
                        return (
                          <Menu.Item key={index} icon={item.icon ? iconElement(item.icon):''}>
                            { item.icon && iconElement(item.icon)}
                            {item.title}
                          </Menu.Item>
                        )
                      }
                    })
                  }
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  { this.props.children }
                </Content>
              </Layout>
            </Layout>
          </Layout>
        )
    }
}
