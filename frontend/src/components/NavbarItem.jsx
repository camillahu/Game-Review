import React from "react";
import { Link } from "react-router-dom";

export default function NavbarItem({
  toPath,
  text,
  setSelectedItem,
  selectedItem,
}) {
  const select = () => {
    setSelectedItem(toPath);
  };
  if (toPath === selectedItem) {
    return <span className="lead pe-none fw-bold link-dark">{text}</span>;
  }
  return (
    <span>
      <Link
        onClick={select}
        className="lead text-decoration-none link-dark"
        to={toPath}
      >
        {text}
      </Link>
    </span>
  );
}
