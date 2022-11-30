import React, { useState } from "react";
import EditCommentForm from ".";
import { Modal } from "../context/Modal";


function EditCommentModal({ commentId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className="watchlist-page-icon" onClick={() => setShowModal(true)}>
                <i class="fa-solid fa-pen"></i>Post Comment
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    < EditCommentForm commentId={commentId} setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </>
    )
}

export default EditCommentModal