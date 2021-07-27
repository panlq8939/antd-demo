import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';
import * as Icon from '@ant-design/icons';
import {adminRouter} from '../../routes'
import './frame.css'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 动态生成icon节点
const iconElement = (name)=>{
  React.createElement(name,{style: { fontSize: '16px'}})
}

class Frame extends Component {
    handleClick(pathname){
      this.props.history.push(pathname)
    }
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
                          <Menu.Item key={index} icon={item.icon ? iconElement(item.icon):''} onClick={this.handleClick.bind(this, item.pathname)}>
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
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
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

export default withRouter(Frame)
