import "./register.styles.sass";
import { useState } from "react";
import FormInput from "../formInput/formInput.component";
import SingInPanel from "../sing-inPanel/sing-inPanel.component";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="register">
      <div className="register__container">
        <SingInPanel title="Zaloguj się" linkText="Zarejstruj się" link="/register">
          <>
            <FormInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <FormInput label="Hasło" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </>
        </SingInPanel>
      </div>
    </div>
  );
};

export default Register;
