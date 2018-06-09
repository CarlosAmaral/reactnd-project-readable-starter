import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Select, Form, Input, Row, Col} from "antd";
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

    handleSubmit = (e) => {
        e.preventDefault();
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

                ReadablesAPI.createPostsAPI(payload);

                console.log('Received values of form: ', values);
            }
        });
    };

    render() {

        const {getFieldDecorator} = this.props.form;

        const {categories} = this.props.posts.categories;

        if (!categories) {
            return ("Loading")
        }

        else if (categories) {
            return (
                <div>
                    <Row type="flex" align="center">
                        <Col>
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
                                        <Select style={{width: 120}}>
                                            {categories.map(item =>
                                                <Option key={item.name} value={item.name}>{item.name}</Option>
                                            )}
                                        </Select>
                                    )}

                                </FormItem>
                                <Button htmlType="submit">Create Post</Button>
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
