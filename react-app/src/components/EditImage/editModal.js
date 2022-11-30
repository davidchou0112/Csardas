import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import EditImageForm from ".";
import { Modal } from "../context/Modal";


function UpdateImageModal() {
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
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0" />
                <span class="material-symbols-outlined">
                    edit
                </span>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    < EditImageForm
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </>
    )
}

export default UpdateImageModal