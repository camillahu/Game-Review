import { useState, useMemo, useEffect } from "react";
import Select from "react-select"; //npm install react-select
import countryList from "react-select-country-list"; //npm install react-select-country-list --save (https://www.npmjs.com/package/react-select-country-list)

function EditCountry({ setCountry, originalCountry }) {
  const options = useMemo(() => countryList().getData(), []);
  const [localCountry, setLocalCountry] = useState(null);

  useEffect(() => { 
    if (originalCountry) {
      //denne find-en må være med siden jeg bruker react-select som trenger en label og value.
      const selectedCountry = options.find( 
        (option) => option.label === originalCountry
      );
      setLocalCountry(selectedCountry || null);
    }
  }, [originalCountry, options]);

  const changeHandler = (selectedCountry) => {
    setLocalCountry(selectedCountry);
    setCountry(selectedCountry?.label || null);
  };

  return (
    <div className="d-flex flex-column mt-3" style={{ width: "20rem" }}>
      <span className="lead mb-1" style={{ color: "HSL(30, 20%, 85%)" }}>
        Country:
      </span>
      <Select
        options={options}
        value={localCountry}
        onChange={changeHandler}
        isClearable
      />
    </div>
  );
}

export default EditCountry;
