import React from "react";
import { Link } from "react-router-dom";

export default function NavbarItem({
  name,
  text,
  setSelectedItem,
  selectedItem,
}) {
  const select = () => {
    setSelectedItem(name);
  };
  if (name === selectedItem) {
    return (
      <span className="lead pe-none fw-bold link-dark">
        {text}
      </span>
    );
  }
  return (
    <span>
      <Link
        onClick={select}
        className="lead text-decoration-none link-dark"
        to={name}

      >
        {text}
      </Link>
    </span>
  );
}
