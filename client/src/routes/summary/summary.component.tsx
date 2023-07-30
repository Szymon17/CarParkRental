import "./summary.styles.sass";
import Button from "../../components/button/button.component";
import FormInput from "../../components/formInput/formInput.component";
import { useTranslation } from "react-i18next";

const testProduct = {
  year: 2019,
  number_of_seats: 5,
  drive_type: "rear axle",
  fuel_type: "gasoline",
  daily_price: 200,
  power: 400,
  brand: "Ford",
  model: "Mustang",
  engine_capacity: "5.0l",
  color: "blue",
  transmission: "manual",
  fuel_usage_city: "15l",
  fuel_usage_outcity: "13l",
  img_url: "../assets/mustang.png",
  index: 2,
  addons: ["Elektryczne szyby", "Elektryczne szyby", "Elektryczne szyby", "Elektryczne szyby", "Elektryczne szyby", "Elektryczne szyby"],
};

const testLocations = ["Warszawa, Kraków, Gdańsk"];

const Summary = () => {
  const { t } = useTranslation();

  const order = () => {
    console.log("dsadsa");
  };

  return (
    <div className="summary">
      <div className="summary__left"></div>
      <div className="summary__right">
        <form method="post">
          <select id="">
            <option value="">Warszawa</option>
          </select>
          <FormInput></FormInput>
        </form>
      </div>
      <Button>{t("order")}</Button>
    </div>
  );
};

export default Summary;
