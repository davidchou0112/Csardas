import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import CreateCommentForm from ".";
import { Modal } from "../context/Modal";


function CreateCommentModal() {
    const [showModal, setShowModal] = useState(false)
    // const dispatch = useDispatch();
    // const [showModal, setShowModal] = useContext(ModalContext)

    // const handleEditButton = () => {
    //     setShowModal(true)
    //     dispatch(getSingleImage)
    // }

    return (
        <>
            <button className="watchlist-page-icon" onClick={() => setShowModal(true)}>
                <i class="fa-solid fa-pen"></i>Post Comment
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    < CreateCommentForm
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </>
    )
}

export default CreateCommentModal