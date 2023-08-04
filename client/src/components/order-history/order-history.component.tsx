import "./order-history.styles.sass";
import { UIEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectLastOrderIndex, selectUserOrders } from "../../store/user/user.selectors";
import { addUserOrders } from "../../store/user/user.actions";

const OrderHistory = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectUserOrders);
  const ordersLastIndex = useAppSelector(selectLastOrderIndex);

  useEffect(() => {
    if (orders?.length === 0) dispatch(addUserOrders(ordersLastIndex));
  }, [orders]);

  const scrollHandler = (e: UIEvent<HTMLElement>) => {
    const el = e.currentTarget;
    console.log(el.offsetTop, el.clientHeight);
  };

  return <div onScroll={scrollHandler} className="order-history"></div>;
};

export default OrderHistory;
