import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages } from '../../store/images';

const AllImages = () => {
    const dispatch = useDispatch();
    const image = useSelector(state => state.images.allImages)
    console.log('this is image:', image)

    useEffect(() => {
        dispatch(getAllImages())
    }, [dispatch])

    return (
        <div>
            <h1>Display All Images Here</h1>
            <img src={image['1']?.image_url} alt='pic didnt load' />
            {/* <div>{image[0].image_url}</div> */}
        </div>
    )
}

export default AllImages;