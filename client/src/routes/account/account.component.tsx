import { Link, useNavigate } from "react-router-dom";
import "./account.styles.sass";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user.selectors";
import { useEffect } from "react";

const Account = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const deleteAccount = () => {
    console.log("delete");
  };

  return (
    <div className="account">
      <div className="account__container container">
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
                <Link to="/account">Profil</Link>
              </li>
              <li className="account__aside__profileActions-link">
                <Link to="/account/history">Historia zamówień</Link>
              </li>
              <li className="account__aside__profileActions-action">
                <button onClick={deleteAccount}>Usuń konto</button>
              </li>
            </ul>
          </aside>
          <h1 className="account__name">{`${user?.name} ${user?.surname}`}</h1>
          <main className="account__main"></main>
        </div>
      </div>
    </div>
  );
};

export default Account;
