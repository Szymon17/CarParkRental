import "./register.styles.sass";
import { ChangeEvent, useState } from "react";
import { addUser } from "../../utils/fetchFunctions";
import { validate } from "../../utils/basicFunctions";
import FormInput from "../../components/formInput/formInput.component";
import SingInPanel from "../../components/sing-inPanel/sing-inPanel.component";

const Register = () => {
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

  const registerUser = async () => {
    if (!validate.email(email)) setSendState(true);
    else if (!validate.password(password, confirmPassword)) setSendState(true);
    else if (!validate.name(name)) setSendState(true);
    else if (!validate.name(surname)) setSendState(true);
    else if (!validate.phoneNumber(phoneNumber)) setSendState(true);
    else {
      const user = {
        email,
        password,
        confirmPassword,
        name: capitaliseFirstLeeter(name),
        surname: capitaliseFirstLeeter(surname),
        phoneNumber,
      };

      const createdUser = await addUser(user);
      console.log(createdUser);
    }
  };

  const changeEvent = (e: ChangeEvent<HTMLInputElement>, changeState: Function) => {
    changeState(e.target.value);
  };

  return (
    <div className="register">
      <div className="register__container">
        <SingInPanel title="Zarejstruj się" linkText="Zaloguj się" link="/log-in" action={registerUser}>
          <>
            <FormInput
              label="Email"
              invalid={invalidSend && !validate.email(email)}
              type="email"
              value={email}
              onChange={e => changeEvent(e, setEmail)}
            />
            <FormInput
              label="Hasło"
              invalid={invalidSend && !validate.password(password, confirmPassword)}
              type="password"
              value={password}
              onChange={e => changeEvent(e, setPassword)}
            />
            <FormInput
              label="Powtórz hasło"
              invalid={invalidSend && !validate.password(password, confirmPassword)}
              type="password"
              value={confirmPassword}
              onChange={e => changeEvent(e, setConfirmPassword)}
            />
            <FormInput label="Imię" type="text" invalid={invalidSend && !validate.name(name)} value={name} onChange={e => changeEvent(e, setName)} />
            <FormInput
              label="Nazwisko"
              type="text"
              invalid={invalidSend && !validate.name(surname)}
              value={surname}
              onChange={e => changeEvent(e, setSurname)}
            />
            <FormInput
              label="nr.tel"
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
