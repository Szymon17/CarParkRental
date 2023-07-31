import "./select-locations.styles.sass";
import { useAppSelector } from "../../store/hooks";
import { ChangeEventHandler, FC, HTMLAttributes } from "react";
import { selectLocations } from "../../store/locations/locations.selector";

type selectLocationsTypes = HTMLAttributes<HTMLSelectElement> & { changeHandler: ChangeEventHandler<HTMLSelectElement> };

const triallLocations = ["Wrocław", "Warszawa", "Kraków", "Łódź", "Wrocław", "Kraków", "Łódź"];

const SelectLocations: FC<selectLocationsTypes> = ({ changeHandler, ...otherProps }) => {
  const locations = useAppSelector(selectLocations);

  return (
    <select {...otherProps} onChange={changeHandler} className="select-locations">
      {triallLocations.map((location, index) => (
        <option key={index}>{location}</option>
      ))}
    </select>
  );
};

export default SelectLocations;
