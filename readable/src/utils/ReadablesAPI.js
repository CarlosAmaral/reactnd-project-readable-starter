import * as helpers from '../utils/helpers';

const url = 'http://localhost:3001';
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'F7t0Bb2tJk'
};

//const result = helpers.guid();

/**
 * Get Categories
 * @returns {Promise<any>}
 */

export function getCategoriesAPI() {
    return fetch(`${url}/categories`,
        {method: 'GET', headers})
        .then(res => res.json())
        .catch(err => err);
}

export function getPostsAPI() {
    return fetch(`${url}/posts`, {method: 'GET', headers})
        .then(res => res.json())
        .catch(err => err);

}

export function createPostsAPI(values) {
    return fetch(`${url}/posts`, {method: 'POST', body: JSON.stringify(values), headers})
        .then(res => res.json())
        .catch(err => err);

}

export function thumbsupPostAPI(key) {

    return fetch(`${url}/posts/${key}`, {
        method: 'POST', headers,
        body: JSON.stringify({
            option: 'upVote'
        })
    }).then(res => res.json())
        .catch(err => err);

}

export function thumbsdownPostAPI(key) {

    return fetch(`${url}/posts/${key}`, {
        method: 'POST', headers,
        body: JSON.stringify({
            option: 'downVote'
        })
    }).then(res => res.json())
        .catch(err => err);

}