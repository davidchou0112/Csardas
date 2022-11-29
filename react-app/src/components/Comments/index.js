import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllComments } from '../../store/comments';

const AllComments = ({ imageId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state?.comments?.allComments))
    console.log('~~this is comments:', comments)
    // const userId = useSelector(state => state.session.user.id)


    useEffect(() => {
        dispatch(getAllComments(imageId))
    }, [dispatch, imageId])

    return (
        <>
            <p>Comments</p>
            {comments.map(comment => (
                <h3>{comment.body}</h3>
            ))}
        </>
    )
}
export default AllComments