import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actionCreators from "../../actions";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import * as ReadablesAPI from '../../utils/ReadablesAPI'
import {Button, Card, Col, Divider, Form, Input, List, message, Popover, Row} from "antd";

const {FormItem} = Form.Item;

class PostDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singlePost: {},
            visible: false,
            singlePostComments:[]
        }
    }

    componentDidMount() {

        const {post_id} = this.props.match.params;

        let promises = [
            ReadablesAPI.getSinglePostAPI(post_id),
            ReadablesAPI.getCommentsAPI(post_id)
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

    editPost = (post_id) => {

    };
    deletePost = (post_id) => {
        ReadablesAPI.deletePostsAPI(post_id).then(res => {
            if (res) {
                message.success("Post has been deleted!");
            }
        })
    };

    submitComment = (post_id) => {

    }


    handleVisibleChange = (visible) => {
        this.setState({visible});
    }


    hide = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {singlePost, singlePostComments} = this.state;

        if (!singlePost) {
            return ("Loading");
        } else if (singlePost) {
            return (
                <div>
                    <Row>
                        <Col span={12}>
                            <Card title={singlePost.title} width={400}
                                  extra={<div>
                                      <a onClick={() => this.editPost}>Edit</a><Divider type="vertical"/>
                                      <a onClick={() => this.deletePost(singlePost.id)}>Delete</a></div>}>
                                {singlePost.body}
                                <Divider/>
                                author: {singlePost.author}
                                Date created: {singlePost.timestamp}
                                <Popover
                                    content={<div>
                                        <Form onSubmit={this.submitComment}>
                                            <FormItem>
                                                {getFieldDecorator('comment', {
                                                    //rules: [{required: true, message: 'Please select a category'}],
                                                })(
                                                    <Input placeholder="insert your comment"/>
                                                )}
                                            </FormItem>
                                        </Form>

                                        <Button type="primary" htmlType="submit">Submit</Button>
                                    </div>}
                                    title="Comment this post!"
                                    visible={this.state.visible}
                                    onVisibleChange={this.handleVisibleChange}>
                                    <Button htmlType="button">Comment!</Button>
                                </Popover>

                                <List
                                    itemLayout="horizontal"
                                    dataSource={singlePostComments}
                                    renderItem={item => (
                                        <List.Item actions={[<a onClick={() => this.editPost(item.id)}>EDIT</a>]}>
                                            <List.Item.Meta
                                                description={item.body}
                                            />
                                        </List.Item>
                                    )}
                                />

                            </Card>
                        </Col>
                        <Col span={12}>
                            Edit Post

                        </Col>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetailComponent));
