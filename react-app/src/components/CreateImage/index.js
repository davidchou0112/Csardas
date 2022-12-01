import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { csrfFetch } from '../../store/csrf';
import './index.css'


// const UploadPicture = ({ user_id }) => {
const UploadPicture = () => {

    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const user_id = useSelector(state => state.session.user)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);


        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        // const res = await fetch('/api/images', {
        await fetch(`/api/users/aws`, {
            method: "POST",
            body: formData,
        })
            .then(async (url) => {
                // console.log('did you get in here????')
                let imgUrl = await url.text()
                const newImage = {
                    title,
                    description,
                    image_url: imgUrl
                }
                // res is used incase you want to check for if res.ok
                const res = await csrfFetch(`/api/users/${user_id.id}/images`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newImage),
                })
                if (res.ok) {
                    setImageLoading(false)
                }
            })
            .catch(() => {
                alert('failed!')
            })
        history.push('/')
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form className="post_image_input_wrapper" onSubmit={handleSubmit}>
            <label>Title
            </label>
            <input
                id="title_input"
                value={title}
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'

            /><br></br>

            <label>Description
            </label>
            <textarea
                id="textarea"
                value={description}
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Description'
            /><br></br>

            <label>Image Url</label><br></br>
            <input
                id="image_input"
                type="file"
                accept="image/*"
                onChange={updateImage}
            /><br></br>
            <button id="cursor_pointer" type="submit">Submit</button>
            {(imageLoading) && <p>Loading...</p>}
        </form>
    )
}

export default UploadPicture;