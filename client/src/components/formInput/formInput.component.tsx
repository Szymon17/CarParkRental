import { FC, InputHTMLAttributes } from "react";
import "./formInput.styles.sass";

type formInputTypes = InputHTMLAttributes<HTMLInputElement> & { label?: string; invalid?: boolean };

const FormInput: FC<formInputTypes> = ({ label, invalid, ...attributes }) => {
  return (
    <div className="formInput">
      {label && (
        <label
          className={`formInput__label${Boolean(typeof attributes.value === "string" && attributes.value.length > 0) ? "-shrink" : "-placeHolder"}`}
        >
          {label}
        </label>
      )}
      <input {...attributes} className={`${invalid ? "formInput__input-invalid" : "formInput__input"}`} />
    </div>
  );
};

export default FormInput;
