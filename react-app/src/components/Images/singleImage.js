import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteImage, getSingleImage, getAllImages } from '../../store/images';
import { Redirect, useHistory, useParams } from 'react-router-dom'
import AllComments from '../Comments';
import './singleImage.css'
import UpdateImageModal from '../EditImage/editModal';
import CreateCommentModal from '../CreateComment/createCommentModal';
import EditCommentModal from '../EditComment/editCommentModal';
import { getAllComments } from '../../store/comments';

const SingleImage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const image = useSelector(state => state.images?.singleImage)
    const comments = useSelector(state => state.comments.allComments)
    const length = Object.values(comments).map(comment => comments.allComments)
    console.log('~~~~~~~~~', length)
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
                <div className='single_image_page'>
                    <div className='single_image_header'>
                        <h1>{image?.title}</h1>
                    </div>
                    <div className='single_image_wrapper'>
                        <img className='single_image' src={image?.image_url} alt='pic didnt load' />
                        <br></br>
                        {image?.description}
                        <br></br>

                        <div className='comments_details'>
                            <div>
                                <div className='comments_position'>
                                    <AllComments imageId={imageId} />
                                </div>
                                <div className='post_comment_button'>
                                    <CreateCommentModal />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>Likes: {likes}</div>
                                    {/* <div>Likes</div> */}
                                </div>
                                <div>
                                    <div>Comments: {length}</div>
                                    {/* <div>Comments</div> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
        return (
            <div className='single_image_page'>
                <div className='single_image_header'>
                    <h1>{image?.title}</h1>
                    <div className='single_image_edit_delete'>
                        <UpdateImageModal />
                        <button className='deleteButton'
                            onClick={() => dispatch(actionDeleteImage(image.id), dispatch(getAllImages()).then(history.push('/')))}>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0" />
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>

                </div>
                <div className='single_image_wrapper'>
                    <img className='single_image' src={image?.image_url} alt='pic didnt load' />
                    <br></br>
                    {image?.description}
                    <br></br>
                    <div className='comments_details'>
                        <div>
                            <div className='comments_position'>
                                <AllComments imageId={imageId} />
                            </div>
                            <div className='post_comment_button'>
                                <CreateCommentModal />
                            </div>
                        </div>

                        <div>
                            <div>
                                <div>Likes: {likes}</div>
                                {/* <div>Likes</div> */}
                            </div>
                            <div>
                                <div>Comments: {length}</div>
                                {/* <div>Comments</div> */}
                            </div>
                        </div>
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