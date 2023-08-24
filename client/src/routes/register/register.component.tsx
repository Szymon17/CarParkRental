import "./register.styles.sass";
import { ChangeEvent, useState } from "react";
import { registerUserFetch } from "../../utils/fetchFunctions";
import { validate } from "../../utils/basicFunctions";
import { toast } from "react-toastify";
import { userData } from "../../store/user/user.types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FormInput from "../../components/formInput/formInput.component";
import SingInPanel from "../../components/sing-inPanel/sing-inPanel.component";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [invalidSend, setSendState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const capitaliseFirstLeeter = (string: string) => {
    const array = string.split("");
    array[0] = array[0].toUpperCase();
    return array.join("");
  };

  const showError = (errorMessage: string) => {
    setSendState(true);
    toast.error(t(errorMessage));
  };

  const registerUser = async () => {
    if (!validate.email(email)) showError("invalid email");
    else if (!validate.password(password, confirmPassword)) showError("invalid password");
    else if (!validate.name(name)) showError("invalid name");
    else if (!validate.name(surname)) showError("invalid surname");
    else if (!validate.phoneNumber(phoneNumber)) showError("invalid phone number");
    else {
      const user: userData = {
        email,
        password,
        confirmPassword,
        name: capitaliseFirstLeeter(name),
        surname: capitaliseFirstLeeter(surname),
        phoneNumber,
      };

      const createStatus = await registerUserFetch(user);
      if (createStatus && createStatus.status === "ok") navigate("/");
      else if (createStatus && createStatus.status === "error") toast.error(t(createStatus.message));
    }
  };

  const changeEvent = (e: ChangeEvent<HTMLInputElement>, changeState: Function) => {
    changeState(e.target.value);
  };

  return (
    <div className="register">
      <div className="register__container">
        <SingInPanel title={t("Register")} linkText={t("Log-in")} link="/log-in" action={registerUser}>
          <>
            <FormInput
              label="Email"
              invalid={invalidSend && !validate.email(email)}
              type="email"
              value={email}
              onChange={e => changeEvent(e, setEmail)}
            />
            <FormInput
              label={t("Password")}
              invalid={invalidSend && !validate.password(password, confirmPassword)}
              type="password"
              value={password}
              onChange={e => changeEvent(e, setPassword)}
            />
            <FormInput
              label={t("Repeat password")}
              invalid={invalidSend && !validate.password(password, confirmPassword)}
              type="password"
              value={confirmPassword}
              onChange={e => changeEvent(e, setConfirmPassword)}
            />
            <FormInput
              label={t("Name")}
              type="text"
              invalid={invalidSend && !validate.name(name)}
              value={name}
              onChange={e => changeEvent(e, setName)}
            />
            <FormInput
              label={t("Surname")}
              type="text"
              invalid={invalidSend && !validate.name(surname)}
              value={surname}
              onChange={e => changeEvent(e, setSurname)}
            />
            <FormInput
              label={t("Phone number")}
              type="text"
              invalid={invalidSend && !validate.phoneNumber(phoneNumber)}
              value={phoneNumber}
              onChange={e => changeEvent(e, setPhoneNumber)}
            />
          </>
        </SingInPanel>
      </div>
    </div>
  );
};

export default Register;
