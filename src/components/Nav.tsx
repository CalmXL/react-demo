import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="bg-gray-800 p-4 mx-4">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive ? 'text-white font-bold mx-2' : 'text-gray-300 mx-2'
        }>
        监控
      </NavLink>
      <NavLink
        to="/details"
        className={({ isActive }) =>
          isActive ? 'text-white font-bold mx-2' : 'text-gray-300 mx-2'
        }>
        详情
      </NavLink>
    </nav>
  );
}
