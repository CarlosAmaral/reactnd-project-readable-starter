import {ADD_POSTS, GET_POSTS} from '../actions';
import * as _ from 'lodash';

export default function posts(state = {}, action) {
    let posts = state.posts ? state.posts.slice() : [];
    switch (action.type) {
        case ADD_POSTS:
            posts = _.union(posts, action.posts);
            return Object.assign({}, state, {posts});
        default:
            return state;
    }
}