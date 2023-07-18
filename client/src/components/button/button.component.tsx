import { FC, HTMLAttributes } from "react";
import "./button.styles.sass";

export enum BUTTON_CLASSES {
  black = "button__black",
  green = "button__green",
}

type buttonTypes = HTMLAttributes<HTMLButtonElement> & {
  children: string;
  buttonType: BUTTON_CLASSES;
};

const Button: FC<buttonTypes> = ({ buttonType, children, ...otherProps }) => {
  return (
    <button className={`button ${buttonType}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
