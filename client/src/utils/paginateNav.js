import React from 'react'
import { Pagination, Button } from 'react-bootstrap'
const PaginateComponent = ({ products, prev, next, resetSearch }) => {

    const goToPrevPage = (page) => {
        prev(page)
    }

    const goToNextPage = (page) => {
        next(page)
    }


    return (
        <div>
            {products.docs.length > 0 ?
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
                :
                <div className="">
                    <div className="">Sorry nothing was found</div>
                    <Button variant="primary" className="mt-3" onClick={resetSearch}>
                        Reset Search
                    </Button>
                </div>
            }
        </div>
    )
}

export default PaginateComponent
