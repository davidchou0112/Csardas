import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleImage } from '../../store/images';
import { useParams } from 'react-router-dom'
import EditImageForm from '../EditImage';

const SingleImage = () => {
    const dispatch = useDispatch();
    const image = useSelector(state => state.images.singleImage)
    // console.log('~~~~~~~~~~~this is image:', image)

    const { imageId } = useParams();
    // const likes = image.likes.length
    useEffect(() => {
        dispatch(getSingleImage(imageId))
    }, [dispatch, imageId])

    return (
        <div>
            <h1>{image?.title}</h1>
            <img src={image?.image_url} alt='pic didnt load' />
            <br></br>
            {image?.description}
            <br></br>
            {/* Likes: {likes} */}
            <div>
                <EditImageForm />
            </div>
        </div>
    )
}
export default SingleImage;