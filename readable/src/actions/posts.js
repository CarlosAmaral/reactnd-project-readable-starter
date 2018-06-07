import * as ReadablesAPI from '../utils/ReadablesAPI';
import {ADD_POSTS, GET_POSTS, THUMBSDOWN_POST, THUMBSUP_POST} from "./types";

export function addPostsAction({posts}) {
    return {
        type: ADD_POSTS,
        posts
    }
}


export function thumbsupPost({key}) {
    return {type: THUMBSUP_POST, key};
}



export const postThumbsupFromAPI = (key) => dispatch => (
    new Promise((resolve) =>
        ReadablesAPI.thumbsupPostAPI(key)
            .then(posts => {
                dispatch(thumbsupPost({key}));
                resolve(posts);
            }))
);

export const postThumbsdownFromAPI = (key) => dispatch => (
    new Promise((resolve) =>
        ReadablesAPI.thumbsdownPostAPI(key)
            .then(posts => {
                dispatch(thumbdownPost({key}));
                resolve(posts);
            }))
);


export const thumbdownPost = ({key}) => {

    return {type: THUMBSDOWN_POST, key};
};



export const getPostsFromAPI = () => dispatch => (
    new Promise((resolve) =>
        ReadablesAPI.getPostsAPI()
            .then(posts => {
                dispatch(addPostsAction({posts}));
                resolve(posts);
            }))
);