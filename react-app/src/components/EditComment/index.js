import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSingleComments, updateComment } from '../../store/comments';

const EditCommentForm = ({ commentId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const comment = useSelector(state => state);
    const imageId = useSelector(state => state.images.singleImage.id)

    const [body, setBody] = useState('');

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
            history.push(`/images/${imageId}`)
        }
    }

    return (
        <>edit me</>
    )
}
export default EditCommentForm;