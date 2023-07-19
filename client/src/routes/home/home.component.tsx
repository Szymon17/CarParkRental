import "./home.styles.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faLocationDot, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import headerImg from "../../assets/BanerBackground.jpg";
import calendarImg from "../../assets/calendar.png";
import lockImg from "../../assets/lock.png";
import moneyImg from "../../assets/money.png";
import OrderWindow from "../../components/orderWindow/orderWindow.component";
import FiltersSnapshot from "../../components/filtersSnapshot/filtersSnapshot.component";

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
      <div className="container">
        <div className="home__beneffits">
          <div className="home__beneffits__item">
            <img className="home__beneffits__item__icon" src={calendarImg} alt="calendarImg" />
            <div className="home__beneffits__item__descriptionContainer">
              <h2 className="home__beneffits__item__title">Elastyczność</h2>
              <p className="home__beneffits__item__text">
                Oferujemy darmową wycenę oraz odstąpienie od wyporzyczenia na 72h przed twoim terminem zupełnie za darmo
              </p>
            </div>
          </div>
          <div className="home__beneffits__item">
            <img className="home__beneffits__item__icon" src={lockImg} alt="calendarImg" />
            <div className="home__beneffits__item__descriptionContainer">
              <h2 className="home__beneffits__item__title">Bezpieczeństwo</h2>
              <p className="home__beneffits__item__text">
                Samochody w naszych ofertach posiadają spersonalizowane ubezpieczenie abyś czuł się bezpiecznie w razie awarii lub szkody
              </p>
            </div>
          </div>
          <div className="home__beneffits__item">
            <img className="home__beneffits__item__icon" src={moneyImg} alt="calendarImg" />
            <div className="home__beneffits__item__descriptionContainer">
              <h2 className="home__beneffits__item__title">Proste płatności</h2>
              <p className="home__beneffits__item__text">
                Składanie zamówień jest szybkie i proste a wszystkie kosztu wynajmu podajemy w podsumowaniu
              </p>
            </div>
          </div>
        </div>
        <div className="home__filtersContainer">
          <FiltersSnapshot
            links={["Warszawa", "Łódź", "Kraków", "Gdańsk", "Toruń", "Wrocław"]}
            title="Najczęśniej sprawdzane lokalizacje"
            filterClass="location"
          />
          <FiltersSnapshot
            links={["Chevrolet", "Opel", "Renault", "Toyota", "Ford", "Dodge"]}
            title="Najczęśniej sprawdzane marki"
            filterClass="vehicleBrand"
          />
        </div>
      </div>
      <div className="home__baner">
        <div className="home__baner__container">
          <div className="home__baner__item">
            <FontAwesomeIcon className="home__baner__icon" icon={faCar} />
            <span className="home__baner__text">151</span>
          </div>
          <div className="home__baner__item">
            <FontAwesomeIcon className="home__baner__icon" icon={faLocationDot} />
            <span className="home__baner__text">51</span>
          </div>
          <div className="home__baner__item">
            <FontAwesomeIcon className="home__baner__icon" icon={faUserGroup} />
            <span className="home__baner__text">3K+</span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="home__offtenChosenFiltres">
          <FiltersSnapshot
            links={["Sport", "SUV", "Offroad", "Hatchback", "Kombi", "Sedan"]}
            title="Najczęśniej sprawdzane rodzaje samochodów"
            filterClass="vehicleType"
            horizontal={true}
          />
        </div>
        <footer className="home__footer">
          Projekt powstał tylko z myślą o rozwoju własnych umiejętności. Nie jest to projekt biznesowy jak i nie jest przedmiotem komercyjnym
          należącym do realnej firmy.
        </footer>
      </div>
    </div>
  );
};

export default Home;
