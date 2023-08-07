import "./orderWindow.styles.sass";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dateToLocalString, dayAfterTomorrow, isDateError, tomorrow } from "../../utils/basicFunctions";
import { useAppDispatch } from "../../store/hooks";
import { saveOrderData } from "../../store/order/order.reducer";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Button, { BUTTON_CLASSES } from "../button/button.component";
import SelectLocations from "../select-locations/select-locations.component";

const OrderWindow = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [place_of_receipt, set_place_of_receipt] = useState("Warszawa");
  const [place_of_return, set_place_of_return] = useState("Warszawa");
  const [date_of_receipt, set_date_of_receipt] = useState(tomorrow);
  const [date_of_return, set_date_of_return] = useState(dayAfterTomorrow);

  const inputsHandler = (value: Date | string, handler: Function) => {
    handler(value);
  };

  const search = () => {
    const dateError = isDateError(date_of_receipt, date_of_return);

    if (!place_of_receipt || !place_of_return) toast.error(t("no location alert"));
    else if (dateError) toast.error(t(dateError));
    else {
      dispatch(saveOrderData({ place_of_receipt, place_of_return, date_of_receipt, date_of_return }));
      navigate(
        `offers?pul=${place_of_receipt}&rl=${place_of_return}&rd=${dateToLocalString(date_of_receipt)}&rtd=${dateToLocalString(date_of_return)}`
      );
    }
  };

  return (
    <div className="orderWindow">
      <div className="orderWindow__container">
        <div className="orderWindow__item">
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">{t("pick up location")}</label>
            <SelectLocations changeState={set_place_of_receipt} />
          </div>
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">{t("return location")}</label>
            <SelectLocations changeState={set_place_of_return} />
          </div>
        </div>
        <div className="orderWindow__item">
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">{t("pick up date")}</label>
            <input
              type="date"
              value={dateToLocalString(date_of_receipt)}
              onChange={e => inputsHandler(new Date(e.target.value), set_date_of_receipt)}
              className="orderWindow__dateInput"
            ></input>
          </div>
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">{t("return date")}</label>
            <input
              type="date"
              value={dateToLocalString(date_of_return)}
              onChange={e => inputsHandler(new Date(e.target.value), set_date_of_return)}
              className="orderWindow__dateInput"
            ></input>
          </div>
        </div>
      </div>
      <div className="orderWindow__buttonContainer">
        <Button buttonType={BUTTON_CLASSES.green} onClick={search}>
          {t("check")}
        </Button>
      </div>
    </div>
  );
};

export default OrderWindow;
