import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const PicViewer = ({ formik, deletePicture }) => {
    const [idToDelete, setIdToDelete] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (index) => {
        setIdToDelete(index);
        setShow(true);
    }
    const confirmDelete = () => {
        deletePicture(idToDelete);
        handleClose()
        setIdToDelete(null);
    }
    return (
        <>
            {formik.values && formik.values.images ?
                formik.values.images.map((item, i) => (
                    <div
                        key={i}
                        className="pic_block"
                        style={{
                            background: `url(${item})`
                        }}
                        onClick={() => handleShow(i)}
                    >

                    </div>
                ))
                : null}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this image
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="danger" onClick={confirmDelete}>X</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}


export default PicViewer;