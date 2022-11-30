import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteImage, getSingleImage, getAllImages } from '../../store/images';
import { Redirect, useHistory, useParams } from 'react-router-dom'
import AllComments from '../Comments';
import './singleImage.css'
import UpdateImageModal from '../EditImage/editModal';
import CreateCommentModal from '../CreateComment/createCommentModal';
import EditCommentModal from '../EditComment/editCommentModal';

const SingleImage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const image = useSelector(state => state.images?.singleImage)
    // const commentId = useSelector(state => state.comments.allComments.id)
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
                        <div>
                            {/* <CreateCommentForm /> */}
                            <CreateCommentModal />
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div>
                    <h1>{image?.title}
                        <UpdateImageModal />
                        <button className='deleteButton'
                            onClick={() => dispatch(actionDeleteImage(image.id), dispatch(getAllImages()).then(history.push('/')))}>
                            Delete Image
                        </button>
                    </h1>
                </div>
                <div className='single_image_wrapper'>
                    <img className='single_image' src={image?.image_url} alt='pic didnt load' />
                    <br></br>
                    {image?.description}
                    <br></br>
                    Likes: {likes}

                    <div className='comments_position'>
                        <AllComments imageId={imageId} />
                    </div>

                    {/* <button><EditCommentModal commentId={commentId} /></button> */}


                </div>
            </div>
        )
    }
    return (
        Redirect('/')
    )
}
export default SingleImage;