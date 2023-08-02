import "./log-in.styles.sass";
import { useEffect, useState } from "react";
import { getTokenByEmailAndPassword } from "../../utils/fetchFunctions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logIn } from "../../store/user/user.reducer";
import { selectUser } from "../../store/user/user.selectors";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/formInput/formInput.component";
import SingInPanel from "../../components/sing-inPanel/sing-inPanel.component";
import { useTranslation } from "react-i18next";

const LogIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const logInUser = async () => {
    if (!user) {
      const data = await getTokenByEmailAndPassword(email, password);
      if (data) {
        const { user, expire } = data;
        dispatch(logIn({ user, expire }));
        navigate("/");
      } else console.error("Check your email or password");
    } else console.error("You are already logged in");
  };

  return (
    <div className="log-in">
      <div className="log-in__container">
        <SingInPanel action={logInUser} title={t("log-in")} linkText={t("register")} link="/register">
          <>
            <FormInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <FormInput label={t("password")} type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </>
        </SingInPanel>
      </div>
      <footer className="log-in__footer">
        <p className="log-in__footer__text">Email: Test@gmaill.com</p>
        <p className="log-in__footer__text">{t("password")}: 123456</p>
      </footer>
    </div>
  );
};

export default LogIn;
