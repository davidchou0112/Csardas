import { csrfFetch } from './csrf';


// CONSTANTS 

const GET_ALL_IMAGES = 'images/displayAllImages';
const GET_SINGLE_IMAGE = 'images/displaySingleImage';

// might not need anymore because can already create the image through aws
const POST_IMAGE = 'images/postImage';

const UPDATE_IMAGE = 'images/updateImage';
const DELETE = 'images/deleteImage';

// REGULAR ACTION CREATOR

const displayAllImages = (images) => {
    // console.log('~~~~~~~~~~~this is images from displayAllImages:', images)
    return {
        type: GET_ALL_IMAGES,
        images
    }
}

const displaySingleImage = (singleImage) => {
    return {
        type: GET_SINGLE_IMAGE,
        singleImage
    }
}

const updateImage = (singleImage) => {
    return {
        type: UPDATE_IMAGE,
        singleImage
    }
}

// THUNK

export const getAllImages = () => async dispatch => {
    const response = await fetch(`/api/images`);

    if (response.ok) {
        const data = await response.json()
        dispatch(displayAllImages(data));
    }
}

export const getSingleImage = (imageId) => async dispatch => {
    const response = await fetch(`/api/images/${imageId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(displaySingleImage(data))
    }
}

export const actionUpdateImage = (update, imageId) => async dispatch => {
    const response = await csrfFetch(`/api/images/${imageId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    })

    if (response.ok) {
        const updatedImage = await response.json();
        dispatch(updateImage(updatedImage))

        return updateImage
    }
}

// REDUCER

const initialState = { allImages: {}, singleImage: {} };
const imagesReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALL_IMAGES:
            newState = {
                ...state,
                allImages: {}
            }
            action.images.forEach(el => {
                newState.allImages[el.id] = el
            })
            return newState

        case GET_SINGLE_IMAGE:
            newState = {
                ...state,
                singleImage: { ...action.singleImage }
            }
            return newState

        case UPDATE_IMAGE:
            newState = {
                ...state,
                singleImage: { ...action.singleImage }
            }
            return newState

        default:
            return { ...state };
    }
}
export default imagesReducer;