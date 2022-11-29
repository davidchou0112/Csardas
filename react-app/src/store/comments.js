import { csrfFetch } from "./csrf";

// CONSTANTS

const GET_ALL_COMMENTS = 'comments/displayAllComments';
const GET_SINGLE_COMMENT = 'comments/displaySingleComment';
const CREATE_COMMENT = 'comments/postComment';
const EDIT_COMMENT = 'comments/editComment';
const DELETE = 'comments/deleteComment';

// REGULAR ACTION CREATOR

const displayAllComments = (comments) => {
    return {
        type: GET_ALL_COMMENTS,
        comments
    }
}

// THUNK

export const getAllComments = (imageId) => async dispatch => {
    const response = await fetch(`/api/comments/images/${imageId}`);
    // const response = await fetch(`/api/users/${userId}/comments`);


    if (response.ok) {
        const data = await response.json()
        dispatch(displayAllComments(data))
    }
}

// REDUCER
const initialState = { allComments: {}, singleComment: {} };
const commentsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALL_COMMENTS:
            newState = {
                ...state,
                allComments: {}
            }
            action.comments.forEach(el => {
                newState.allComments[el.id] = el
            })
            return newState

        case GET_SINGLE_COMMENT:
            newState = {
                ...state,
                singleComment: { ...action.singleComment }
            }
            return newState

        case EDIT_COMMENT:
            newState = {
                ...state,
                singleComment: { ...action.singleComment }
            }
            return newState

        default:
            return { ...state };
    }
}
export default commentsReducer;