import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Layout, Menu, Breadcrumb} from 'antd';
import {Link} from "react-router-dom";

const {Header, Content, Footer} = Layout;

export default class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <Header style={{position: 'fixed', width: '100%'}}>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1"><Link to='/'>Homepage</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/:category'>Category List</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/edit-create-post'>Edit/Create Post</Link></Menu.Item>
                    </Menu>
                </Header>
            </div>
        );
    }
}
