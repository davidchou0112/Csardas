import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { getAllComments } from '../../store/comments';
import { getAllImages } from '../../store/images';
import './allImages.css'

const AllImages = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.images?.allImages)
    const comments = useSelector(state => Object.values(state.comments?.allComments))

    // console.log('~~~~~~~~~this is image:', images)

    useEffect(() => {
        dispatch(getAllImages())
        // dispatch(getAllComments())
    }, [dispatch])

    // console.log('~~~~~~~~Object.values(image)', Object.values(images).map(image => (image)))

    return (
        <div>
            <h1>Home Page</h1>
            <div className='home_all_images'>
                {Object.values(images).map(image => (
                    <div className='home_image_wrapper'>
                        <NavLink to={`/images/${image.id}`}>
                            <img className='home_image' src={image?.image_url} alt='pic didnt load' />
                            <div className='home_image_title'>
                                {image?.title}
                            </div>
                            {/* <br></br>
                            {image?.description}
                            <br></br>
                            Likes: {image?.likes.length}
                            <br></br>
                            Comments: {comments?.length} */}
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllImages;