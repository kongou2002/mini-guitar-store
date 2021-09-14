import React, {useEffect} from 'react'
import Featured from './featured'
import SlimPromotion from 'utils/promotions/slim.block'
import Loader from 'utils/loader.js'
import {useDispatch, useSelector} from 'react-redux'
import {productsBySort} from 'store/actions/product.action'
import CardBlock from 'utils/products/card.block'
const slimPromotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Up to 50% off',
    lineTwo: 'In second hand Guitar',
    linkTitle: 'Buy now',
    linkTo: '/shop'
}

const Home = () => {
    const {bySold, byDate} = useSelector(state => state.products)
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(productsBySort({
           limit: 4,
           sortBy: 'itemSold',
           order: 'desc',
           where: 'bySold'
       }))
       dispatch(productsBySort({
            limit: 4,
            sortBy: 'date',
            order: 'desc',
            where: 'byDate'
    }))
    },[dispatch])
    return (
        <div>
            <Featured/>
            { bySold ? 
                <CardBlock 
                    items={bySold}
                    title="Best selling products"
                />
                : <Loader/>
            }
            <SlimPromotion items={slimPromotion}/>
            { byDate ? 
                <CardBlock 
                    items={byDate}
                    title="Lastest guitars"
                />
                : <Loader/>
            }
        </div>
    )
}
export default Home
