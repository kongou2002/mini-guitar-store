import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const AddToCartHandler = ({ modal, handleClose, errorType }) => {
    return (
        <>
            <Modal show={modal} onHide={handleClose} center>
                <Modal.Header closeButton>
                    <Modal.Title>Sorry 😞</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorType === 'auth' ?
                        <div>Sorry you need to login or register first</div>
                        :
                        <div>Sorry you need to verify your account</div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {errorType === 'auth' ?
                        <LinkContainer to="/sign_in">
                            <Button variant="primary">
                                Go to sign in / register
                            </Button>
                        </LinkContainer>
                        :
                        <Button variant="primary">
                            Verify your account
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddToCartHandler;