import { useState, useEffect } from "react";

function EditBirthday({ setBirthday, originalBirthday }) {
  const [localDay, setLocalDay] = useState(originalBirthday?.day || "");
  const [localMonth, setLocalMonth] = useState(originalBirthday?.month || "");
  const [localYear, setLocalYear] = useState(originalBirthday?.year || "");

  useEffect(() => {
    setLocalDay(originalBirthday?.day || "");
    setLocalMonth(originalBirthday?.month || "");
    setLocalYear(originalBirthday?.year || "");
  }, [originalBirthday]);

  useEffect(() => {
    setBirthday({ day: localDay, month: localMonth, year: localYear });
  }, [localDay, localMonth, localYear]);

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
          value={localDay}
          onChange={(e) => setLocalDay(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div className="d-flex justify-content-between mb-1">
        <span>Month: </span>

        <input
          type="text"
          name="month"
          placeholder="MM"
          value={localMonth}
          onChange={(e) => setLocalMonth(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div className="d-flex justify-content-between">
        <span>Year: </span>

        <input
          type="text"
          name="year"
          placeholder="YYYY"
          value={localYear}
          onChange={(e) => setLocalYear(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>
    </div>
  );
}

export default EditBirthday;
