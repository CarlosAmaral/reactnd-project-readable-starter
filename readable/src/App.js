import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout} from "antd";
import HeaderComponent from "./components/Header";
import store from './store';
import {_fetchCategoriesFromApi, sendCategories} from "./actions";
import categories from "./reducers/categories";
import {Redirect, Route, Switch} from "react-router-dom";
import Homepage from "./components/Homepage";
import {connect} from "react-redux";

const {Header, Content, Footer} = Layout;

class App extends Component {

    componentDidMount() {
        store.dispatch(_fetchCategoriesFromApi()).then((categories) => {
            this.props.sendCategories(categories);
        })
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    <HeaderComponent/>
                    <Content>
                        <Switch>
                            <Route exact path="/" component={() => <Redirect to="/homepage"/>}/>
                            <Route path="/homepage" component={Homepage}/>
                        </Switch>

                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Readables ©2018 Created by Carlos Amaral | Udacity Nanodegree
                    </Footer>
                </Layout>
            </div>
        );
    }
}

function mapStateToProps({categories}) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendCategories: (category) => dispatch(sendCategories(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
