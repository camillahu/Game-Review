import { useState, useMemo } from "react";
import Select from 'react-select' //npm install react-select
import countryList from "react-select-country-list"; //npm install react-select-country-list --save (https://www.npmjs.com/package/react-select-country-list)

function EditCountry() {
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
  
    const changeHandler = value => {
      setValue(value)
    }

  return (
    <div className="d-flex flex-column mt-3" style={{ width: "20rem" }}>
    <span className="lead mb-1" style={{ color: "HSL(30, 20%, 85%)" }}>Country:</span>
      <Select options={options} value={value} onChange={changeHandler} style={{ margin: 0 }} />
    </div>
  );
}

export default EditCountry;
