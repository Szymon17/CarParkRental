import "./summary.styles.sass";
import Button from "../../components/button/button.component";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectOrder } from "../../store/order/order.selector";
import { selectUser } from "../../store/user/user.selectors";
import { useEffect } from "react";
import { calculatePrice, calculateRentDays, dateToLocalString } from "../../utils/basicFunctions";
import { selectProductByIndex } from "../../store/products/products.selectors";
import { useNavigate } from "react-router-dom";
import { saveOrderFetch } from "../../utils/fetchFunctions";
import { saveUserOrder } from "../../store/user/user.reducer";
import { toast } from "react-toastify";

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const order = useAppSelector(selectOrder);
  const user = useAppSelector(selectUser);
  const product = useAppSelector(selectProductByIndex(order.productIndex ? order.productIndex : -1));

  useEffect(() => {
    if (!user) navigate("/log-in");
    if (!product) navigate("/offers");
  }, [user]);

  const submit = async () => {
    if (product?.index) {
      const status = await saveOrderFetch(order);

      if (status === "ok") {
        dispatch(saveUserOrder({ car: product, data: order }));
        toast.success(t("Ordered"));
        navigate("/");
      }
    }
  };

  return (
    <div className="summary container">
      <div className="summary__left">
        <h1 className="summary__title">{t("Receipt data")}</h1>
        <div className="summary__left__order-data">
          <div className="summary__left__order-data__dates">
            <span className="summary__left__order-data__date">{`${t("Pick up date")}: ${dateToLocalString(new Date(order.date_of_receipt))}`}</span>
            <span className="summary__left__order-data__date">{`${t("Return date")}: ${dateToLocalString(new Date(order.date_of_return))}`}</span>
          </div>
          <div className="summary__left__order-data__locations">
            <span className="summary__left__order-data__location">{`${t("Pick up location")}: ${order.place_of_receipt}`}</span>
            <span className="summary__left__order-data__location">{`${t("Return location")}: ${order.place_of_return}`}</span>
          </div>
        </div>
        <section className="summary__left__data__section">
          <h2 className="summary__data-title">{t("Receipt data")}</h2>
          <ul>
            <li className="summary__left__data__section__box">
              <h3 className="summary__data-title">Email</h3>
              <span className="summary__left__data__section__value">{user?.email}</span>
            </li>
            <li className="summary__left__data__section__box">
              <h3 className="summary__data-title">{t("Name")}</h3>
              <span className="summary__left__data__section__value">{user?.name}</span>
            </li>
            <li className="summary__left__data__section__box">
              <h3 className="summary__data-title">{t("Surname")}</h3>
              <span className="summary__left__data__section__value">{user?.surname}</span>
            </li>
            <li className="summary__left__data__section__box">
              <h3 className="summary__data-title">{t("Phone number")}</h3>
              <span className="summary__left__data__section__value">{user?.phoneNumber}</span>
            </li>
          </ul>
        </section>
        <section className="summary__left__data__section">
          <h2 className="summary__data-title">{t("Product data")}</h2>
          <ul>
            <li className="summary__left__data__section__box">
              <h3 className="summary__data-title">{t("Brand")}</h3>
              <span className="summary__left__data__section__value">{product?.brand}</span>
            </li>
            <li className="summary__left__data__section__box">
              <h3 className="summary__data-title">Model</h3>
              <span className="summary__left__data__section__value">{product?.model}</span>
            </li>
            <li className="summary__left__data__section__box">
              <h3 className="summary__data-title">{t("Year")}</h3>
              <span className="summary__left__data__section__value">{product?.year}</span>
            </li>
          </ul>
        </section>
      </div>
      <div className="summary__right">
        <div className="summary__right__informations">
          <h2 className="summary__right__informations__title">{t("Value of purchase")}</h2>
          <span className="summary__right__informations__ammount">{`${calculatePrice(
            product?.daily_price,
            order.date_of_receipt,
            order.date_of_return
          )}ZŁ`}</span>
          <h2 className="summary__right__informations__title">{t("Additional costs")}</h2>
          <span className="summary__right__informations__ammount">0ZŁ</span>
          <h2 className="summary__right__informations__title">{t("Rental days")}</h2>
          <span className="summary__right__informations__ammount">{`${calculateRentDays(order.date_of_receipt, order.date_of_return)} ${t(
            "Days"
          )}`}</span>
        </div>
        <Button onClick={submit}>{t("Order")}</Button>
      </div>
    </div>
  );
};

export default Summary;
