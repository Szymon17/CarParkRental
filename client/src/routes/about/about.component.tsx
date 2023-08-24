import { useTranslation } from "react-i18next";
import "./about.styles.sass";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="about">
      <h1 className="about__title">{t("Who are we?")}</h1>
      <div className="about__body">
        <div className="about__body__container container">
          <div className="about__description">
            <section className="about__textBox">
              <h2 className="about__sectionTitle">CarRentPark</h2>
              <p className="about__text">{t("About company")}</p>
            </section>
          </div>
          <aside className="about__contact">
            <h2 className="about__contact__title">Kontakt</h2>
            <ul className="about__contact__list">
              <li className="about__contact__list__item">{`${t("Phone number")}: 658435432`}</li>
              <li className="about__contact__list__item">{`${t("Location")}: 03-736 Warszawa`}</li>
              <li className="about__contact__list__item">ul: Poznańska 45</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default About;
