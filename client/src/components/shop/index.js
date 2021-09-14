import React, { useEffect, useReducer, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { productsByPaginate } from 'store/actions/product.action'
import { getAllBrands } from 'store/actions/brands.action'
import GridOffIcon from '@material-ui/icons/GridOff';
import GridOnIcon from '@material-ui/icons/GridOn';
import CardBlock from 'utils/products/card.block';
import PaginateComponent from 'utils/paginateNav'
import SearchBar from './searchBar'
import CollapseCheckbox from './collapseCheckbox'
import RangeSelect from './rangeSelect'
const defaultValues = {
    keywords: '',
    brand: [],
    min: 0,
    max: 5000,
    frets: [],
    page: 1
}



const Shop = () => {
    const [grid, setGrid] = useState(false);

    const [searchValues, setSearchValues] = useReducer((state, newState) => ({ ...state, ...newState }), defaultValues);
    const { byPaginate } = useSelector(state => state.products)
    const brands = useSelector(state => state.brands)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBrands())
    }, [dispatch])

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [searchValues, dispatch])
    const handleGrid = () => {
        setGrid(!grid)
    }

    const goToPage = (page) => {
        setSearchValues({ page: page })
    }

    const handleResetSearch = () => {
        setSearchValues(defaultValues)
    }

    const handleKeywords = (keywords) => {
        setSearchValues({ keywords: keywords, page: 1 })
    }

    const handleFilters = (filters, category) => {
        if (category === 'brands') {
            setSearchValues({ brand: filters, page: 1})
        }
        if (category === 'frets') {
            setSearchValues({ frets: filters, page: 1})
        }
    }
    const handleRange = (values) => {
        console.log(values);
        setSearchValues({ min:values[0], max: values[1], page: 1})
    }
    return (
        <div className="page_container">
            <div className="page_top">
                <div className="container">
                    <SearchBar
                        handleKeywords={(values) => handleKeywords(values)}
                    />
                </div>
            </div>
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseCheckbox
                            initState={true}
                            title="Brands"
                            list={brands.all}
                            handleFilters={(filters) => handleFilters(filters, 'brands')}
                        />
                        <CollapseCheckbox
                            initState={false}
                            title="Frets"
                            list={[
                                {_id: 20, name: 20},
                                {_id: 21, name: 21},
                                {_id: 22, name: 22},
                                {_id: 24, name: 24},
                                ]}
                            handleFilters={(filters) => handleFilters(filters, 'frets')}
                        />
                        <RangeSelect    
                            tilte="PRICE RANGE"
                            handleRange={(value) => handleRange(value)}
                        />
                    </div>
                    <div className="right">
                        <div className="shop_options">
                            <div className="shop_grids clear">
                                <div className={`grid_btn ${grid ? '' : 'active'}`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOnIcon />
                                </div>
                                <div className={`grid_btn ${!grid ? '' : 'active'}`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOffIcon />
                                </div>
                            </div>
                            <div className="">
                                {byPaginate && byPaginate.docs ?
                                    <>
                                        <CardBlock
                                            grid={grid}
                                            items={byPaginate.docs}
                                            shop={true}
                                        />
                                        <PaginateComponent
                                            products={byPaginate}
                                            prev={(page) => goToPage(page)}
                                            next={(page) => goToPage(page)}
                                            resetSearch={() => handleResetSearch()}
                                        />
                                    </>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Shop