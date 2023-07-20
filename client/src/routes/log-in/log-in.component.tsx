import { useState } from "react";
import FormInput from "../../components/formInput/formInput.component";
import SingInPanel from "../../components/sing-inPanel/sing-inPanel.component";
import "./log-in.styles.sass";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="log-in">
      <div className="log-in__container">
        <SingInPanel title="Zaloguj się" linkText="Zarejstruj się" link="/register">
          <>
            <FormInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <FormInput label="Hasło" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </>
        </SingInPanel>
      </div>
      <footer className="log-in__footer">
        <p className="log-in__footer__text">Konto testowe</p>
        <p className="log-in__footer__text">Email: Test@gmaill.com</p>
        <p className="log-in__footer__text">Hasło: 123456</p>
      </footer>
    </div>
  );
};

export default LogIn;
