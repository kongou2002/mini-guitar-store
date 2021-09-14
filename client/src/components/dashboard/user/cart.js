import React, { useState, useEffect } from 'react'
import DashboardLayout from 'hoc/dashboardLayout'
import Loader from 'utils/loader'
import CartDetail from './cartDetail'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, userPurchaseSuccess } from 'store/actions/user.action'

import { PayPalButton } from "react-paypal-button-v2";

const UserCart = (props) => {
    const [loading, setLoading] = useState(false)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()

    const removeItem = (position) => {
        dispatch(removeFromCart(position))
    }
    const calculateTotal = () => {
        let total = 0;
        props.users.cart.forEach((item) => {
            total += Number(item.price)
        })
        return total
    }
    const generateUnits = () => {
        return [{
            description: 'Guitars and order',
            amount: {
                currency_code: 'USD',
                value: calculateTotal(),
                breakdown: {
                    item_total: {
                        currency_code: 'USD',
                        value: calculateTotal(),
                    }
                }
            },
            // cho nay la cho chua cua cac san pham minh mua
            items: generateItems()
        }]
    }


    const generateItems = () => {
        let items = props.users.cart.map((item) => ({
            unit_amount: {
                currency_code: 'USD',
                value: item.price
            },
            quantity: 1,
            name: item.model
        }));
        return items;
    }

    useEffect(() => {
        if (notifications && notifications.success) {
            props.history.push('/dashboard')
        }
        if (notifications && notifications.error) {
            console.log(notifications.error);
            setLoading(false)
        }
    }, [props.history, notifications])

    return (
        <DashboardLayout title="Your Cart">
            {props.users.cart && props.users.cart.length > 0 ?
                <>
                    <div className="user_cart_sum">
                        <div>
                            Total amount: {calculateTotal()}$
                        </div>
                    </div>
                    <CartDetail
                        products={props.users.cart}
                        removeItem={(position) => removeItem(position)}
                    />
                    {loading ?
                        <Loader />
                        :
                        <div className="pp_button">
                            <PayPalButton
                                options={{
                                    clientId: "AQCBKFcbRgbUzqtjucTt5P4BKFLGs04J027vpSKNNrtE2ozvACaE_qBCp53ETa1U50yRoarDuNZhPP4B",
                                    currency: "USD",
                                    disableFunding: 'credit,card'
                                }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: generateUnits()
                                    })
                                }}
                                onSuccess={(details, data) => {
                                    dispatch(userPurchaseSuccess(details.id))
                                    setLoading(true)
                                }}
                                onCancel={(data) => setLoading(false)}
                            />
                        </div>
                    }
                </>
                : <div>There is nothing in your cart</div>}
        </DashboardLayout>
    )
}

export default UserCart