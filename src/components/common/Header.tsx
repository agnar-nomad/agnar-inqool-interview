import { Link } from 'react-router-dom'

export function Header() {

  return (
    <div className="flex w-full items-center justify-between border bg-slate-50 bg-opacity-70 p-4 md:px-12">
      <Link to={"/"} className="text-xs md:text-base">InQool Interview with Agnar</Link>
      <nav>
        <ul className='flex gap-4 items-center'>
          <li><Link to={"/"}>People</Link></li>
          <li><Link to={"/about"}>Animals</Link></li>
        </ul>
      </nav>
    </div>
  )
}