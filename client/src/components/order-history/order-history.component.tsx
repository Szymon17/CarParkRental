import "./order-history.styles.sass";
import { UIEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectFetchOrdersState, selectOrdersCount, selectUserOrders } from "../../store/user/user.selectors";
import { addUserOrders } from "../../store/user/user.actions";
import CustomError from "../custom-error/custom-error.component";
import { useTranslation } from "react-i18next";
import OrderHistoryItem from "../order-hitory-item/order-history-item.component";

const OrderHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectUserOrders);
  const ordersCount = useAppSelector(selectOrdersCount);
  const shouldFetchOrders = useAppSelector(selectFetchOrdersState);

  const historyRef = useRef<HTMLDivElement | null>(null);
  const [fetchDelay, setFetchDelay] = useState(false);

  const scrollHandler = (e: UIEvent<HTMLElement>) => {
    const el = e.currentTarget;

    const item = e.currentTarget?.childNodes[0] as HTMLElement;

    if (el.scrollTop + el.offsetHeight >= el.scrollHeight && shouldFetchOrders && !fetchDelay && item.offsetHeight < 500) {
      const itemsCount = Math.ceil(el.offsetHeight / (item.offsetHeight + 40));

      setFetchDelay(true);
      setTimeout(() => setFetchDelay(false), 400);
      dispatch(addUserOrders({ ordersCount, itemsCount }));
    }
  };

  return (
    <div onScroll={scrollHandler} ref={historyRef} className="order-history">
      {orders && orders?.map((order, index) => <OrderHistoryItem key={index} order={order} />)}
      {(!orders || !shouldFetchOrders) && <CustomError>{t("there is nothing to display")}</CustomError>}
    </div>
  );
};

export default OrderHistory;
