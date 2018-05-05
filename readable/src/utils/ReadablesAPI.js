const url = 'localhost:3001';
const headers = {'Authorization': 'whatever-you-want'};


/**
 * Get Categories
 * @private
 */

export const _getCategories = () => {

    fetch(`${url}/categories`,
        {method: 'GET', headers})
        .then(res => res.text())
        .then(data => data)
        .catch(err => err);
};