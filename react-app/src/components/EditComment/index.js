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
    console.log('~~~~this is comment', comment)

    const [validations, setValidations] = useState([]);
    const [errors, setErrors] = useState(false);

    const [body, setBody] = useState('');

    useEffect(() => {
        dispatch(getSingleComments(commentId));
    }, [dispatch, commentId])

    useEffect(() => {
        if (comment) {
            setBody(comment.body)
        }
    }, [comment])

    useEffect(() => {
        const errors = [];
        if (!body || body.length < 1 || body.length > 200) errors.push('Comment must be between 1 and 200 characters.')
        setValidations(errors)
    }, [body])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(true)
        if (!validations.length) {
            const comment = {
                id: commentId,
                body
            }

            let newComment = await dispatch(updateComment(comment, commentId));

            if (newComment) {
                dispatch(getSingleImage())
                    .then(history.push(`/images/${imageId}`))
                    .then(setErrors(false))
                    .then(setShowModal(false))
            }
        }
    }

    return (
        <div className='editcomment_wrapper' id='editcomment_wrapper'>
            <h1>Edit Comment</h1><br></br>
            {errors &&
                <ul className="errorHandling">
                    {validations.length > 0 &&
                        validations.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                </ul>
            }<br></br>
            <form onSubmit={handleSubmit}>
                <textarea id='textarea'
                    defaultValue={comment.comments.singleComment.body}
                    // value={body}
                    type='text'
                    // placeholder='Body'
                    onChange={(e) => setBody(e.target.value)}
                /><br></br><br></br>
                <button id='leave_comment' type='submit' >Edit</button>
            </form>
        </div>
    )
}
export default EditCommentForm;