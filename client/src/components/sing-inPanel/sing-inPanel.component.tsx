import "./sing-inPanel.styles.sass";
import Button from "../button/button.component";
import { FC, ReactElement, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type singInPanelTypes = {
  children: ReactElement;
  title: string;
  action: Function;
  linkText: string;
  link: string;
};

const SingInPanel: FC<singInPanelTypes> = ({ children, title, action, linkText, link }) => {
  const { t } = useTranslation();

  const handler = (e: SyntheticEvent) => {
    e.preventDefault();
    action();
  };

  return (
    <div className="singInPanel">
      <h1 className="singInPanel__title">{title}</h1>
      <form onSubmit={handler} method="post">
        <div className="singInPanel__inputs">{children}</div>
        <Button type="submit">{title}</Button>
      </form>
      <div className="singInPanel__decorationLine">
        <div className="singInPanel__decorationLine__line"></div>
        <span className="singInPanel__decorationLine__text">{t("or")}</span>
        <div className="singInPanel__decorationLine__line"></div>
      </div>
      <Link className="singInPanel__link" to={link}>
        {linkText}
      </Link>
    </div>
  );
};

export default SingInPanel;
