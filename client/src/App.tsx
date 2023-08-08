import "./translations/i18n";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectExpireTime, selectUser, selectUserDropdownState } from "./store/user/user.selectors";
import { changeUserDropdown, logOut } from "./store/user/user.reducer";
import { ToastContainer } from "react-toastify";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import LogIn from "./routes/log-in/log-in.component";
import Register from "./routes/register/register.component";
import Account from "./routes/account/account.component";
import Offers from "./routes/offers/offers.component";
import Product from "./routes/product/product.component";
import Summary from "./routes/summary/summary.component";
import Profile from "./components/profile/profile.component";
import OrderHistory from "./components/order-history/order-history.component";
import { getLocations } from "./store/locations/locations.actions";
import { selectLocations } from "./store/locations/locations.selector";
import About from "./routes/about/about.component";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const locations = useAppSelector(selectLocations);
  const userDropdownState = useAppSelector(selectUserDropdownState);
  const expireTime = useAppSelector(selectExpireTime);

  useEffect(() => {
    if (locations.length === 0) dispatch(getLocations());
  }, []);

  useEffect(() => {
    if (user && expireTime && expireTime < new Date().getTime()) {
      dispatch(logOut());
    }
  }, [dispatch, user]);

  const changeDropdownState = () => {
    if (userDropdownState) dispatch(changeUserDropdown(false));
  };

  return (
    <div className="app" onClick={changeDropdownState}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />}>
            <Route index element={<Profile />} />
            <Route path="/account/history" element={<OrderHistory />} />
          </Route>
          <Route path="/offers" element={<Offers />} />
          <Route path="/product" element={<Product />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
