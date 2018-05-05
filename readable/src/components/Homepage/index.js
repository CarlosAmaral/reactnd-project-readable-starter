import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {connect} from "react-redux";
import {sendCategories} from '../../actions';
import _ from 'lodash';

const {Header, Content, Footer} = Layout;


class Homepage extends Component {
    constructor(props) {
        super(props);
        console.log(props, "props");
    }

    render() {
        let {categories} = this.props;
        const {category} = _.size(this.props.category) > 0 ? this.props.category : {category: 'all'};
        categories = categories || [];
        return (
            <div>
                <div>{categories} blabla bla{categories}</div>

            </div>
        );
    }
}

function mapStateToProps({categories}) {
    return Object.assign({}, categories);
}

function mapDispatchToProps(dispatch) {
    return {
        sendCategories: (category) => dispatch(sendCategories(category))
    }
}

export default connect(mapDispatchToProps, mapStateToProps)(Homepage)