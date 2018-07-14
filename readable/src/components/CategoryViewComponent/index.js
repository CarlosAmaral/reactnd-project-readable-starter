import * as actionCreators from "../../actions";
import {bindActionCreators} from "redux/index";

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CategoryViewComponent extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}


export default CategoryViewComponent;


function mapStateToProps(posts, categories) {
    return {posts: posts, categories: categories}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}