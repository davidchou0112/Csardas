import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { actionDeleteComment, getAllComments } from '../../store/comments';
import { getSingleImage } from '../../store/images';
import EditCommentModal from '../EditComment/editCommentModal';
import './index.css'

const AllComments = ({ imageId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state?.comments?.allComments))
    const loggedUserId = useSelector(state => state.session.user.id)
    const singleComment = useSelector(state => state.comments.singleComment)
    // console.log('~~~~', commentUserId)

    // console.log('~~this is comments:', comments)
    // const userId = useSelector(state => state.session.user.id)
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllComments(imageId))
    }, [dispatch, imageId, singleComment])

    return (
        <div>
            <h3>Comments:</h3><br></br>
            {comments.map(comment => (

                <p className='comment_body_wrapper'>
                    <div className='user_info'>{comment.user?.firstname} {comment.user?.lastname}:</div>
                    <div className='comment_body'>{comment.body}</div>
                    {loggedUserId === comment.user_id && (
                        <div>
                            <EditCommentModal comment={comment} />
                            <button className='edit_button'
                                onClick={() => dispatch(actionDeleteComment(comment.id), dispatch(getSingleImage()).then(history.push(`/images/${imageId}`)))}>
                                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0" />
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    )}
                </p>
            ))}
        </div>
    )
}
export default AllComments