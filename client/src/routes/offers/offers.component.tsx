import "./offers.styles.sass";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProducts } from "../../store/products/products.actions";
import { selectLastIndex, selectProducts } from "../../store/products/products.selectors";
import Filtres from "../../components/filtres/filtres.component";

const testProduct = {
  year: 2019,
  number_of_seats: 5,
  drive_type: "rear axle",
  fuel_type: "gasoline",
  daily_price: 200,
  power: 400,
  brand: "Ford",
  engine_capacity: "5.0l",
  color: "blue",
  transmission: "manual",
  fuel_usage_city: "15l",
  fuel_usage_outcity: "13l",
  img_url: "test",
  index: 2,
};

const Offers = () => {
  const dispatch = useAppDispatch();
  const lastIndex = useAppSelector(selectLastIndex);
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    const regexp = /(offers\S+)/;
    const link = window.location.href.toString().match(regexp);

    if (link) dispatch(getProducts({ url: link[0], lastIndex: lastIndex }));
    else dispatch(getProducts({ url: "offers", lastIndex: lastIndex }));
  }, []);

  return (
    <div className="offers container">
      <Filtres />
      <main className="offers__products">x</main>
    </div>
  );
};

export default Offers;
