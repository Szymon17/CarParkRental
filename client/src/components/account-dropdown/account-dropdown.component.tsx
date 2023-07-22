import "./account-dropdown.styles.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user.selectors";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../store/user/user.reducer";
import Button from "../button/button.component";
import { logOutUser } from "../../utils/fetchFunctions";

const AccountDropdow = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const logout = async () => {
    await logOutUser();
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="account-dropdown">
      <h1 className="account-dropdown__name">{user?.name}</h1>
      <Link to="/account">Mój profil</Link>
      <Link to="/account/order-history">Historia zamówień</Link>
      <div className="account-dropdown__button-container">
        <Button onClick={logout}>Wyloguj</Button>
      </div>
    </div>
  );
};

export default AccountDropdow;
