import "./sing-inPanel.styles.sass";
import Button from "../button/button.component";
import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

type singInPanelTypes = {
  children: ReactElement;
  title: string;
  linkText: string;
  link: string;
};

const SingInPanel: FC<singInPanelTypes> = ({ children, title, linkText, link }) => {
  return (
    <div className="singInPanel">
      <h1 className="singInPanel__title">{title}</h1>
      <div className="singInPanel__inputs">{children}</div>
      <Button>{title}</Button>
      <div className="singInPanel__decorationLine">
        <div className="singInPanel__decorationLine__line"></div>
        <span className="singInPanel__decorationLine__text">Lub</span>
        <div className="singInPanel__decorationLine__line"></div>
      </div>
      <Link className="singInPanel__link" to={link}>
        {linkText}
      </Link>
    </div>
  );
};

export default SingInPanel;
