import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Card, Badge, Tag} from 'antd';
import {connect} from "react-redux";
import {addPostsAction, sendCategories} from '../../actions';
import _ from 'lodash';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
const {Header, Content, Footer} = Layout;


class Homepage extends Component {
    constructor(props) {
        super(props);
        console.log(props, "props");
    }


    render() {
        const {posts} = this.props;

        const postsPayload = posts.posts.posts;
        console.log(posts.posts.posts, "POSTS");
        if (!postsPayload){
            return ("Loading")
        } else if (postsPayload){
            return (
                <div>
                    {postsPayload.map((item) => (

                        <Card title={item.title} style={{width: 300}} extra={<Badge count={item.comments}>
                            <a href="#" className="head-example"/>
                        </Badge>}>
                            {item.body}

                            Author: {item.author}

                            votes:
                            <Tag>{item.category}</Tag>
                        </Card>
                    ))}
                </div>
            );
        }

    }
}

function mapStateToProps (posts) {
    return {posts}
}

/*function mapDispatchToProps(dispatch) {
    return null/!*{
        sendCategories: (category) => dispatch(sendCategories(category)),
        addPosts: (posts) => dispatch(addPostsAction(posts))
    }*!/
}*/

export default withRouter(connect(mapStateToProps)(Homepage));