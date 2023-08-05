import "./order-history-item.styles.sass";
import { FC, MutableRefObject, Ref, useRef, useState } from "react";
import { userOrder } from "../../store/user/user.types";
import { dateToLocalString } from "../../utils/basicFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import ProductDetails from "../product-details/product-details.component";

const OrderHistoryItem: FC<{ order: userOrder }> = ({ order }) => {
  const { car, data } = order;

  const itemRef = useRef<HTMLDivElement | null>(null);

  const [extended, setExtendState] = useState(false);

  const extend = () => {
    const itemCard = itemRef.current;

    if (itemCard) {
      setExtendState(!extended);

      itemCard.classList.toggle("extended");
    }
  };

  return (
    <div ref={itemRef} className="orderHistoryItem">
      <div className="orderHistoryItem__header">
        <img className="orderHistoryItem__img" src={car.img_url} alt="car-img" />
        <div className="orderHistoryItem__description">
          <h2 className="orderHistoryItem__title">{`${car.brand} ${car.model}`}</h2>
          <div className="orderHistoryItem__basicData">
            <span className="orderHistoryItem__basicData__item">{dateToLocalString(new Date(data.date_of_receipt))}</span>
            <span className="orderHistoryItem__basicData__item">{data.place_of_receipt}</span>
            <span className="orderHistoryItem__basicData__item">{dateToLocalString(new Date(data.date_of_return))}</span>
            <span className="orderHistoryItem__basicData__item">{data.place_of_return}</span>
            <FontAwesomeIcon onClick={extend} className="orderHistoryItem__extendIcon" icon={faAnglesDown} />
          </div>
        </div>
      </div>
      <div className="orderHistoryItem__body">{<ProductDetails product={car} />}</div>
    </div>
  );
};

export default OrderHistoryItem;
