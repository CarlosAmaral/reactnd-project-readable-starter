import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout} from "antd";
import HeaderComponent from "./components/Header";

const { Header, Content, Footer } = Layout;

class App extends Component {
    render() {
        return (
            <div className="App">
                <Layout>
                    <HeaderComponent/>
                    <Content>

                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Readables ©2018 Created by Carlos Amaral | Udacity Nanodegree
                    </Footer>
                </Layout>
            </div>
        );
    }
}

export default App;
