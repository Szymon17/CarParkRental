import "./filtres.styles.sass";
import { useState, ChangeEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import FormInput from "../formInput/formInput.component";
import { dateToLocalString, tomorrow } from "../../utils/basicFunctions";
import Button from "../button/button.component";

const triallLocations = ["Wrocław", "Warszawa", "Kraków", "Łódź", "Wrocław", "Kraków", "Łódź"];

const Filtres = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const [pickUpLocation, setPickUpLocation] = useState(searchParams.get("pul") || "Wybierz lokację");
  const [returnLocation, setReturnLocation] = useState(searchParams.get("rl") || "Wybierz lokację");
  const [rentalDate, setRentalDate] = useState(searchParams.get("rd") ? new Date(searchParams.get("rd") as string) : new Date());
  const [returnDate, setReturnDate] = useState(searchParams.get("rtd") ? new Date(searchParams.get("rtd") as string) : new Date(tomorrow));

  const [numberOfSits, setNumberOfSits] = useState(null);
  const [fuelType, setFuelType] = useState(null);
  const [driveType, setDriveType] = useState(null);

  const filters: { name: string; value: string | null }[] = [
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

    navigate(link);
  };

  return (
    <aside className="filtres">
      <section className="filtres__header">
        <h1 className="filtres__header-title">Filtres</h1>
        <Link to={"/offers"} className="filtres__header-clearFiltres">
          Wyczyść filtry
        </Link>
      </section>
      <section className="filtres__price filtres__section">
        <h2 className="filtres__section__title">Cena</h2>
        <div className="filtres__price__box filtres__section__body">
          <span className="filtres__price__box-minValue">{minValue}ZŁ</span>
          <span className="filtres__price__box-maxValue">{maxValue}ZŁ</span>
          <div style={progressBarStyles} className="filtres__price__box-progress"></div>
          <input type="range" min={0} value={minValue} max={1000} onChange={priceInputsHandler} className="filtres__price__box-input minValue" />
          <input type="range" min={0} value={maxValue} max={1000} onChange={priceInputsHandler} className="filtres__price__box-input maxValue" />
        </div>
      </section>
      <section className="filtres__data filtres__section">
        <h2 className="filtres__section__title">Dane</h2>
        <div className="filtres__section__body">
          <div className="filtres__data__locations">
            <select onChange={e => setPickUpLocation(e.target.value)} defaultValue={pickUpLocation} className="filtres__data__locations-select">
              {triallLocations.map((location, index) => (
                <option key={index}>{location}</option>
              ))}
            </select>
            <select onChange={e => setReturnLocation(e.target.value)} defaultValue={returnLocation} className="filtres__data__locations-select">
              {triallLocations.map((location, index) => (
                <option key={index}>{location}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="filtres__data__dates">
          <FormInput
            onChange={e => new Date(e.target.value) < returnDate && setRentalDate(new Date(e.target.value))}
            value={dateToLocalString(rentalDate)}
            type="date"
          ></FormInput>
          <FormInput
            onChange={e => new Date(e.target.value) > rentalDate && setReturnDate(new Date(e.target.value))}
            value={dateToLocalString(returnDate)}
            type="date"
          ></FormInput>
        </div>
      </section>
      <section className="filtres__numberOfSits filtres__section">
        <h2 className="filtres__section__title">Liczba miejsc</h2>
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
        <h2 className="filtres__section__title">Rodzaj paliwa</h2>
        <div className="filtres__section__body">
          <ul className="filtres__section__list">
            <li className="filtres__section__list__item">
              <input value={"petrol"} checked={fuelType === "petrol"} onChange={e => checkboxHandler(e, setFuelType)} type="checkbox" />
              <span>Benzyna</span>
            </li>
            <li className="filtres__section__list__item">
              <input value={"diesel"} checked={fuelType === "diesel"} onChange={e => checkboxHandler(e, setFuelType)} type="checkbox" />
              <span>Diesel</span>
            </li>
            <li className="filtres__section__list__item">
              <input value={"electric"} checked={fuelType === "electric"} onChange={e => checkboxHandler(e, setFuelType)} type="checkbox" />
              <span>Elektrczne</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="filtres__driveType filtres__section">
        <h2 className="filtres__section__title">Napęd</h2>
        <div className="filtres__section__body">
          <ul className="filtres__section__list">
            <li className="filtres__section__list__item">
              <input value={"4x4"} checked={driveType === "4x4"} onChange={e => checkboxHandler(e, setDriveType)} type="checkbox" />
              <span>4x4</span>
            </li>
            <li className="filtres__section__list__item">
              <input value={"rear axle"} checked={driveType === "rear axle"} onChange={e => checkboxHandler(e, setDriveType)} type="checkbox" />
              <span>Tylnia oś</span>
            </li>
            <li className="filtres__section__list__item">
              <input value={"front axle"} checked={driveType === "front axle"} onChange={e => checkboxHandler(e, setDriveType)} type="checkbox" />
              <span>Przednia oś</span>
            </li>
          </ul>
        </div>
      </section>
      <Button onClick={filterHendler}>Filtruj</Button>
    </aside>
  );
};

export default Filtres;
