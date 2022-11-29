import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteImage, getSingleImage, getAllImages } from '../../store/images';
import { Redirect, useHistory, useParams } from 'react-router-dom'
import EditImageForm from '../EditImage';
import AllComments from '../Comments';
import './singleImage.css'
import UpdateImageModal from '../EditImage/editModal';

const SingleImage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const image = useSelector(state => state.images?.singleImage)
    // console.log('~~~~~~~~~~~this is image:', image)
    const user = useSelector(state => state.session.user);
    // console.log('~~~~~~~~~~~~~user:', user)
    const { imageId } = useParams();
    const likes = image?.likes?.length
    // console.log('======this is likes:', likes)
    useEffect(() => {
        // console.log('~~~~~~~~~~~~useEffect loaded~~~~~~~~~~~~~')
        dispatch(getSingleImage(imageId))
    }, [dispatch, imageId])
    // console.log('did i get here, before return?')
    if (user) {
        if (user.id !== image.user_id) {
            return (
                <div>
                    <h1>{image?.title}</h1>
                    <div className='single_image_wrapper'>
                        <img className='single_image' src={image?.image_url} alt='pic didnt load' />
                        <br></br>
                        {image?.description}
                        <br></br>
                        Likes: {likes}

                        <div className='comments_position'>
                            <AllComments imageId={imageId} />
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <h1>{image?.title}</h1>
                <div className='single_image_wrapper'>
                    <img className='single_image' src={image?.image_url} alt='pic didnt load' />
                    <br></br>
                    {image?.description}
                    <br></br>
                    Likes: {likes}

                    <div className='comments_position'>
                        <AllComments imageId={imageId} />
                    </div>

                    <div>
                        <UpdateImageModal />
                    </div>
                    <button className='deleteButton'
                        onClick={() => dispatch(actionDeleteImage(image.id), dispatch(getAllImages()).then(history.push('/')))}>
                        Delete Image
                    </button>
                </div>
            </div>
        )
    }
    return (
        Redirect('/')
    )
}
export default SingleImage;