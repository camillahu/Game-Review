import { Outlet } from "react-router-dom";
import { useRef, useState } from "react";
import NavbarItem from "./components.NavbarItem";

const Layout = () => {
  const loginref = useRef(null);
  const [selectedItem, setSelectedItem] = useState("/");

  function options() {
    //hvis man er logget inn, får man to ekstra navpoints i header.
    if (!loginref.current) {
      return (
        <nav>
          <ul>
            <li>
            <NavbarItem
                name="/"
                text="GameReview!"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </li>
            <li>
            <NavbarItem
                name="/login"
                text="Sign in"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </li>
          </ul>
        </nav>
      );
    }
    return (
      <>
        <nav>
          <ul>
            <li>
            <NavbarItem
                name="/"
                text="GameReview!"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </li>
            <li>
            <NavbarItem
                name="/my-games"
                text="My Games"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </li>
            <li>
            <NavbarItem
                name="/profile"
                text="Profile"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </li>
            <li>

            <NavbarItem
                name="/"
                text="Sign out"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </li>
          </ul>
        </nav>
      </>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
