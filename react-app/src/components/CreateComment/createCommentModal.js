import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import CreateCommentForm from ".";
import { Modal } from "../context/Modal";
import './index.css'


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
            <button id="leave_comment" className="leave_comment" onClick={() => setShowModal(true)}>
                Comment
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