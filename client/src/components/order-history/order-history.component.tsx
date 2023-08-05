import "./order-history.styles.sass";
import { UIEvent } from "react";
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

  const scrollHandler = (e: UIEvent<HTMLElement>) => {
    const el = e.currentTarget;

    if (el.scrollTop + el.offsetHeight >= el.scrollHeight - 10 && shouldFetchOrders) dispatch(addUserOrders(ordersCount));
  };

  return (
    <div onScroll={scrollHandler} className="order-history">
      {orders && orders?.map((order, index) => <OrderHistoryItem key={index} order={order} />)}
      {(!orders || !shouldFetchOrders) && <CustomError>{t("there is nothing to display")}</CustomError>}
    </div>
  );
};

export default OrderHistory;
