import React, { useState } from "react";
import EditImageForm from ".";
import { Modal } from "../context/Modal";


function UpdateImageModal() {
    const [showModal, setShowModal] = useState(false)
    // const [showModal, setShowModal] = useContext(ModalContext)


    return (
        <>
            <button className="watchlist-page-icon" onClick={() => setShowModal(true)}>
                <i class="fa-solid fa-pen"></i> Edit Image
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