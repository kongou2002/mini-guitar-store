import React from 'react'
import { Table, Pagination, Modal, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Moment from 'react-moment'
import Loading from 'utils/loader'
const ProductsTable = ({ products, prev, next, goToEdit, removeModal, handleClose, handleModal, handleRemove }) => {

    const goToPrevPage = (page) => {
        return prev(page)
    }
    const goToNextPage = (page) => {
        return next(page)
    }

    return (
        <div>
            {products && products.docs ?
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr >
                                <th>Created</th>
                                <th>Model</th>
                                <th>Available</th>
                                <th colSpan="2" style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.docs.map((product) =>
                                <tr key={product._id}>
                                    <td><Moment to={product.date}></Moment></td>
                                    <td>{product.model}</td>
                                    <td>{product.available}</td>
                                    <td className="action_btn remove_btn"
                                        onClick={() => handleModal(product._id)}
                                    >
                                        Remove
                                    </td>
                                    <td className="action_btn edit_btn"
                                        onClick={() => goToEdit(product._id)}
                                    >
                                        Edit
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pagination>
                        {products.hasPrevPage ?
                            <>
                                <Pagination.Prev onClick={() => goToPrevPage(products.prevPage)} />
                                <Pagination.Item onClick={() => goToPrevPage(products.prevPage)}>
                                    {products.prevPage}
                                </Pagination.Item>
                            </>
                            : null}
                        <Pagination.Item active>
                            {products.page}
                        </Pagination.Item>
                        {products.hasNextPage ?
                            <>
                                <Pagination.Item onClick={() => goToNextPage(products.nextPage)}>
                                    {products.nextPage}
                                </Pagination.Item>
                                <Pagination.Next onClick={() => goToNextPage(products.nextPage)} />
                            </>
                            : null}
                    </Pagination>
                    <hr />
                    <LinkContainer to="/dashboard/admin/add_products">
                        <Button variant="primary">Add products</Button>
                    </LinkContainer>
                </>
                : <Loading />}
            <Modal show={removeModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you really sure ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    There is no going back.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Oops, close this now !!
                    </Button>
                    <Button variant="danger" onClick={() => handleRemove()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProductsTable
