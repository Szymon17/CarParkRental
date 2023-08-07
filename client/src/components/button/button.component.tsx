import { ButtonHTMLAttributes, FC } from "react";
import "./button.styles.sass";

export enum BUTTON_CLASSES {
  black = "button__black",
  green = "button__green",
  reverse = "button__reverse",
  red = "button__red",
  disable = "button__disable",
}

type buttonTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  buttonType?: BUTTON_CLASSES;
};

const Button: FC<buttonTypes> = ({ children, buttonType = BUTTON_CLASSES.black, ...otherProps }) => {
  return (
    <button className={`button ${buttonType}`} {...otherProps}>
      <span className="button__text">{children}</span>
    </button>
  );
};

export default Button;
