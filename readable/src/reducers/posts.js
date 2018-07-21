import {ADD_POSTS, GET_POSTS, THUMBSUP_POST, THUMBSDOWN_POST} from '../actions';
import * as _ from 'lodash';

export default function posts(state = {}, action) {
    //let {posts, post} = action;
    let posts = state.posts ? state.posts.slice() : [];

    switch (action.type) {
        case ADD_POSTS:
            posts = _.union(posts, action.posts);
            return Object.assign({}, state, {posts})
        // upvote a post
        case THUMBSUP_POST:
            let voteScoreAux = posts.find(k => k.key === posts.key)
            return {
                ...state,
                [voteScoreAux]: {
                    ...state[voteScoreAux],
                    'voteScore': state[voteScoreAux]['voteScore'] + 1
                }
            };
        default:
            return state;

    }
}