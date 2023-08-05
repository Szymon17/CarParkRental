import "./product-details.styles.sass";
import { FC } from "react";
import { product } from "../../store/products/products.types";
import { useTranslation } from "react-i18next";

const ProductDetails: FC<{ product: product }> = ({ product }) => {
  const { t } = useTranslation();

  return (
    <div className="productDetails">
      <div className="productDetails__lists">
        <ul className="productDetails__list">
          <li className="productDetails__list__item">
            <span className="productDetails__list__item__left">{t("brand")}</span>
            <span className="productDetails__list__item__right">{product.brand}</span>
          </li>
          <li className="productDetails__list__item">
            <span className="productDetails__list__item__left">Model</span>
            <span className="productDetails__list__item__right">{product.model}</span>
          </li>
          <li className="productDetails__list__item">
            <span className="productDetails__list__item__left">{t("year")}</span>
            <span className="productDetails__list__item__right">{product.year}</span>
          </li>
          <li className="productDetails__list__item">
            <span className="productDetails__list__item__left">{t("capacity")}</span>
            <span className="productDetails__list__item__right">{product.engine_capacity}</span>
          </li>
          <li className="productDetails__list__item">
            <span className="productDetails__list__item__left">{t("color")}</span>
            <span className="productDetails__list__item__right">{t(product.color)}</span>
          </li>
        </ul>
        <ul className="productDetails__list">
          <li className="productDetails__list__item">
            <span className="productDetails__list__item__left">{t("transmission")}</span>
            <span className="productDetails__list__item__right">{t(product.transmission)}</span>
          </li>
          <li className="productDetails__list__item">
            <span className="productDetails__list__item__left">{t("fuel consumption city")}</span>
            <span className="productDetails__list__item__right">{product.fuel_usage_city}</span>
          </li>
          <li className="productDetails__list__item">
            <span className="productDetails__list__item__left">{t("fuel consumption out of city")}</span>
            <span className="productDetails__list__item__right">{product.fuel_usage_outcity}</span>
          </li>
          <li className="productDetails__list__item">
            <span className="productDetails__list__item__left">{t("drive_type")}</span>
            <span className="productDetails__list__item__right">{t(product.drive_type)}</span>
          </li>
          <li className="productDetails__list__item">
            <span className="productDetails__list__item__left">{t("power")}</span>
            <span className="productDetails__list__item__right">{product.power}hp</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
