import "./select-locations.styles.sass";
import { useAppSelector } from "../../store/hooks";
import { ChangeEventHandler, FC, HTMLAttributes } from "react";
import { selectLocations } from "../../store/locations/locations.selector";

type selectLocationsTypes = HTMLAttributes<HTMLSelectElement> & { changeHandler: ChangeEventHandler<HTMLSelectElement> };

const SelectLocations: FC<selectLocationsTypes> = ({ changeHandler, ...otherProps }) => {
  const locations = useAppSelector(selectLocations);

  return (
    <select {...otherProps} onChange={changeHandler} className="select-locations">
      {locations.map((location, index) => (
        <option key={index}>{location}</option>
      ))}
    </select>
  );
};

export default SelectLocations;
