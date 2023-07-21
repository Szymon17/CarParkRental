import "./register.styles.sass";
import { useState } from "react";
import FormInput from "../../components/formInput/formInput.component";
import SingInPanel from "../../components/sing-inPanel/sing-inPanel.component";
import { addUser } from "../../utils/fetchFunctions";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const registerUser = async () => {
    const user = {
      email,
      password,
      confirmPassword,
      name,
      surname,
      phoneNumber,
    };

    const createdUser = await addUser(user);

    if (createdUser) console.log(createdUser);
  };

  return (
    <div className="register">
      <div className="register__container">
        <SingInPanel title="Zarejstruj się" linkText="Zaloguj się" link="/log-in" action={registerUser}>
          <>
            <FormInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <FormInput label="Hasło" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <FormInput label="Powtórz hasło" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <FormInput label="Imię" type="text" value={name} onChange={e => setName(e.target.value)} />
            <FormInput label="Nazwisko" type="text" value={surname} onChange={e => setSurname(e.target.value)} />
            <FormInput label="nr.tel" type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </>
        </SingInPanel>
      </div>
    </div>
  );
};

export default Register;
