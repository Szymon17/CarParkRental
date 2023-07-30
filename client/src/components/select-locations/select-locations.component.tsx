import "./select-locations.styles.sass";
import { ChangeEventHandler, FC } from "react";

type selectLocationsTypes = {
  locations: string[];
  changeHandler: ChangeEventHandler<HTMLSelectElement>;
};

const SelectLocations: FC<selectLocationsTypes> = ({ locations, changeHandler }) => {
  return (
    <select onChange={changeHandler} className="select-locations">
      {locations.map((location, index) => (
        <option key={index}>{location}</option>
      ))}
    </select>
  );
};

export default SelectLocations;
