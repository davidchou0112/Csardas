import React from 'react';
import { useDispatch } from 'react-redux';
import UploadPicture from '../CreateImage';

const PostImage = () => {
    const dispatch = useDispatch();



    return (
        <div>
            <h1>Post Image Here</h1>

            <UploadPicture />
        </div>
    )
}
export default PostImage;