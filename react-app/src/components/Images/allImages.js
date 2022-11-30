import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllComments } from '../../store/comments';
// import { getAllComments } from '../../store/comments';
import { getAllImages } from '../../store/images';
import './allImages.css'

const AllImages = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state => state.session.user)
    const images = useSelector(state => state.images?.allImages)
    const comments = useSelector(state => Object.values(state.comments?.allComments))
    console.log('~~~~~~~~~this is image:', images)

    useEffect(() => {
        dispatch(getAllImages())
        dispatch(getAllComments())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    // console.log('~~~~~~~~Object.values(image)', Object.values(images).map(image => (image)))

    if (!user) {
        return (
            <div className='splash_wrapper' id='splash_background'>
                <div className='splash_inside_wrapper'>
                    <h1>Find your inspiration.</h1>
                    <h2>Join the Csárdás community.</h2>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        <button>Get Started</button>
                    </NavLink>
                    <div><small>Already on Csárdás? <NavLink to='/login' exact={true}>Login</NavLink></small></div>
                </div>
            </div>
        )
    }


    return isLoaded && (
        <div id='home_background'>
            <div className='home_make_long'>
                <div className='home_all_images'>
                    {Object.values(images).map(image => (
                        <div className='home_image_wrapper'>
                            <NavLink to={`/images/${image.id}`}>
                                <img className='home_image' src={image?.image_url} alt='pic didnt load' />
                                <div className='home_image_title'>
                                    {image?.title}
                                    <br></br>
                                    {/* {image?.description}
                                <br></br> */}
                                    Likes: {image?.likes.length}
                                </div>
                                {/* <br></br>
                                Comments: {comments?.length} */}
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllImages;