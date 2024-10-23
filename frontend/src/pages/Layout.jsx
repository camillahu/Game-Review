import { Outlet } from "react-router-dom";
import { useRef, useState } from "react";
import NavbarItem from "../components/NavbarItem";

const Layout = ({ loginref }) => {
  const [selectedItem, setSelectedItem] = useState("/");

  function options() {
    //hvis man er logget inn, får man to ekstra navpoints i header.
    if (!loginref.current) {
      return (
        <nav className="navbar navbar-custom p-3">
          <div className="container justify-content-between">
            <NavbarItem
              toPath="/"
              text="GameReview!"
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />

            <NavbarItem
              toPath="/login"
              text="Sign in"
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </div>
        </nav>
      )
    } else {
      return (
        <nav className="navbar navbar-custom p-3">
          <div className="container justify-content-between">
          <NavbarItem
            toPath="/"
            text="GameReview!"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <NavbarItem
            toPath="/my-games"
            text="My Games"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <NavbarItem
            toPath="/profile"
            text="Profile"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <NavbarItem
            toPath="/"
            text="Sign out"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          </div>
        </nav>
      );
    }
  }

  return (
    <>
      {options()}
      <Outlet />
    </>
  );
};

export default Layout;
