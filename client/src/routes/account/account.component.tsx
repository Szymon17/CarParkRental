import { Link, useNavigate } from "react-router-dom";
import "./account.styles.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectNextUpdateTime, selectUser } from "../../store/user/user.selectors";
import { SyntheticEvent, useEffect, useState } from "react";
import FormInput from "../../components/formInput/formInput.component";
import Button, { BUTTON_CLASSES } from "../../components/button/button.component";
import { userUpdate } from "../../store/user/user.types";
import { validate } from "../../utils/basicFunctions";
import { deleteUserFetch, updateUserFetch } from "../../utils/fetchFunctions";
import { logOut, updateUserState } from "../../store/user/user.reducer";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const nextUpdateTime = useAppSelector(selectNextUpdateTime);

  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const [surname, setSurname] = useState(user?.surname);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);

  const [timeToUpdate, setTimeToUpdate] = useState(new Date().getTime());

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    const intervalIndex = setInterval(() => setTimeToUpdate(new Date().getTime()), 1000);

    return () => {
      clearInterval(intervalIndex);
    };
  }, []);

  const updateUser = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (user) {
      const fieldsToUpdate: userUpdate = { email: user.email };

      if (email && email !== user.email && validate.email(email)) fieldsToUpdate.newEmail = email;
      if (name && name !== user.name && validate.name(name)) fieldsToUpdate.name = name;
      if (surname && surname !== user.surname && validate.name(surname)) fieldsToUpdate.surname = surname;
      if (phoneNumber && phoneNumber !== user.phoneNumber && validate.phoneNumber(phoneNumber)) fieldsToUpdate.phoneNumber = phoneNumber;

      const status = await updateUserFetch(fieldsToUpdate);

      if (status?.status === "ok") {
        dispatch(updateUserState(status.nextUpdateTime));
        dispatch(logOut());
      }
    } else console.log("User not found");
  };

  const calculateDelayTime = (): string => {
    const time = nextUpdateTime - timeToUpdate;

    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    return `${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
  };

  const deleteAccount = async () => {
    if (user) {
      const res = await deleteUserFetch(user.email);

      if (res && res.status === "ok") {
        dispatch(logOut());
        console.log(res.message);
      }
    }
  };

  return (
    <div className="account">
      <div className="account__container container">
        <div className="account__profile">
          <aside className="account__aside">
            <div className="account__aside__profile__title">
              <div className="account__aside__profile__title-picture">
                <span className="account__aside__profile__title-picture-text">{`${user?.name.charAt(0)}${user?.surname.charAt(0)}`}</span>
              </div>
              <h2 className="account__aside__profile__title-name"></h2>
            </div>
            <ul className="account__aside__profileActions">
              <li className="account__aside__profileActions-link">
                <Link to="/account">Profil</Link>
              </li>
              <li className="account__aside__profileActions-link">
                <Link to="/account/history">Historia zamówień</Link>
              </li>
              <li className="account__aside__profileActions-action">
                <button onClick={deleteAccount}>Usuń konto</button>
              </li>
            </ul>
          </aside>
          <h1 className="account__name">{`${user?.name} ${user?.surname}`}</h1>
          <main className="account__main">
            <form onSubmit={updateUser} method="put" className="account__main__form container">
              <div className="account__main__container__inputs">
                <FormInput value={email} onChange={e => setEmail(e.target.value)} label="Email" />
                <FormInput value={name} onChange={e => setName(e.target.value)} label="Imię" />
                <FormInput value={surname} onChange={e => setSurname(e.target.value)} label="Nazwisko" />
                <FormInput value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} label="Telefon" />
              </div>
              {nextUpdateTime < timeToUpdate ? (
                <Button type="submit">Zapisz</Button>
              ) : (
                <Button buttonType={BUTTON_CLASSES.disable} onClick={e => e.preventDefault()}>
                  {`${calculateDelayTime()}`}
                </Button>
              )}
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
