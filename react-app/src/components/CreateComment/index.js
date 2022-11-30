import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createComment } from '../../store/comments';

const CreateCommentForm = ({ setShowModal }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const { imageId } = useParams();
    const userId = useSelector(state => state.session.user.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            userId: userId,
            body
        }

        dispatch(createComment(newComment, imageId))
        history.push(`/images/${imageId}`)
        setShowModal(false)
    }
    // const handleCancel = async (e) => {
    //     e.preventDefault();
    //     return null;
    // }
    return (
        <form onSubmit={handleSubmit}>
            <h1>leave a comment</h1>
            <label input-label>Comment:
                <textarea

                    placeholder='What do you think?'
                    value={body}
                    required
                    onChange={e => setBody(e.target.value)}
                    className='textArea'
                >
                </textarea> <br></br>
                <button>Post Comment</button>

            </label>
        </form>
    )
}

export default CreateCommentForm;