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
    // console.log('~~~~~~~~~this is image:', images)

    useEffect(() => {
        dispatch(getAllImages())
            // dispatch(getAllComments())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    // console.log('~~~~~~~~Object.values(image)', Object.values(images).map(image => (image)))

    if (!user) {
        return (
            <div className='splash_wrapper' id='splash_background'>
                <div className='splash_inside_wrapper'>
                    <h1 id='text_white'>Find your inspiration.</h1><br></br>
                    <h3 id='text_white'>Join the Csárdás community.</h3><br></br>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        <button id='start_free'>START</button>
                    </NavLink>
                    {/* <div id='text_white'><small>Already on Csárdás? <NavLink to='/login' exact={true}>Login</NavLink></small></div> */}
                </div>
            </div>
        )
    }


    return isLoaded && (

        <div className='home_make_long'>
            <div className='home_all_images'>
                {Object.values(images).map(image => (
                    <div className='home_image_wrapper'>
                        <NavLink className='nav_link' to={`/images/${image.id}`}>
                            <img className='home_image' src={image?.image_url} alt='pic didnt load' />

                            <div className='home_image_title'>
                                {image?.title}

                                {/* {image?.description}
                                    <br></br> */}
                                {/* Likes: {image?.likes.length} */}
                            </div>

                            {/* <br></br>
                                Comments: {comments?.length} */}
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
        // <div className='explore-page-wrapper'>
        //     <div className='explore-page'>
        //         <div className='explore-images'>

        //             <div className='home_make_long'>
        //                 <div className='home_all_images'>
        //                     {Object.values(images).map(image => (
        //                         <div className='home_image_wrapper'>
        //                             <NavLink className='nav_link' to={`/images/${image.id}`}>
        //                                 <img className='home_image' src={image?.image_url} alt='pic didnt load' />

        //                                 <div className='home_image_title'>
        //                                     {image?.title}

        //                                     {/* {image?.description}
        //                             <br></br> */}
        //                                     {/* Likes: {image?.likes.length} */}
        //                                 </div>

        //                                 {/* <br></br>
        //                         Comments: {comments?.length} */}
        //                             </NavLink>
        //                         </div>
        //                     ))}
        //                 </div>
        //                 <NavLink className='home_post' to={`/users/${user.id}/images/upload`} exact={true} activeClassName='active'>
        //                     <button className='home_post_image' id='home_post_image'>
        //                         Post an Image
        //                     </button>
        //                 </NavLink><br></br>
        //             </div>


        //         </div>
        //     </div>
        // </div>
    )
}

export default AllImages;


