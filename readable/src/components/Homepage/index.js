import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Card, Badge, Tag, Row, Col, Divider, Button, Popover, Input, Icon} from 'antd';
import {connect} from "react-redux";
import {addPostsAction, sendCategories, postThumbsupFromAPI} from '../../actions';
import _ from 'lodash';
import {Link, withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";
import moment from 'moment'

const dateFormat = 'MM/DD/YYYY';

const {Header, Content, Footer} = Layout;


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }

    }
    thumbsUpPost = (key) => {
        this.props.postThumbsupFromAPI(key);
    };

    thumbsDownPost = (key) => {
        this.props.postThumbsdownFromAPI(key);
    };


    render() {
        const {posts} = this.props.posts.posts;

        if (!posts) {
            return ("Loading")
        }

        else if (posts) {
            return (
                <div>
                    <Row gutter={24}>
                        {posts.map((item) => (
                            <Col span={12} key={item.id}>
                                <Card title={item.title} extra={<Link to={`/view-more/${item.id}`}>View More</Link>}>
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
                                            <div style={{display: 'flex', marginLeft: '50px'}}>
                                                <Icon onClick={() => this.thumbsDownPost(item.id)} type="dislike-o"
                                                      style={{cursor: 'pointer', fontSize: '20px'}}/>
                                                <Icon onClick={() => this.thumbsUpPost(item.id)} type="like-o"
                                                      style={{
                                                          cursor: 'pointer',
                                                          fontSize: '20px',
                                                          paddingLeft: '15px'
                                                      }}/>
                                            </div>
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

function mapStateToProps(posts, categories) {
    return {posts: posts, categories: categories}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage));