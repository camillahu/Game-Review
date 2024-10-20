import { useState } from "react";

function EditBirthday() {
  const [inputs, setInputs] = useState({});

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


  return (
    <div className="d-flex flex-column mt-3" style={{ width: "20rem", color: "HSL(30, 20%, 85%)"  }}>
      <span className="lead mb-1">Birthday:</span>
      <div className="d-flex justify-content-between mb-1">
        <span>Day: </span>

        <input
          type="text"
          name="day"
          placeholder="DD"
          value={inputs.day || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between mb-1">
        <span>Month: </span>

        <input
          type="text"
          name="month"
          placeholder="MM"
          value={inputs.day || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between">
        <span>Year: </span>

        <input
          type="text"
          name="year"
          placeholder="YYYY"
          value={inputs.day || ""}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default EditBirthday;
