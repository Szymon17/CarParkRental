import "./account-dropdown.styles.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user.selectors";
import { Link, useNavigate } from "react-router-dom";
import { changeUserDropdown, logOut } from "../../store/user/user.reducer";
import { logOutUser } from "../../utils/fetchFunctions";
import Button, { BUTTON_CLASSES } from "../button/button.component";
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
      <ul className="account-dropdown__linksCnt">
        <li className="account-dropdown__link">
          <Link onClick={() => dispatch(changeUserDropdown(false))} to="/account">
            {t("profile")}
          </Link>
        </li>
        <li className="account-dropdown__link">
          <Link onClick={() => dispatch(changeUserDropdown(false))} to="/account/history">
            {t("history of orders")}
          </Link>
        </li>
      </ul>
      <div className="account-dropdown__button-container">
        <Button buttonType={BUTTON_CLASSES.reverse} onClick={logout}>
          {t("logout")}
        </Button>
      </div>
    </div>
  );
};

export default AccountDropdow;
