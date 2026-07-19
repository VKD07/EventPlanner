import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";

const EventNavigation = () => {
  return (
    <aside className="bg-ink border-r border-brass/15 text-parchment mt-[80px] w-[60px] h-[calc(100vh-80px)] fixed flex flex-col items-center gap-1 py-4">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          title={item.name}
          className={({ isActive }) =>
            `w-11 h-11 flex flex-col items-center justify-center gap-0.5 rounded-lg transition-colors ${
              isActive
                ? "bg-brass/15 text-brass-light border border-brass/40"
                : "text-parchment/50 hover:bg-pew-light hover:text-parchment"
            }`
          }
        >
          <span className="font-display text-base leading-none">{item.glyph}</span>
          <span className="text-[9px] uppercase tracking-wide leading-none">{item.name}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default EventNavigation;
