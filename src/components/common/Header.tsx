import { Link, NavLink } from 'react-router-dom'

export function Header() {

  return (
    <div className="flex w-full items-center justify-between border bg-slate-50 bg-opacity-70 p-4 md:px-12">
      <Link to={"/"} className="text-xs md:text-base">InQool Interview with Agnar</Link>
      <nav className='flex gap-4 items-center'>
        <NavLink to={"/users"}
          style={({ isActive }) => ({ textDecoration: isActive ? "underline" : "none" })}
        >
          Users
        </NavLink>
        <NavLink to={"/animals"}
          style={({ isActive }) => ({ textDecoration: isActive ? "underline" : "none" })}
        >
          Animals
        </NavLink>
      </nav>
    </div>
  )
}