import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UploadPicture from '../CreateImage';
import './postImage.css'

const PostImage = () => {
    const user = useSelector(state => state.session.user)
    if (!user) {
        return (Redirect('/'))
    }
    return (
        <div className='post_image_wrapper'>
            <h1>Post Image Here</h1><br></br>
            <UploadPicture />
        </div>
    )
}
export default PostImage;