// import { csrfFetch } from './csrf';


// CONSTANTS 

const GET_ALL_IMAGES = 'images/displayAllImages';
const GET_SINGLE_IMAGE = 'images/displaySingleImage';
const POST_IMAGE = 'images/postImage';
const UPDATE_IMAGE = 'images/updateImage';
const DELETE = 'images/deleteImage';

// REGULAR ACTION CREATOR

const displayAllImages = (images) => {
    return {
        type: GET_ALL_IMAGES,
        images
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

        default:
            return { ...state };
    }
}
export default imagesReducer;