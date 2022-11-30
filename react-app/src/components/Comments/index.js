import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { actionDeleteComment, getAllComments } from '../../store/comments';
import { getSingleImage } from '../../store/images';
import EditCommentModal from '../EditComment/editCommentModal';

const AllComments = ({ imageId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state?.comments?.allComments))
    // console.log('~~this is comments:', comments)
    // const userId = useSelector(state => state.session.user.id)
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllComments(imageId))
    }, [dispatch, imageId])

    return (
        <div>
            <h3>Comments:</h3>
            {comments.map(comment => (
                <p>
                    {comment.body}
                    <button><EditCommentModal commentId={comment.id} /></button>
                    <button
                        onClick={() => dispatch(actionDeleteComment(comment.id), dispatch(getSingleImage()).then(history.push(`/images/${imageId}`)))}>
                        Delete Comment
                    </button>
                </p>
            ))}
        </div>
    )
}
export default AllComments