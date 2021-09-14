import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from 'hoc/mainLayout';
import { useDispatch, useSelector } from 'react-redux'
import { userIsAuth, userSignOut } from 'store/actions/user.action'
import AuthGuard from 'hoc/authGuard';

import Loader from 'utils/loader'
import Header from 'components/navigation/header'
import Footer from 'components/navigation/footer'
import Home from 'components/home'
import RegisterLogin from 'components/auth'
import UserDashboard from 'components/dashboard'
import UserInfo from 'components/dashboard/user/info'
import AdminProduct from 'components/dashboard/admin/products'
import AddProduct from 'components/dashboard/admin/add_edit/add';
import EditProduct from 'components/dashboard/admin/add_edit/edit'
import Shop from 'components/shop'
import ProductDetail from 'components/product'
import UserCart from 'components/dashboard/user/cart'
function Routes(props) {
  const [loading, setLoading] = useState(true)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const signOutUser = () => {
    dispatch(userSignOut())
  }

  useEffect(() => {
    dispatch(userIsAuth())
  }, [dispatch])

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false)
    }
  }, [users])
  return (
    <BrowserRouter>
      {
        loading ?
          <Loader full={true} />
          :
          <>
            <Header
              users={users}
              signOutUser={signOutUser}
            />
            <MainLayout>
              <Switch>
                <Route path="/dashboard/admin/edit_products/:id" component={AuthGuard(EditProduct)} />
                <Route path="/dashboard/admin/add_products" component={AuthGuard(AddProduct)} />
                <Route path="/dashboard/admin/admin_products" component={AuthGuard(AdminProduct)} />
                <Route path="/dashboard/user/user_info" component={AuthGuard(UserInfo)} />
                <Route path="/dashboard/user/user_cart" component={AuthGuard(UserCart)} />
                <Route path="/dashboard" component={AuthGuard(UserDashboard)} />
                <Route path="/product_detail/:id" component={ProductDetail} />
                <Route path="/shop" component={Shop} />
                <Route path="/sign_in" component={RegisterLogin} />
                <Route path="/" component={Home} />
              </Switch>
            </MainLayout>
            <Footer />
          </>
      }

    </BrowserRouter>

  );
}

export default Routes;
