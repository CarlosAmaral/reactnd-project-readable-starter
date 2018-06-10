import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Select, Form, Input, Row, Col, List, Icon} from "antd";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as helpers from "../../utils/helpers";
import * as ReadablesAPI from "../../utils/ReadablesAPI";

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

class CreatePostsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            editPostId: null

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.editMode) {
            this.props.form.validateFields((err, values) => {
                let payload = {
                    title: values.title,
                    body: values.body
                };
                return ReadablesAPI.editPostsAPI(payload, this.state.editPostId);
            });
        }

        if (!this.state.editMode)
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let payload = {
                        id: helpers.guid(),
                        timestamp: new Date(),
                        title: values.title,
                        body: values.body,
                        author: values.author,
                        voteScore: 1,
                        category: values.category
                    };
                    return ReadablesAPI.createPostsAPI(payload);
                }
            });
    };

    editPost = (id) => {
        const {posts} = this.props.posts.posts;
        const item = posts.find(f => f.id === id);
        if (item) {
            this.props.form.setFieldsValue({
                title: item.title,
                body: item.body,
                author: item.author,
                category: item.category
            });
            this.setState({
                editPostId: item.id,
                editMode: true
            })
        }
    };

    cancelEditMode = () => {
        this.props.form.resetFields();
        this.setState({
            editMode: false
        })
    };

    render() {

        const {getFieldDecorator} = this.props.form;

        const {editMode} = this.state;
        const {categories} = this.props.posts.categories;
        const {posts} = this.props.posts.posts;

        if (!categories) {
            return ("Loading")
        }

        else if (categories) {
            return (
                <div>
                    <Row gutter={48} type="flex" align="start">
                        <Col span={8}>
                            <h4 type="primary">Available Posts</h4>
                            <List
                                itemLayout="horizontal"
                                dataSource={posts}
                                renderItem={item => (
                                    <List.Item actions={[<a onClick={() => this.editPost(item.id)}>EDIT</a>]}>
                                        <List.Item.Meta
                                            title={item.title}
                                            description={item.body}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={14}>
                            <h4 type="primary">Edit/Create Posts</h4>
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
                                                <Option key={item.name} value={item.name}>{item.name}</Option>
                                            )}
                                        </Select>
                                    )}

                                </FormItem>

                                {editMode &&
                                <div>
                                    <Button htmlType="submit" type="primary">Edit Post</Button>
                                    <Button htmlType="button" onClick={this.cancelEditMode}
                                            type="default">Cancel</Button>
                                </div>
                                }
                                {!editMode &&
                                <Button htmlType="submit" type="primary">Create Post</Button>
                                }

                            </Form>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

const CreatePostsComponentForm = Form.create()(CreatePostsComponent);

function mapStateToProps(posts, categories) {
    return {posts: posts, categories: categories}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePostsComponentForm));
