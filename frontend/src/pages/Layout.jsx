import { Outlet } from "react-router-dom";
import { useRef, useState } from "react";
import NavbarItem from "../components/NavbarItem";

const Layout = () => {
  const loginref = useRef(null);
  const [selectedItem, setSelectedItem] = useState("/");

  function options() {
    //hvis man er logget inn, får man to ekstra navpoints i header.
    if (!loginref.current) {
      return (
        <nav className="navbar navbar-custom p-3">
          <div className="container justify-content-between">
          <NavbarItem
            name="/"
            text="GameReview!"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <NavbarItem
            name="/login"
            text="Sign in"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          </div>
        </nav>
      );
    }
    return (
      <>
        <nav>
          <NavbarItem
            name="/"
            text="GameReview!"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <NavbarItem
            name="/my-games"
            text="My Games"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <NavbarItem
            name="/profile"
            text="Profile"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <NavbarItem
            name="/"
            text="Sign out"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </nav>
      </>
    );
  }

  return (
    <>
      {options()}
      <Outlet />
    </>
  );
};

export default Layout;
