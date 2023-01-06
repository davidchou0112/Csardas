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
    const [error, setError] = useState([]);
    let errors = [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError([]);
        const formData = new FormData();
        formData.append("image", image);

        if (!title || title.length < 1 || title.length > 20) errors.push("*Must have a title that is less than 20 characters.");
        if (!description || description.length < 1 || description.length > 500) errors.push("*Must have a description that is less than 500 characters.");
        if (!image) errors.push('*Must upload an image file')

        setError(errors);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        if (errors.length) {
            return
        } else {
            setImageLoading(true);

            // const res = await fetch('/api/images', {
            await fetch(`/api/users/aws`, {
                method: "POST",
                body: formData,
            })
                .then(async (url) => {
                    let imgUrl = await url.text()
                    if (imgUrl.includes("not permitted")) {
                        setError(["Only png/jpg/jpeg/gif allowed"])
                        return
                    }
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
                    history.push('/')
                })
                .catch(() => {
                    alert('failed!')
                })
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form className="post_image_input_wrapper" id="post_image_background" onSubmit={handleSubmit}>
            <div id="error">
                {error.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div> <br></br>
            <label>Title
            </label><br></br>
            <input
                id="title_input"
                value={title}
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'

            /><br></br>

            <label>Description
            </label><br></br>
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
            <button id="submit" type="submit">Submit</button>
            {(imageLoading)}
        </form>
    )
}

export default UploadPicture;