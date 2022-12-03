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
    let ErrorMessage = [];

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
        if (!title || title.length < 1 || title.length > 20) ErrorMessage.push("*Must have a title that is less than 20 characters.");
        if (!description || description.length < 1 || description.length > 500) ErrorMessage.push("*Must have a description that is less than 500 characters.");
        if (!imageUrl) ErrorMessage.push('Image Url cannot be empty.')
        // console.log('1')
        // console.log('1.1', ErrorMessage)
        setError(ErrorMessage)
        // console.log('2')

        if (ErrorMessage?.length) return;
        // console.log('3')

        const formData = new FormData();
        // console.log('image, ln51 ', image)
        if (!image) {
            // console.log('imageUrl from front end -- before setImageUrl', imageUrl)
            setImageUrl(image.image_url)
            // console.log('imageUrl from front end -- after setImageUrl', imageUrl)
            // setImage(image)
        }
        formData.append("image", images);
        // console.log('formData, front end', formData)

        await fetch(`/api/users/aws`, {
            method: "POST",
            body: formData,
        })
            .then(async (url) => {
                // console.log('this is after .then, ln66')
                let imgUrl = await url.text()
                let newImage;
                if (imgUrl.includes('No files found')) {
                    // console.log(`111111111111111`)
                    newImage = {
                        title,
                        description,
                        image_url: 'please'
                    }

                }
                else if (imgUrl.includes('file type not permitted')) {
                    ErrorMessage = ['Must be proper image type. (.jpg, .jpeg, .png, .gif, .pdf)']
                    // console.log(`=============error:`, error)
                    // console.log(`=============error:`, ErrorMessage)

                    return;
                }
                else {
                    // console.log(`22222222222222222222`)

                    newImage = {
                        title,
                        description,
                        image_url: imgUrl
                    }
                }
                dispatch(actionUpdateImage(newImage, imageId))

            })
            .catch(() => { alert('failed') })

        // console.log('image, ln90 ', image)
        // console.log('~~~~~this is error', error)
        // if (!error.length) {
        if (!ErrorMessage.length) {

            history.push(`/images/${imageId}`)
            setShowModal(false)
        } else {
            // console.log('did i get here???')
            setError(ErrorMessage)
            // return;
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/images/${imageId}`)
        setShowModal(false)
    }

    const updateImage = (e) => {
        const file = e.target.files[0];

        // console.log('this is file', file)
        // console.log('this is image', image)
        // if (!file) {
        //     setImage(image)
        // }
        setImage(file);

    }

    return (
        <form className='edit_image_wrapper' id='edit_image_wrapper' onSubmit={handleSubmit}>
            <h1>Edit Image</h1>
            <div className='error'>{error.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}</div><br></br>
            <label>Title:</label>
            <input
                id='title_input'
                value={title}
                type='text'
                placeholder='Title'
                required={true}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>
            <label>Description:</label>
            <textarea
                id='textarea'
                value={description}
                type='text'
                placeholder='Description'
                required={true}
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
            <button id='leave_comment' type='submit' >
                Submit Changes
            </button>
            <button id='leave_comment' onClick={handleCancel} type='button'>Cancel</button>
        </form>

    )
}
export default EditImageForm