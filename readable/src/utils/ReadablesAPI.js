const url = 'http://localhost:3001';
const headers = {'Authorization': 'whatever-you-want'};


/**
 * Get Categories
 * @returns {Promise<any>}
 */

export function getCategoriesAPI() {
    return fetch(`${url}/categories`,
        {method: 'GET', headers})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err);
}

export function getPostsAPI() {
    return fetch(`${url}/posts`, {method: 'GET', headers})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err);

}

export function thumbsupPostAPI(key) {
    console.log(key);
    return fetch(`${url}/posts/${key}`, {
        method: 'POST', headers, body: {
            option: 'upVote'
        }
    })
        .then(res => {
            res.json()
        })
        .then(data => {
            console.log(data, "DATA");
        })
        .catch(err => err);

}