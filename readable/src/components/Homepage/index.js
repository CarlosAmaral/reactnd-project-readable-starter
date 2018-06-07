import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Card, Badge, Tag, Row, Col, Divider, Button, Popover, Input} from 'antd';
import {connect} from "react-redux";
import {addPostsAction, sendCategories, postThumbsupFromAPI} from '../../actions';
import _ from 'lodash';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";

const {Header, Content, Footer} = Layout;


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }

    }

    hide = () => {
        this.setState({
            visible: false,
        });
    };

    handleVisibleChange = (visible) => {
        this.setState({visible});
    }

    submitComment = () => {

    };

    thumbsUpPost = (key) => {
        this.props.postThumbsupFromAPI(key);
    };

    thumbsDownPost = (key) => {
        this.props.postThumbsdownFromAPI(key);
    };


    render() {
        const {posts} = this.props;
        const postsPayload = posts.posts.posts;

        if (!postsPayload) {
            return ("Loading")
        }

        else if (postsPayload) {
            return (
                <div>
                    <Row gutter={24}>
                        {postsPayload.map((item) => (
                            <Col span={12} key={item.id}>
                                <Card title={item.title} extra={<div>
                                    <Badge count={item.comments}>
                                    </Badge>
                                </div>}>
                                    {item.body}

                                    <Divider/>

                                    <Row>
                                        <Col span={8}>
                                            <strong>Author:</strong> {item.author}
                                        </Col>
                                        <Col span={8}>
                                            <strong>Votes:</strong>{item.voteScore}
                                        </Col>
                                        <Col span={8}>
                                            <strong>Category:</strong>{item.category}
                                        </Col>
                                    </Row>

                                    <Divider/>
                                    <Row>
                                        <Col span={12}>
                                            <Button onClick={() => this.thumbsDownPost(item.id)} icon="minus-circle"/>
                                            <Button onClick={() => this.thumbsUpPost(item.id)} icon="plus-circle"/>
                                        </Col>
                                        <Col span={8}>
                                            <Popover
                                                content={<div>
                                                    <Input placeholder="Basic usage"/> <Button type="primary"
                                                                                               htmlType="button"
                                                                                               onClick={this.submitComment}>Submit</Button>
                                                </div>}
                                                title="Comment this post!"
                                                visible={this.state.visible}
                                                onVisibleChange={this.handleVisibleChange}>
                                                <Button htmlType="button">Comment!</Button>
                                            </Popover>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            );
        }

    }
}

function mapStateToProps(posts) {
    return {posts}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage));