import { useState } from "react";
import { NavLink } from "react-router-dom";
import ConsoleDebug from "../ConsoleDebug";
import { navItems } from "../navItems";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const desktopLinkClass = ({ isActive }) =>
    `hidden lg:block px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-colors ${
      isActive
        ? "bg-brass/15 text-brass-light border border-brass/40"
        : "text-parchment/70 hover:bg-pew-light hover:text-parchment"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium tracking-wide transition-colors ${
      isActive
        ? "bg-brass/15 text-brass-light border border-brass/40"
        : "text-parchment/70 hover:bg-pew-light hover:text-parchment"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-ink/90 backdrop-blur-md border-b border-brass/20">
      <ConsoleDebug componentName="Header" />

      <div className="flex justify-between items-center px-6 py-4 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-brass flex items-center justify-center">
            <span className="font-display text-brass text-sm">§</span>
          </div>
          <h1 className="font-display text-xl font-semibold text-parchment tracking-tight">
            Order of Service
          </h1>
        </div>

        <nav className="relative">
          <ul className="flex items-center space-x-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={desktopLinkClass}>
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                className="lg:hidden px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-colors text-parchment/70 hover:bg-pew-light hover:text-parchment"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? "Close" : "Menu"}
              </button>
            </li>
          </ul>

          {isMenuOpen && (
            <div className="lg:hidden absolute right-0 top-full mt-2 w-48 bg-pew border border-brass/20 rounded-lg shadow-2xl p-1.5 flex flex-col gap-0.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={mobileLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-display text-brass">{item.glyph}</span>
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
