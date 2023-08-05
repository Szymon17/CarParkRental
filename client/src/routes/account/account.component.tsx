import "./account.styles.sass";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user.selectors";
import { useEffect } from "react";
import { deleteUserFetch } from "../../utils/fetchFunctions";
import { logOut } from "../../store/user/user.reducer";
import { useTranslation } from "react-i18next";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const deleteAccount = async () => {
    if (user) {
      const res = await deleteUserFetch(user.email);

      if (res && res.status === "ok") {
        dispatch(logOut());
        console.log(res.message);
      }
    }
  };

  return (
    <div className="account">
      <div className="account__container">
        <div className="account__profile">
          <aside className="account__aside">
            <div className="account__aside__profile__title">
              <div className="account__aside__profile__title-picture">
                <span className="account__aside__profile__title-picture-text">{`${user?.name.charAt(0)}${user?.surname.charAt(0)}`}</span>
              </div>
              <h2 className="account__aside__profile__title-name"></h2>
            </div>
            <ul className="account__aside__profileActions">
              <li className="account__aside__profileActions-link">
                <Link to="">{t("profile")}</Link>
              </li>
              <li className="account__aside__profileActions-link">
                <Link to="history">{t("history of orders")}</Link>
              </li>
              <li className="account__aside__profileActions-action">
                <button onClick={deleteAccount}>{t("delete account")}</button>
              </li>
            </ul>
          </aside>
          <h1 className="account__name">{`${user?.name} ${user?.surname}`}</h1>
          <main className="account__main">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
