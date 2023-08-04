import "./account-dropdown.styles.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user.selectors";
import { Link, useNavigate } from "react-router-dom";
import { changeUserDropdown, logOut } from "../../store/user/user.reducer";
import { logOutUser } from "../../utils/fetchFunctions";
import Button from "../button/button.component";
import { useTranslation } from "react-i18next";

const AccountDropdow = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const logout = async () => {
    await logOutUser();
    dispatch(changeUserDropdown(false));
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="account-dropdown" onClick={e => e.stopPropagation()}>
      <h1 className="account-dropdown__name">{user?.name}</h1>
      <Link onClick={() => dispatch(changeUserDropdown(false))} to="/account">
        {t("profile")}
      </Link>
      <Link onClick={() => dispatch(changeUserDropdown(false))} to="/account/history">
        {t("history of orders")}
      </Link>
      <div className="account-dropdown__button-container">
        <Button onClick={logout}>{t("logout")}</Button>
      </div>
    </div>
  );
};

export default AccountDropdow;
