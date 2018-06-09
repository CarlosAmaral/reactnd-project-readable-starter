const url = 'http://localhost:3001';
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'F7t0Bb2tJk'
};


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

/**
 * GET POSTS
 * @returns {Promise<Response>}
 */

export function getPostsAPI() {
    return fetch(`${url}/posts`, {method: 'GET', headers})
        .then(res => res.json())
        .catch(err => err);

}


/**
 * CREATE POSTS
 * @param values
 * @returns {Promise<Response>}
 */

export function createPostsAPI(values) {
    return fetch(`${url}/posts`, {method: 'POST',
        body: JSON.stringify(values), headers})
        .then(res => res.json())
        .catch(err => err);

}

/**
 * EDIT POSTS
 * @param values
 * @returns {Promise<Response>}
 */

export function editPostsAPI(values) {
    return fetch(`${url}/posts`, {method: 'PUT',
        body: JSON.stringify(values), headers})
        .then(res => res.json())
        .catch(err => err);

}

/**
 * DELETE POSTS
 * @param key
 * @returns {Promise<Response>}
 */

export function deletePostsAPI(key) {
    return fetch(`${url}/posts/${key}`, {method: 'DELETE',headers})
        .then(res => res.json())
        .catch(err => err);

}

/**
 * UPVOTE POST
 * @param key
 * @returns {Promise<Response>}
 */

export function thumbsupPostAPI(key) {
    return fetch(`${url}/posts/${key}`, {
        method: 'POST', headers,
        body: JSON.stringify({
            option: 'upVote'
        })
    }).then(res => res.json())
        .catch(err => err);

}

/**
 * DOWNVOTE POST
 * @param key
 * @returns {Promise<Response>}
 */

export function thumbsdownPostAPI(key) {

    return fetch(`${url}/posts/${key}`, {
        method: 'POST', headers,
        body: JSON.stringify({
            option: 'downVote'
        })
    }).then(res => res.json())
        .catch(err => err);

}