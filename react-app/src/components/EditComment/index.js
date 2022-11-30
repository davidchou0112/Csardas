import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSingleComments, updateComment } from '../../store/comments';
import { getSingleImage } from '../../store/images';

const EditCommentForm = ({ commentId, setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const comment = useSelector(state => state);
    const imageId = useSelector(state => state.images.singleImage.id)

    const [body, setBody] = useState();

    useEffect(() => {
        dispatch(getSingleComments(commentId));
    }, [dispatch, commentId])

    useEffect(() => {
        if (comment) {
            setBody(comment.body)
        }
    }, [comment])

    // useEffect(() => {
    //     // ERRORS
    // })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = {
            id: commentId,
            body
        }

        let newComment = await dispatch(updateComment(comment, commentId));

        if (newComment) {
            dispatch(getSingleImage())
                .then(history.push(`/images/${imageId}`))
                .then(setShowModal(false))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <>Edit Your Comment</><br></br>
            <input
                value={body}
                type='text'
                placeholder='Body'
                onChange={(e) => setBody(e.target.value)}
            /><br></br>
            <button type='submit' >Edit Comment</button>
        </form>
    )
}
export default EditCommentForm;