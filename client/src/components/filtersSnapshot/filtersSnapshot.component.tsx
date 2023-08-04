import "./filtersSnapshot.styles.sass";
import { FC } from "react";
import { Link } from "react-router-dom";
import { dateToLocalString, dayAfterTomorrow, replacePolishLterals, tomorrow } from "../../utils/basicFunctions";

const filterClasses = ["brand", "location", "type"] as const;

type filtersSnapshotTypes = {
  links: string[];
  title: string;
  filterClass: (typeof filterClasses)[number];
  horizontal?: boolean;
};

const FiltersSnapshot: FC<filtersSnapshotTypes> = ({ links, title, filterClass, horizontal = false }) => {
  return (
    <div className={`filtersSnapshot ${horizontal ? "horizontal" : "vertical"}`}>
      <h1 className="filtersSnapshot__title">{title}</h1>
      <ul className="filtersSnapshot__list">
        {links.map((link, index) => (
          <Link
            key={index}
            className="filtersSnapshot__list__item"
            to={`offers?rd=${dateToLocalString(tomorrow)}&rtd=${dateToLocalString(dayAfterTomorrow)}&${
              filterClass === "location"
                ? "pul=" + replacePolishLterals(link) + "&rl=" + replacePolishLterals(link)
                : filterClass + "=" + replacePolishLterals(link.toLowerCase())
            }`}
          >
            {link}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default FiltersSnapshot;
