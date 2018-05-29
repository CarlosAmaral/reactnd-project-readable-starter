import * as ReadablesAPI from '../utils/ReadablesAPI';
import {ADD_POSTS, GET_POSTS} from "./types";

export function addPostsAction({posts}) {
    return {
        type: ADD_POSTS,
        posts
    }
}

export const getPostsFromAPI = () => dispatch => (
    new Promise((resolve) =>
        ReadablesAPI.getPostsAPI()
            .then(posts => {
                dispatch(addPostsAction({posts}));
                resolve(posts);
            }))
);