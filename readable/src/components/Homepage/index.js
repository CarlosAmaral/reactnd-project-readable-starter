import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {connect} from "react-redux";
import {addPostsAction, sendCategories} from '../../actions';
import _ from 'lodash';
import {withRouter} from "react-router-dom";

const {Header, Content, Footer} = Layout;


class Homepage extends Component {
    constructor(props) {
        super(props);
        console.log(props, "props");
    }

    render() {

        return (
            <div>
                <div></div>

            </div>
        );
    }
}

function mapStateToProps({posts}) {
    return Object.assign({}, posts);
}

function mapDispatchToProps(dispatch) {
    return {
        sendCategories: (category) => dispatch(sendCategories(category)),
        addPosts: (posts) => dispatch(addPostsAction(posts))
    }
}

export default withRouter(connect(mapDispatchToProps, mapStateToProps)(Homepage))