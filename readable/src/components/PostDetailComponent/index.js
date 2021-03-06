import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actionCreators from "../../actions";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import * as ReadablesAPI from '../../utils/ReadablesAPI'
import {Button, Card, Col, Divider, Form, Input, List, message, Popover, Row} from "antd";
import moment from 'moment'
import {Select} from "antd/lib/index";
import * as helpers from "../../utils/helpers";

const dateFormat = 'MM/DD/YYYY';

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

class PostDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singlePost: {},
            visible: false,
            isEditMode: false,
            singlePostComments: [],
            isCommentMode: false
        }
    }

    componentDidMount() {

        const {post_id} = this.props.match.params;

        let promises = [
            ReadablesAPI.getSinglePostAPI(post_id),
            ReadablesAPI.getCommentsAPI(post_id),
        ];

        Promise.all(promises).then(res => {
            if (res) {
                this.setState({
                    singlePost: res[0],
                    singlePostComments: res[1]
                })
            }
        })

    }

    handleSubmitComment = (e) => {
        e.preventDefault();
        const {post_id} = this.props.match.params;
        const {editCommentId, isCommentModeInEditMode} = this.state;

        if (isCommentModeInEditMode) {
            this.props.form.validateFields((error, values) => {
                let payload = {
                    timestamp: new Date(),
                    body: values.comment_body
                };
                return ReadablesAPI.editCommentsAPI(editCommentId, payload);
            })

        } else {
            this.props.form.validateFields((error, values) => {
                let payload = {
                    id: helpers.guid(),
                    timestamp: new Date(),
                    body: values.comment_body,
                    author: values.comment_author,
                    parentId: post_id
                };
                message.success('The comment has been added successfully');
                return ReadablesAPI.createCommentsAPI(payload);
            });
        }

    };

    cancelPostEdition = () => this.setState({isEditMode: false})


    editPost = (id) => {
        const {posts} = this.props.posts.posts;
        const item = posts.find(f => f.id === id);
        if (item) {
            this.setState({
                editPostId: item.id,
                isEditMode: true
            }, () => {
                if (this.state.isEditMode) {
                    return this.props.form.setFieldsValue({
                        title: item.title,
                        body: item.body,
                        author: item.author,
                        category: item.category
                    })
                }
            });
        }
    };
    deletePost = (post_id) => {
        ReadablesAPI.deletePostsAPI(post_id).then(res => {
            if (res) {
                message.success("Post has been deleted!");
            }
        })
    };
    deleteComment = (comment_id) => {
        ReadablesAPI.deleteCommentsAPI(comment_id).then(res => {
            if (res) {
                message.success("Post has been deleted!");
            }
        })
    };

    commentPost = (bool) => {
        this.setState({isCommentMode: bool})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let payload = {
                title: values.title,
                body: values.body
            };
            message.success('The post has been edited successfully');
            return ReadablesAPI.editPostsAPI(payload, this.state.editPostId);
        });
    };


    editComment = (id) => {
        const {singlePostComments} = this.state;
        const item = singlePostComments.find(f => f.id === id);
        if (item) {
            this.setState({
                editCommentId: item.id,
                isCommentMode: true,
                isCommentModeInEditMode: true
            }, () => {
                if (this.state.isCommentMode) {
                    return this.props.form.setFieldsValue({
                        comment_body: item.body,
                        comment_author: item.author
                    })
                }
            })
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {singlePost, singlePostComments, isEditMode, isCommentMode, isCommentModeInEditMode} = this.state;
        const {categories} = this.props.posts.categories;
        //this.props.form.getFieldDecorator('comment_body', 'comment_author', 'title', 'body', 'author', 'category', {initialValue: {}})
        if (!singlePost && !categories) {
            return ("Loading");
        } else {
            return (
                <div>
                    <Row>
                        <Col span={12}>
                            <Card title={singlePost.title} width={400}
                                  extra={<div>
                                      <a onClick={() => this.editPost(singlePost.id)}>Edit</a><Divider type="vertical"/>
                                      <a onClick={() => this.deletePost(singlePost.id)}>Delete</a><Divider
                                      type="vertical"/>
                                      <a onClick={() => this.commentPost(true)}>Add Comment</a>
                                  </div>}>
                                {singlePost.body}
                                <Divider/>
                                author: {singlePost.author}
                                Date created: {moment(singlePost.timestamp).format(dateFormat)}

                                <Divider/>

                                <Divider><h4
                                    style={{color: 'blue', fontWeight: '400', textTransform: 'uppercase'}}>Comments</h4>
                                </Divider>

                                <List
                                    itemLayout="horizontal"
                                    dataSource={singlePostComments}
                                    renderItem={comment => (
                                        <List.Item
                                            actions={[<a onClick={() => this.editComment(comment.id)}>Edit</a>,
                                                <a onClick={() => this.deleteComment(comment.id)}>Delete</a>]}>
                                            <List.Item.Meta
                                                description={comment.body}
                                            />
                                        </List.Item>
                                    )}
                                />

                                {isCommentMode && (
                                    <Form onSubmit={this.handleSubmitComment}
                                          className="login-form">
                                        <FormItem>
                                            {getFieldDecorator('comment_body', {
                                                //initialValue: 'wtv',
                                                rules: [{required: true, message: 'Please insert a comment'}],
                                            })(
                                                <TextArea placeholder="Your comment" rows={4}/>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('comment_author', {
                                                //initialValue: 'kewl',
                                                rules: [{required: true, message: 'Please insert an author'}],
                                            })(
                                                <Input disabled={isCommentModeInEditMode} placeholder="Who are you?"/>
                                            )}
                                        </FormItem>
                                        <div>
                                            {isCommentModeInEditMode ?
                                                <Button htmlType="submit" type="primary">Update Comment</Button>
                                                :
                                                <Button htmlType="submit" type="primary">Post a Comment</Button>
                                            }
                                            <Button htmlType="button" type="default"
                                                    onClick={() => this.commentPost(false)}>Cancel</Button>
                                        </div>
                                    </Form>
                                )}

                            </Card>
                        </Col>
                        {isEditMode && (
                            <div>
                                <Col span={12}>
                                    Edit Post
                                    <Form onSubmit={this.handleSubmit} className="login-form">
                                        <FormItem>
                                            {getFieldDecorator('title', {
                                                rules: [{required: true, message: 'Please insert a title'}],
                                            })(
                                                <Input placeholder="Your post title"/>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('body', {
                                                rules: [{required: true, message: 'Please insert a post body'}],
                                            })(
                                                <TextArea placeholder="Your post body context" rows={4}/>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('author', {
                                                rules: [{required: true, message: 'Please insert an author'}],
                                            })(
                                                <Input placeholder="Who are you?"/>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('category', {
                                                rules: [{required: true, message: 'Please select a category'}],
                                            })(
                                                <Select placeholder="Select Category">
                                                    {categories.map(item =>
                                                        <Option key={item.name}
                                                                value={item.name}>{item.name}</Option>
                                                    )}
                                                </Select>
                                            )}

                                        </FormItem>
                                        <Button htmlType="submit" type="primary">Edit Post</Button>
                                        <Button htmlType="button" type="default"
                                                onClick={this.cancelPostEdition}>Cancel</Button>
                                    </Form>
                                </Col>
                            </div>
                        )}
                    </Row>
                </div>
            );

        }
    }
}

const PostDetailComponentForm = Form.create()(PostDetailComponent);

function mapStateToProps(posts, categories) {
    return {posts: posts, categories: categories}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps,
    mapDispatchToProps)(PostDetailComponentForm));
