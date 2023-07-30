import "./translations/i18n";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectExpireTime, selectUser } from "./store/user/user.selectors";
import { logOut } from "./store/user/user.reducer";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import LogIn from "./routes/log-in/log-in.component";
import Register from "./routes/register/register.component";
import Account from "./routes/account/account.component";
import Offers from "./routes/offers/offers.component";
import Product from "./routes/product/product.component";
import Summary from "./routes/summary/summary.component";

function App() {
  const user = useAppSelector(selectUser);
  const expireTime = useAppSelector(selectExpireTime);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && expireTime && expireTime < new Date().getTime()) {
      dispatch(logOut());
    }
  }, [dispatch, user]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/offers/*" element={<Offers />} />
        <Route path="/product" element={<Product />} />
        <Route path="/summary" element={<Summary />} />
      </Route>
    </Routes>
  );
}

export default App;
