import "./log-in.styles.sass";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser, selectUserStatus } from "../../store/user/user.selectors";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { logInUser } from "../../store/user/user.actions";
import FormInput from "../../components/formInput/formInput.component";
import SingInPanel from "../../components/sing-inPanel/sing-inPanel.component";

const LogIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userState = useAppSelector(selectUserStatus);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
      toast.error(t("already logged-in"));
    }
  }, []);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const tryLogIn = () => {
    if (userState !== "loading")
      dispatch(
        logInUser({
          email,
          password,
          succesHandler: () => toast.success(t("succesful login")),
          errorHandler: () => toast.error(t("check your login data")),
        })
      );
  };

  return (
    <div className="log-in">
      <div className="log-in__container">
        <SingInPanel action={tryLogIn} title={t("log-in")} linkText={t("register")} link="/register">
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
