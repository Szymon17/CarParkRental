import "./offers.styles.sass";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProducts } from "../../store/products/products.actions";
import { selectProducts } from "../../store/products/products.selectors";
import Filtres from "../../components/filtres/filtres.component";
import ProductCard from "../../components/product-card/product-card.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

const testProduct = {
  year: 2019,
  number_of_seats: 5,
  drive_type: "rear axle",
  fuel_type: "gasoline",
  daily_price: 200,
  power: 400,
  brand: "Ford",
  model: "Mustang",
  engine_capacity: "5.0l",
  color: "blue",
  transmission: "manual",
  fuel_usage_city: "15l",
  fuel_usage_outcity: "13l",
  img_url: "test",
  index: 2,
  addons: [
    "Elektryczne szyby",
    "Elektryczne szyby",
    "Elektryczne szyby",
    "Elektryczne szyby",
    "Elektryczne szyby",
    "Elektryczne szyby",
    "Elektryczne szyby",
    "Elektryczne szyby",
    "Elektryczne szyby",
  ],
};

const testProducts = [testProduct, testProduct, testProduct, testProduct];

const Offers = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const [filtersAreOpen, setFiltersState] = useState(false);

  const filtersRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const regexp = /\?[\S]+/;
    const link = window.location.href.toString().match(regexp);

    if (link) dispatch(getProducts(link[0]));
    else dispatch(getProducts(""));
  }, []);

  const toggleFiltersVisability = () => {
    if (filtersRef.current && productsRef.current) {
      filtersRef.current.classList.toggle("open");
      productsRef.current.classList.toggle("hidden");

      setFiltersState(!filtersAreOpen);
    }
  };

  return (
    <div className="offers container">
      <div className="offers__filters-switch">
        <h2 className="offers__filters-switch-title">Filtry</h2>
        <div>
          <button onClick={toggleFiltersVisability} className="offers__filters-switch-button">
            {!filtersAreOpen ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faClose} />}
          </button>
          <span className="offers__filters-switch-text">{!filtersAreOpen ? "Pokaż" : "Ukryj"} wszsytkie filtry</span>
        </div>
      </div>
      <div ref={filtersRef} className="offers__filters-box">
        <Filtres />
      </div>
      <main ref={productsRef} className="offers__products">
        {testProducts.map(product => (
          <ProductCard product={product} />
        ))}
      </main>
    </div>
  );
};

export default Offers;
