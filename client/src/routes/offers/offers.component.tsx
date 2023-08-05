import "./offers.styles.sass";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProducts } from "../../store/products/products.actions";
import { selectProducts, selectProductsStatus } from "../../store/products/products.selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Filtres from "../../components/filtres/filtres.component";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import CustomError from "../../components/custom-error/custom-error.component";

const Offers = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const productStatus = useAppSelector(selectProductsStatus);
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
      <main ref={productsRef} className="offers__main">
        {products.length > 0 ? (
          <div className="offers__products">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : productStatus === "loading" ? (
          <Spinner />
        ) : (
          <CustomError>{t("there is nothing to display")}</CustomError>
        )}
      </main>
    </div>
  );
};

export default Offers;
