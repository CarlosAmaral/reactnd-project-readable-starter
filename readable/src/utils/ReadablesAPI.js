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
    return fetch(`${url}/posts`, {method:'GET', headers})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err);

}