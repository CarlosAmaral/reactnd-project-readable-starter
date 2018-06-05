/* Types of Actions */

// categories
export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SEND_CATEGORY = 'SEND_CATEGORY';

export function getCategoriesAction({categories}) {
    return {type: GET_CATEGORIES, categories};
}

//posts
export const ADD_POSTS = 'ADD_POSTS';
export const GET_POSTS = 'GET_POSTS';
export const THUMBSUP_POST = 'THUMBSUP_POST';
export const THUMBSDOWN_POST = 'THUMBSDOWN_POST';


export function getPostsAction({posts}) {
    return {type: GET_POSTS, posts};
}