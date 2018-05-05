import {SEND_CATEGORY} from "../actions/types";

export default function categories(state = {}, action) {
    switch (action.type) {
        case SEND_CATEGORY:
            return Object.assign({}, state, {category: action.category});
        default:
            return state;
    }

}