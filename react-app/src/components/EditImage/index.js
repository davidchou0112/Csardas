import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { actionUpdateImage, getSingleImage } from '../../store/images';
import './EditImage.css'

const EditImageForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const image = useSelector(state => state.images.singleImage)
    const { imageId } = useParams();

    const [images, setImage] = useState(null);

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [imageUrl, setImageUrl] = useState();

    // validation
    const [error, setError] = useState([])
    let Error = [];

    useEffect(() => {
        dispatch(getSingleImage(imageId))
    }, [dispatch, imageId])

    useEffect(() => {
        if (image) {
            setTitle(image.title);
            setDescription(image.description);
            setImageUrl(image.image_url)
        }
    }, [image])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError([]);
        if (!title || title.length < 1 || title.length > 20) Error.push("*Must have a title that is less than 20 characters.");
        if (!description || description.length < 1 || description.length > 500) Error.push("*Must have a description that is less than 500 characters.");
        // if (!imageUrl) Error.push('Image Url cannot be empty.')
        setError(Error)
        if (error) return;

        const formData = new FormData();
        formData.append("image", images);

        await fetch(`/api/users/aws`, {
            method: "POST",
            body: formData,
        })
            .then(async (url) => {
                let imgUrl = await url.text()
                const newImage = {
                    title,
                    description,
                    image_url: imgUrl
                }
                dispatch(actionUpdateImage(newImage, imageId))
            })
        history.push(`/images/${imageId}`)
        setShowModal(false)
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/images/${imageId}`)
        setShowModal(false)
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form className='edit_image_wrapper' onSubmit={handleSubmit}>
            <h1>Edit Image</h1><br></br>
            <div className='error'>{error.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}</div><br></br>
            <label>Title:</label>
            <input
                id='title_input'
                value={title}
                type='text'
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>
            <label>Description:</label>
            <textarea
                id='textarea'
                value={description}
                type='text'
                placeholder='Description'
                onChange={(e) => setDescription(e.target.value)}
            />
            <br></br>
            <input
                id="image_input"
                type="file"
                accept="image/*"
                onChange={updateImage}
            />
            <br></br>
            <button id='cursor_pointer' type='submit' >
                Submit Changes
            </button>
            <button id='cursor_pointer' onClick={handleCancel} type='button'>Cancel</button>
        </form>

    )
}
export default EditImageForm