import "./navigation.styles.sass";
import { faCarRear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
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
              <Link to="log-in">Zaloguj się</Link>
              <div className="navigation__link-underline"></div>
            </div>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
