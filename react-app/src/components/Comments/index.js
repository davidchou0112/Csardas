import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllComments } from '../../store/comments';
import EditCommentModal from '../EditComment/editCommentModal';

const AllComments = ({ imageId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state?.comments?.allComments))
    // console.log('~~this is comments:', comments)
    // const userId = useSelector(state => state.session.user.id)


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
                </p>
            ))}
        </div>
    )
}
export default AllComments