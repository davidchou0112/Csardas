import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UploadPicture from '../CreateImage';

const PostImage = () => {
    const user = useSelector(state => state.session.user)
    if (!user) {
        return (Redirect('/'))
    }
    return (
        <div>
            <h1>Post Image Here</h1>
            <UploadPicture />
        </div>
    )
}
export default PostImage;