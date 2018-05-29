import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout} from "antd";
import HeaderComponent from "./components/Header";
import store from './store';
import {_fetchCategoriesFromApi, GET_POSTS, GET_CATEGORIES, getPostsAction, getCategoriesAction} from "./actions";
import categories from "./reducers/categories";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Homepage from "./components/Homepage";
import {connect} from "react-redux";
import Loadable from 'react-loading-overlay';
import * as ReadablesAPI from './utils/ReadablesAPI'

const {Header, Content, Footer} = Layout;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {

        let promises = [
            ReadablesAPI.getPostsAPI(),
            ReadablesAPI.getCategoriesAPI()
        ];


        Promise.all(promises).then(res => {
            if (res) {
                const posts = res[0];
                const categories = res[1];
                this.props.getCategoriesAction({type: GET_POSTS, posts});
                this.props.getPostsAction({type: GET_CATEGORIES, categories});
                this.setState({isLoading: false})
            }
        });

    }

    render() {
        return (
            <Loadable
                active={this.state.isLoading}
                spinner>
                <div className="App">
                    <Layout>
                        <HeaderComponent/>
                        <Content>
                            <Switch>
                                <Route path='/' exact render={() => (
                                    <Homepage/>
                                )}/>
                            </Switch>
                        </Content>
                    </Layout>
                </div>
            </Loadable>
        );
    }
}

function mapStateToProps(state) {
    return {...state}
}

function mapDispatchToProps(dispatch) {
    return {
        getCategoriesAction: (category) => dispatch(getCategoriesAction(category)),
        getPostsAction: (posts) => dispatch(getPostsAction(posts))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
