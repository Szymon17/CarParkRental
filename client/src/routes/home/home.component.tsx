import "./home.styles.sass";
import headerImg from "../../assets/BanerBackground.jpg";
import calendarImg from "../../assets/calendar.png";
import lockImg from "../../assets/lock.png";
import moneyImg from "../../assets/money.png";
import OrderWindow from "../../components/orderWindow/orderWindow.component";

const Home = () => {
  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__header_title">Wypożyczalnia aut - Bezpiecznie, zaoszczędź nawet 50%</h1>
        <div className="home__header__orderBox">
          <OrderWindow />
        </div>
        <img className="home__header_background" src={headerImg} alt="background" />
        <div className="home__header_filter"></div>
      </header>
      <div className="home__beneffits">
        <div className="home__beneffits__item">
          <h2 className="home__beneffits__item__title">Elastyczność</h2>
          <p className="home__beneffits__item__text">
            Oferujemy darmową wycenę oraz odstąpienie od wyporzyczenia na 72h przed twoim terminem zupełnie za darmo
          </p>
          <img className="home__beneffits__item__icon" src={calendarImg} alt="calendarImg" />
        </div>
        <div className="home__beneffits__item">
          <h2 className="home__beneffits__item__title">Bezpieczeństwo</h2>
          <p className="home__beneffits__item__text">
            Samochody w naszych ofertach posiadają spersonalizowane ubezpieczenie abyś czuł się bezpiecznie w razie awarii lub szkody
          </p>
          <img className="home__beneffits__item__icon" src={lockImg} alt="calendarImg" />
        </div>
        <div className="home__beneffits__item">
          <h2 className="home__beneffits__item__title">Proste płatności</h2>
          <p className="home__beneffits__item__text">Składanie zamówień jest szybkie i proste a wszystkie kosztu wynajmu podajemy w podsumowaniu</p>
          <img className="home__beneffits__item__icon" src={moneyImg} alt="calendarImg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
