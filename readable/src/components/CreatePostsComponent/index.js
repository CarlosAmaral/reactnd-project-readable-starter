import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Input} from "antd";

const FormItem = Form.Item;

class CreatePostsComponent extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {

        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input placeholder="Username"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {})(
                            <Input type="password"
                                   placeholder="Password"/>
                        )}
                    </FormItem>
                    <Button htmlType="submit">Create Post</Button>
                </Form>

            </div>
        );
    }
}

const CreatePostsComponentForm = Form.create()(CreatePostsComponent);

export default CreatePostsComponentForm;
