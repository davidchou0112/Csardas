import { csrfFetch } from "./csrf";

const GET_ALL_TAGS = 'tags/displayAllTags';

const displayAllTags = (payload) => {
    return {
        type: GET_ALL_TAGS,
        payload
    }
}

export const getAllTags = () => async dispatch => {
    const response = await fetch(`/api/tags`);

    if (response.ok) {
        const data = await response.json()
        dispatch(displayAllTags(data));
    }
}

const initialState = { allTags: {}, singleTag: {} };
const tagsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALL_TAGS:
            newState = {
                ...state,
                allTags: {}
            }
            action.payload.forEach(el => {
                newState.allTags[el.id] = el
            })
            return newState

        default:
            return { ...state };
    }
}
export default tagsReducer;