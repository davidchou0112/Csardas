import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { actionUpdateImage, getSingleImage } from '../../store/images';

const EditImageForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const image = useSelector(state => state.images.singleImage)
    const { imageId } = useParams();

    const [images, setImage] = useState(null);

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
                type="file"
                accept="image/*"
                onChange={updateImage}
            />
            <br></br>
            <button type='submit' >Edit Image</button>
            <button onClick={handleCancel} type='button'>Cancel</button>
        </form>

    )
}
export default EditImageForm