import data from "../sigaa-scrap/data.json";
import { getClassesList } from "../utils/getClassesList";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import "./ClassesSelector.css";

const animatedComponents = makeAnimated();

export function ClassesSelector({onChange}) {
  const options = getClassesList(data);

  return (
    <Select
      styles={{
        control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: 6,
            borderColor: "#957ce0",
            boxShadow: "none"
          }),
        option: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "white",
          color: "black",
          ":hover": {
            backgroundColor: "#957ce0",
          },
        }),
      }}
      options={options}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      classNamePrefix="select"
      className="selector"
      onChange={onChange}
    />
  );
}
