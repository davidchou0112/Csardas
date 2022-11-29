import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { actionUpdateImage, getSingleImage } from '../../store/images';

const EditImageForm = () => {
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
                // console.log('~~~did i get here in handlesubmit??')
                // const res = await csrfFetch(`/api/images/${imageId}`, {
                //     method: "PUT",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify(newImage),
                // })
            })
        // const image = {
        //     title,
        //     description,
        //     imageUrl
        // }
        // let newImage = await dispatch(actionUpdateImage(image, imageId));

        // if (newImage) {
        history.push(`/images/${imageId}`)
        // }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/images/${imageId}`)
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
            {/* <input
                value={imageUrl}
                type='text'
                placeholder='Image Url'
                onChange={(e) => setImageUrl(e.target.value)}
            /> */}
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