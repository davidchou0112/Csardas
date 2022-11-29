import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { actionUpdateImage, getSingleImage } from '../../store/images';

const EditImageForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const image = useSelector(state => state.images.singleImage)
    const { imageId } = useParams();

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [imageUrl, setImageUrl] = useState();

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
        const image = {
            id: imageId,
            title,
            imageUrl
        }
        let newImage = await dispatch(actionUpdateImage(image, imageId));

        if (newImage) {
            history.push(`/images/${imageId}`)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/images/${imageId}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Pic Form </h1>
            <input
                value={title}
                type='text'
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>
            <input
                value={description}
                type='text'
                placeholder='Description'
                onChange={(e) => setDescription(e.target.value)}
            />
            <br></br>
            <input
                value={imageUrl}
                type='text'
                placeholder='Image Url'
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <br></br>
            <button type='submit' >Edit Image</button>
            <button onClick={handleCancel} type='button'>Cancel</button>
        </form>

    )
}
export default EditImageForm