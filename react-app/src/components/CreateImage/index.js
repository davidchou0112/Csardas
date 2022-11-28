import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { csrfFetch } from '../../store/csrf';


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
                console.log('did you get in here????')
                let imgUrl = await url.text()
                const newImage = {
                    title,
                    description,
                    image_url: imgUrl
                }
                const res = await csrfFetch(`/api/users/${user_id.id}/images`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newImage),
                })

            })
            .catch(() => {
                alert('failed!')
            })
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
            </label>
            <input
                value={title}
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'

            />
            <label>
            </label>
            <input
                value={description}
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Description'
            />

            <input
                type="file"
                accept="image/*"
                onChange={updateImage}
            />
            <button type="submit">Submit</button>
            {(imageLoading) && <p>Loading...</p>}
        </form>
    )
}

export default UploadPicture;