import { useState, useEffect } from "react";

function EditBirthday({
  birthday,
  setBirthday,
  originalBirthday
}) {
  const [day, setDay] = useState(originalBirthday?.day || "");
  const [month, setMonth] = useState(originalBirthday?.month || "");
  const [year, setYear] = useState(originalBirthday?.year || "");

  useEffect(() => {
    setDay(originalBirthday?.day || "");
    setMonth(originalBirthday?.month || "");
    setYear(originalBirthday?.year || "");
  }, [originalBirthday]);

  useEffect(() => {
    setBirthday({ day, month, year });
  }, [day, month, year, setBirthday]);

  return (
    <div
      className="d-flex flex-column mt-3"
      style={{ width: "20rem", color: "HSL(30, 20%, 85%)" }}
    >
      <span className="lead mb-1">Birthday:</span>
      <div className="d-flex justify-content-between mb-1">
        <span>Day: </span>

        <input
          type="text"
          name="day"
          placeholder="DD"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div className="d-flex justify-content-between mb-1">
        <span>Month: </span>

        <input
          type="text"
          name="month"
          placeholder="MM"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div className="d-flex justify-content-between">
        <span>Year: </span>

        <input
          type="text"
          name="year"
          placeholder="YYYY"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>
    </div>
  );
}

export default EditBirthday;
