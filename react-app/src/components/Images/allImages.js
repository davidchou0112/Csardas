import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllImages } from '../../store/images';

const AllImages = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.images.allImages)
    // console.log('~~~~~~~~~this is image:', images)

    useEffect(() => {
        dispatch(getAllImages())
    }, [dispatch])

    // console.log('~~~~~~~~Object.values(image)', Object.values(images).map(image => (image)))

    return (
        <div>
            <h1>Home Page</h1>
            {Object.values(images).map(image => (
                <NavLink to={`/images/${image.id}`}>
                    <img src={image?.image_url} alt='pic didnt load' />
                    <br></br>
                    {image?.title}
                    <br></br>
                    {image?.description}
                    <br></br>
                    Likes: {image?.likes.length}
                </NavLink>
            ))}
        </div>
    )
}

export default AllImages;