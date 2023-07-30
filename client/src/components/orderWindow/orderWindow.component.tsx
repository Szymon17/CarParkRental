import "./orderWindow.styles.sass";
import Button, { BUTTON_CLASSES } from "../button/button.component";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dateToLocalString, today, tomorrow } from "../../utils/basicFunctions";
import SelectLocations from "../select-locations/select-locations.component";

const fakeArrayOfLocations = ["Warszawa", "Łódź"];

const OrderWindow = () => {
  const [pickUpLocation, setPickUpLocation] = useState("Warszawa");
  const [returnLocation, setReturnLocation] = useState("Warszawa");
  const [receiptDate, setReceiptDate] = useState(today);
  const [returnDate, setReturnDate] = useState(tomorrow);
  const navigate = useNavigate();

  const selectsHandler = (e: ChangeEvent<HTMLSelectElement>, handler: Function) => {
    handler(e.target.value);
  };

  const inputsHandler = (e: ChangeEvent<HTMLInputElement>, handler: Function) => {
    handler(new Date(e.target.value));
  };

  const search = () => {
    if (
      receiptDate < today ||
      receiptDate > returnDate ||
      receiptDate.toDateString() === returnDate.toDateString() ||
      !pickUpLocation ||
      !returnLocation
    ) {
      console.log("you picked wrong data");
      return;
    } else navigate(`offers?pul=${pickUpLocation}&rl=${returnLocation}&rd=${dateToLocalString(receiptDate)}&rtd=${dateToLocalString(returnDate)}`);
  };

  return (
    <div className="orderWindow">
      <div className="orderWindow__container">
        <div className="orderWindow__item">
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">Miejsce odbioru</label>
            <SelectLocations changeHandler={e => selectsHandler(e, setPickUpLocation)} locations={fakeArrayOfLocations} />
          </div>
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">Miejsce zwrotu</label>
            <SelectLocations changeHandler={e => selectsHandler(e, setReturnLocation)} locations={fakeArrayOfLocations} />
          </div>
        </div>
        <div className="orderWindow__item">
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">Data odbioru</label>
            <input
              type="date"
              value={dateToLocalString(receiptDate)}
              onChange={e => inputsHandler(e, setReceiptDate)}
              className="orderWindow__dateInput"
            ></input>
          </div>
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">Data zwrotu</label>
            <input
              type="date"
              value={dateToLocalString(returnDate)}
              onChange={e => inputsHandler(e, setReturnDate)}
              className="orderWindow__dateInput"
            ></input>
          </div>
        </div>
      </div>
      <div className="orderWindow__buttonContainer">
        <Button buttonType={BUTTON_CLASSES.green} onClick={search}>
          Szukaj
        </Button>
      </div>
    </div>
  );
};

export default OrderWindow;
