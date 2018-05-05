import * as ReadablesAPI from '../utils/ReadablesAPI'
import {ADD_CATEGORIES} from "./types";

export function addCategories(categories) {
    return {
        type: ADD_CATEGORIES,
        categories
    }
}

export const _fetchCategoriesFromApi = () => dispatch =>
    new Promise((resolve) =>
        ReadablesAPI.getCategories().then(({categories}) => {
                dispatch(addCategories(categories));
                resolve(categories);
            })
    );

