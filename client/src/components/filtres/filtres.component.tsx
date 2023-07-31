import "./filtres.styles.sass";
import { useState, ChangeEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { dateToLocalString, tomorrow } from "../../utils/basicFunctions";
import { useAppDispatch } from "../../store/hooks";
import { getProducts } from "../../store/products/products.actions";
import { saveOrderData } from "../../store/order/order.reducer";
import { useTranslation } from "react-i18next";
import SelectLocations from "../select-locations/select-locations.component";
import Button from "../button/button.component";
import FormInput from "../formInput/formInput.component";

const Filtres = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const [place_of_receipt, set_place_of_receipt] = useState(searchParams.get("pul") || "Wybierz lokację");
  const [place_of_return, set_place_of_return] = useState(searchParams.get("rl") || "Wybierz lokację");
  const [date_of_receipt, set_date_of_receipt] = useState(searchParams.get("rd") ? new Date(searchParams.get("rd") as string) : new Date());
  const [date_of_return, set_date_of_return] = useState(searchParams.get("rtd") ? new Date(searchParams.get("rtd") as string) : new Date(tomorrow));

  const [numberOfSits, setNumberOfSits] = useState(searchParams.get("number_of_seats") || null);
  const [fuelType, setFuelType] = useState(searchParams.get("fuel_type") || null);
  const [driveType, setDriveType] = useState(searchParams.get("drive_type") || null);

  const filters: { name: string; value: string | null }[] = [
    { name: "pul", value: place_of_receipt },
    { name: "rl", value: place_of_return },
    { name: "rd", value: dateToLocalString(date_of_receipt) },
    { name: "rtd", value: dateToLocalString(date_of_return) },
    { name: "number_of_seats", value: numberOfSits },
    { name: "fuel_type", value: fuelType },
    { name: "drive_type", value: driveType },
  ];

  const progressBarStyles = {
    left: `${(minValue / 1000) * 100}%`,
    right: `${100 - (maxValue / 1000) * 100}%`,
  };

  const priceInputsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    const value = Number(element.value);

    if (element.classList.contains("minValue")) {
      if (value + 100 > maxValue) setMinValue(maxValue - 100);
      else setMinValue(value);
    } else if (element.classList.contains("maxValue")) {
      if (value - 100 < minValue) setMaxValue(minValue + 100);
      else setMaxValue(Number(e.target.value));
    }
  };

  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>, setPrpertyHandler: Function) => {
    if (e.target.checked) setPrpertyHandler(e.target.value);
    else setPrpertyHandler(null);
  };

  const filterHendler = () => {
    let i = 0;

    const link = filters.reduce((acc, filter) => {
      if (filter.value) {
        if (i === 0) acc += `?${filter.name}=${filter.value}`;
        else acc += `&${filter.name}=${filter.value}`;

        i++;
      }

      return acc;
    }, "");

    if (link) {
      navigate(link);
      dispatch(getProducts(link));
      dispatch(saveOrderData({ date_of_receipt, date_of_return, place_of_receipt, place_of_return }));
    }
  };

  return (
    <aside className="filtres">
      <section className="filtres__header">
        <h1 className="filtres__header-title">{t("filters")}</h1>
        <Link to={"/offers"} className="filtres__header-clearFiltres">
          {t("clear filters")}
        </Link>
      </section>
      <section className="filtres__price filtres__section">
        <h2 className="filtres__section__title">{t("price")}</h2>
        <div className="filtres__price__box filtres__section__body">
          <span className="filtres__price__box-minValue">{minValue}ZŁ</span>
          <span className="filtres__price__box-maxValue">{maxValue}ZŁ</span>
          <div style={progressBarStyles} className="filtres__price__box-progress"></div>
          <input type="range" min={0} value={minValue} max={1000} onChange={priceInputsHandler} className="filtres__price__box-input minValue" />
          <input type="range" min={0} value={maxValue} max={1000} onChange={priceInputsHandler} className="filtres__price__box-input maxValue" />
        </div>
      </section>
      <section className="filtres__data filtres__section">
        <h2 className="filtres__section__title">{t("data")}</h2>
        <div className="filtres__section__body">
          <div className="filtres__data__locations">
            <SelectLocations defaultValue={place_of_receipt} changeHandler={e => set_place_of_receipt(e.target.value)} />
            <SelectLocations defaultValue={place_of_return} changeHandler={e => set_place_of_return(e.target.value)} />
          </div>
        </div>
        <div className="filtres__data__dates">
          <FormInput
            onChange={e => new Date(e.target.value) < date_of_return && set_date_of_receipt(new Date(e.target.value))}
            value={dateToLocalString(date_of_receipt)}
            type="date"
          ></FormInput>
          <FormInput
            onChange={e => new Date(e.target.value) > date_of_receipt && set_date_of_return(new Date(e.target.value))}
            value={dateToLocalString(date_of_return)}
            type="date"
          ></FormInput>
        </div>
      </section>
      <section className="filtres__numberOfSits filtres__section">
        <h2 className="filtres__section__title">{t("number_of_sits")}</h2>
        <div className="filtres__section__body">
          <ul className="filtres__section__list">
            <li className="filtres__section__list__item">
              <input value={2} checked={numberOfSits === "2"} onChange={e => checkboxHandler(e, setNumberOfSits)} type="checkbox" />
              <span>2</span>
            </li>
            <li className="filtres__section__list__item">
              <input value={5} checked={numberOfSits === "5"} onChange={e => checkboxHandler(e, setNumberOfSits)} type="checkbox" />
              <span>5</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="filtres__FuelType filtres__section">
        <h2 className="filtres__section__title">{t("fuel_type")}</h2>
        <div className="filtres__section__body">
          <ul className="filtres__section__list">
            <li className="filtres__section__list__item">
              <input value={"petrol"} checked={fuelType === "petrol"} onChange={e => checkboxHandler(e, setFuelType)} type="checkbox" />
              <span>{t("gasoline")}</span>
            </li>
            <li className="filtres__section__list__item">
              <input value={"diesel"} checked={fuelType === "diesel"} onChange={e => checkboxHandler(e, setFuelType)} type="checkbox" />
              <span>Diesel</span>
            </li>
            <li className="filtres__section__list__item">
              <input value={"electric"} checked={fuelType === "electric"} onChange={e => checkboxHandler(e, setFuelType)} type="checkbox" />
              <span>{t("electric")}</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="filtres__driveType filtres__section">
        <h2 className="filtres__section__title">{t("drive_type")}</h2>
        <div className="filtres__section__body">
          <ul className="filtres__section__list">
            <li className="filtres__section__list__item">
              <input value={"4x4"} checked={driveType === "4x4"} onChange={e => checkboxHandler(e, setDriveType)} type="checkbox" />
              <span>4x4</span>
            </li>
            <li className="filtres__section__list__item">
              <input value={"rear axle"} checked={driveType === "rear axle"} onChange={e => checkboxHandler(e, setDriveType)} type="checkbox" />
              <span>{t("rear axle")}</span>
            </li>
            <li className="filtres__section__list__item">
              <input value={"front axle"} checked={driveType === "front axle"} onChange={e => checkboxHandler(e, setDriveType)} type="checkbox" />
              <span>{t("front axle")}</span>
            </li>
          </ul>
        </div>
      </section>
      <Button onClick={filterHendler}>{t("filter")}</Button>
    </aside>
  );
};

export default Filtres;
