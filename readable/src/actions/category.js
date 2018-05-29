import {SEND_CATEGORY} from "./types";

/*export function addCategory(category) {
    return {
        type: ADD_CATEGORY,
        category
    }
}*/

export function sendCategories(category) {
    return {
        type: SEND_CATEGORY,
        category
    }
}
