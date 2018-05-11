import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout} from "antd";
import HeaderComponent from "./components/Header";
import store from './store';
import {_fetchCategoriesFromApi, getPostsFromAPI, addPostsAction, sendCategories} from "./actions";
import categories from "./reducers/categories";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Homepage from "./components/Homepage";
import {connect} from "react-redux";

const {Header, Content, Footer} = Layout;

class App extends Component {

    componentDidMount() {
        store.dispatch(_fetchCategoriesFromApi()).then((categories) => {
            this.props.sendCategories(categories);
        });
        store.dispatch(getPostsFromAPI()).then((posts) => {
            console.log(posts, "POSTS")
            this.props.addPosts(posts)
        });
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
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        sendCategories: (category) => dispatch(sendCategories(category)),
        addPosts: (posts) => dispatch(addPostsAction(posts))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
