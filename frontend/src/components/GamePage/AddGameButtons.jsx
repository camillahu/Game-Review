import { useEffect, useState } from "react";

function StatusButtons({ statuses }) {
  const [localStatuses, setLocalStatuses] = useState([]);

  useEffect(() => {
    if (statuses) {
      setLocalStatuses(statuses);
    }
  }, [statuses]);

  // denne legger farger og navn til knappene som vi returnerer med en map.
  const statusOptions = [
    { name: "Owned", color: "HSL(120, 50%, 70%)", opposite: "Wishlist"},
    { name: "Wishlist", color: "HSL(30, 70%, 70%)", opposite: "Owned" },
    { name: "Played", color: "HSL(200, 60%, 65%)",  opposite: "Currently Playing"   },
    { name: "Currently Playing", color: "HSL(280, 50%, 70%)",  opposite: "Played"  },
  ];

  //tar inn statusnavnet man trykker på og bruker find for å matche med statusOptions-arrayet, for å sette inn i selectedStatus.
  //setter oppositeStatus til opposite-propertien til den valgte statusen. 
  //Sjekker om statusName finnes i localstatuses eller ikke(setter isSelected til true/false).
  //vi lager en ny array-updated hvor vi fjerner statusName og det motsatte funnet i oppositeStatus med filter.
  //til slutt, hvis isSelected er true, returnerer den updated som den er, hvis ikke returneres updated og lagt til statusName.
  const toggleStatus = (statusName) => {
    const selectedStatus = statusOptions.find((status) => status.name === statusName);
    const oppositeStatus = selectedStatus?.opposite;

    setLocalStatuses((prevStatuses) => {
      const isSelected = prevStatuses.includes(statusName);
      const updated = prevStatuses.filter(
        (s) => s !== statusName && s !== oppositeStatus
      );
      return isSelected ? updated : [...updated, statusName];
    });
  };

  return (
    <div className="d-flex justify-content-between">
      {statusOptions.map((status) => (
        <span
          key={status.name}
          role="button"
          className="me-3"
          style={{
            color: localStatuses.includes(status.name)
              ? status.color
              : "HSL(0, 0%, 80%)",
          }}
          onClick={() => toggleStatus(status.name)}
        >
          {status.name}
          {/* && brukes her for å vise ikonet hvis statuses arrayen har navnet i seg. */}
          {localStatuses.includes(status.name) && (
            <i
              className="bi bi-check-circle-fill ms-1"
              style={{ fontSize: "0.8em" }}
            ></i>
          )}
        </span>
      ))}
    </div>
  );
}

export default StatusButtons;
