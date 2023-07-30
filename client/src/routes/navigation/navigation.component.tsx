import "./navigation.styles.sass";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { faCarRear, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user.selectors";
import PLflag from "../../assets/pl-flag.png";
import ENflag from "../../assets/en-flag.png";
import AccountDropdow from "../../components/account-dropdown/account-dropdown.component";

const Navigation = () => {
  const user = useAppSelector(selectUser);

  const [open, setOpenState] = useState(false);
  const [language, setLanguage] = useState("pl");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <>
      <nav className="navigation">
        <div className="navigation__icon-box">
          <Link to="/">
            <FontAwesomeIcon className="navigation__homeIcon" icon={faCarRear} />
          </Link>
        </div>
        <div className="navigation__searhField">
          <input type="text" className="navigation__searhInput" />
        </div>
        <ul className="navigation__links">
          <li className="navigation__link">
            <img
              onClick={() => setLanguage("en")}
              className={`navigation__link__switch-language-icon ${language === "en" && "active"}`}
              src={ENflag}
              alt="en-flag"
            />
            <img
              onClick={() => setLanguage("pl")}
              className={`navigation__link__switch-language-icon ${language === "pl" && "active"}`}
              src={PLflag}
              alt="en-flag"
            />
          </li>
          <li className="navigation__link">
            <div className="navigation__link-container">
              <Link to="about">O nas</Link>
              <div className="navigation__link-underline"></div>
            </div>
          </li>
          <li className="navigation__link">
            <div className="navigation__link-container">
              <Link to="offers">Ofety</Link>
              <div className="navigation__link-underline"></div>
            </div>
          </li>
          <li className="navigation__link">
            <div className="navigation__link-container">
              {user ? (
                <FontAwesomeIcon onClick={() => setOpenState(!open)} className="navigation__link-container__userIcon" icon={faUser} />
              ) : (
                <Link to="log-in">Zaloguj się</Link>
              )}
              <div className="navigation__link-underline"></div>
            </div>
          </li>
        </ul>
        {open && user && <AccountDropdow />}
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
