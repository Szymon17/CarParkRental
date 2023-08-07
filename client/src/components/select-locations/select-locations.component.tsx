import "./select-locations.styles.sass";
import { useAppSelector } from "../../store/hooks";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { selectLocations } from "../../store/locations/locations.selector";

type selectLocationsTypes = { defaultValue?: string; changeState: Function };

const SelectLocations: FC<selectLocationsTypes> = ({ defaultValue, changeState }) => {
  const locations = useAppSelector(selectLocations);
  const selectRef = useRef<HTMLDivElement>(null);

  const [selectedLocation, setSelectedLocation] = useState(defaultValue ? defaultValue : locations[0]);
  const [extend, setExtendState] = useState(false);

  useEffect(() => {
    const el = selectRef.current;

    if (el !== null) {
      switch (extend) {
        case true:
          el.classList.add("extend");
          break;
        case false:
          el.classList.remove("extend");
          break;
      }
    } else setExtendState(false);
  }, [extend, setExtendState]);

  const selectLocationHandler = (location: string) => {
    setSelectedLocation(location);
    changeState(location);
    setExtendState(false);
  };

  return (
    <div ref={selectRef} className="selectLocations">
      <div onClick={() => setExtendState(!extend)} className="selectLocations__selected">
        {selectedLocation}
      </div>
      <ul className="selectLocations__selectBox">
        {locations.map((location, key) => (
          <li key={key} onClick={() => selectLocationHandler(location)} className="selectLocations__option">
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectLocations;
