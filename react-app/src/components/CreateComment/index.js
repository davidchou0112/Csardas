import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createComment } from '../../store/comments';
import './index.css'

const CreateCommentForm = ({ setShowModal }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { imageId } = useParams();
    const userId = useSelector(state => state.session.user.id)
    const [body, setBody] = useState('');

    const [validations, setValidations] = useState([]);
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        const errors = [];
        if (!body || body.length < 1 || body.length > 200) errors.push('Comment must be between 1 and 200 characters.')
        setValidations(errors)
    }, [body])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(true)
        if (!validations.length) {
            const newComment = {
                userId: userId,
                body
            }
            dispatch(createComment(newComment, imageId))
            history.push(`/images/${imageId}`)
            setErrors(false)
            setShowModal(false)
        }
    }
    // const handleCancel = async (e) => {
    //     e.preventDefault();
    //     return null;
    // }
    return (
        <form className='post_comment_wrapper' id='post_comment_wrapper' onSubmit={handleSubmit}>
            <h1 id='white_me'>Leave a comment</h1><br></br>
            {errors &&
                <ul className="errorHandling">
                    {validations.length > 0 &&
                        validations.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                </ul>
            }<br></br>
            <label input-label>
                <textarea
                    id='textarea'
                    placeholder='What do you think?'
                    value={body}
                    required
                    onChange={e => setBody(e.target.value)}
                    className='textArea'
                >
                </textarea> <br></br><br></br>
                <button id='leave_comment' className='leave_comment'>Post</button>
            </label>
        </form>
    )
}

export default CreateCommentForm;