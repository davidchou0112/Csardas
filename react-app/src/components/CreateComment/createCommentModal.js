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
            <button className="leave_comment" onClick={() => setShowModal(true)}>
                <i class="fa-solid fa-pen"></i>Leave Comment
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