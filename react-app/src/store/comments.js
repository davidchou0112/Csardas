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

const displaySingleComment = (singleComment) => {
    return {
        type: GET_SINGLE_COMMENT,
        singleComment
    }
}

const postComment = (singleComment) => {
    return {
        type: CREATE_COMMENT,
        singleComment
    }
}

const editComment = (singleComment) => {
    return {
        type: EDIT_COMMENT,
        singleComment
    }
}

const deleteComment = (commentId) => {
    return {
        type: DELETE,
        commentId
    }
}



// THUNK

export const getAllComments = (imageId) => async dispatch => {
    const response = await fetch(`/api/comments/images/${imageId}`);

    if (response.ok) {
        const data = await response.json()
        dispatch(displayAllComments(data))
    }
}

export const getSingleComments = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`);

    if (response.ok) {
        const data = await response.json()
        dispatch(displaySingleComment(data))
    }
}

export const createComment = (singleComment, imageId) => async dispatch => {
    const response = await csrfFetch(`/api/images/${imageId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleComment)
    })
    if (response.ok) {
        const newComment = await response.json();
        dispatch(postComment(newComment))

        return newComment
    }
}

export const updateComment = (update, commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    })

    if (response.ok) {
        const updatedComment = await response.json()
        dispatch(editComment(updatedComment))

        return editComment
    }
}

export const actionDeleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        await dispatch(deleteComment(commentId))
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

        case CREATE_COMMENT:
            newState = { ...state }
            newState.allComments[action.singleComment.id] = action.singleComment
            return newState


        case EDIT_COMMENT:
            newState = {
                ...state,
                singleComment: { ...action.singleComment }
            }
            return newState

        case DELETE:
            newState = {
                allComments: { ...state.allComments },
                singleComment: {}
            }
            delete newState.allComments[action.commentId]
            return newState

        default:
            return { ...state };
    }
}
export default commentsReducer;