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

    useEffect(() => {
        dispatch(getAllImages())
            .then(() => setIsLoaded(true))
    }, [dispatch])


    if (!user) {
        return (
            <div className='splash_wrapper' id='splash_background'>
                <div className='splash_inside_wrapper'>
                    <div id='text_white1'>Find your inspiration.</div>
                    <div id='text_white2'>Join the Csárdás community.</div>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        <button id='start_free'>START</button>
                    </NavLink>
                </div>
            </div>
        )
    }


    return isLoaded && (
        <div className='home_make_long'>
            <div id='page_title'>
                <h1>Explore</h1>
            </div>
            <div className='home_all_images'>
                {Object.values(images).reverse().map(image => (
                    <div className='home_image_wrapper'>
                        <NavLink className='nav_link' to={`/images/${image.id}`}>
                            <div id='image_title'>
                                <img className='home_image' src={image?.image_url} alt='pic didnt load' />
                                <div className='home_image_title'>
                                    {image?.title}
                                </div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
            <NavLink className='home_post' to={`/users/${user.id}/images/upload`} exact={true} activeClassName='active'>
                <button className='home_post_image' id='home_post_image'>
                    Post an Image
                </button>
            </NavLink><br></br>
        </div>
    )
}

export default AllImages;


