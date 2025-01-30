import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-600">
      <ul className="flex mx-auto justify-between container">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
              ? "inline-flex py-4 px-2 text-black-600 bg-slate-500 rounded text-2xl cursor-pointer"
              : "inline-flex py-4 px-2 mr-2 text-black-600 hover:text-orange-400 text-2xl cursor-pointer"
            }>首頁
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
             ? "inline-flex py-4 px-2 text-black-600 bg-slate-500 rounded text-2xl cursor-pointer"
            : "inline-flex py-4 px-2 mr-2 text-black-600 hover:text-orange-400 text-2xl cursor-pointer"
            }>關於我
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/post"
            className={({ isActive }) =>
              isActive
             ? "inline-flex py-4 px-2 text-black-600 bg-slate-500 rounded text-2xl cursor-pointer"
            : "inline-flex py-4 px-2 mr-2 text-black-600 hover:text-orange-400 text-2xl cursor-pointer"
            }>文章
          </NavLink>
        </li>
        <li className="nav-item">
          
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
