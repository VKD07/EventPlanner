import { useState } from "react";
import ConsoleDebug from "../ConsoleDebug";

function Header() {
  const [currentClicked, setCurrentClicked] = useState("Home");

  const baseClassName = "px-4 py-2 rounded";
  const activeClassName = "bg-amber-500 text-white";

  function handleClick(buttonName) {
    setCurrentClicked(buttonName);
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <ConsoleDebug componentName="Header" />

      <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <img src="/vite.svg" alt="ICOC Logo" className="pl-4" />
        <ul className="flex space-x-2 ml-auto">
          <li>
            <button
              className={`hidden lg:block ${baseClassName} ${
                currentClicked === "Home" ? activeClassName : ""
              }`}
              onClick={() => handleClick("Home")}
            >
              HOME
            </button>
          </li>
          <li>
            <button
              className={`hidden lg:block ${baseClassName} ${
                currentClicked === "About" ? activeClassName : ""
              }`}
              onClick={() => handleClick("About")}
            >
              ABOUT
            </button>
          </li>
          <li>
            <button
              className={`lg:hidden ${baseClassName} ${
                currentClicked === "Menu" ? activeClassName : ""
              }`}
              onClick={() => handleClick("Menu")}
            >
              MENU
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
