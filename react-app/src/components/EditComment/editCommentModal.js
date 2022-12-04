import React, { useState } from "react";
import EditCommentForm from ".";
import { Modal } from "../context/Modal";
import './EditComment.css'

function EditCommentModal({ comment }) {
    const [showModal, setShowModal] = useState(false)
    const [currComment, setCurrComment] = useState('');

    const handleEdit = () => {
        setShowModal(true)
        setCurrComment(comment.body)
    }

    return (
        <>
            <button className="edit_button" onClick={handleEdit}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0" />
                <span class="material-symbols-outlined">
                    edit
                </span>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    < EditCommentForm comment={comment} setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </>
    )
}

export default EditCommentModal