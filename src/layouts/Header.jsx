
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IoLogoReact } from 'react-icons/io5';
import { RiMenu4Line } from 'react-icons/ri';



export default function Header({ titulo }) {
  const [open, setOpen] = useState(false);
  const path = useLocation()

  return (
    <div>
      <header className="bg-slate-700 text-light">
        <div className="flex flex-col sm:flex-row">
          <div className="m-3 text-center hidden sm:block">
            <Link to="/" className="text-white">
              <IoLogoReact size={32} />
            </Link>
          </div>
          <div className="flex-grow text-center m-2">
            <h2>{path.pathname.replace('/', '').charAt(0).toUpperCase()+ path.pathname.slice(2)}</h2>
          </div>
          <div className="text-center m-3" onClick={() => setOpen(!open)}>
            <RiMenu4Line className="mx-auto" size={32} />
          </div>
        </div>
      </header>

      <div
        className={`w-full overflow-hidden transition-all duration-300 ease-in-out sm:top-16
          ${open ? 'max-h-20 opacity-100 flex' : 'max-h-0 opacity-0 flex'}
        `}
      >
        <div className="flex flex-row w-full bg-slate-700 justify-around p-4">
          <div className="px-4 py-2 hover:first-letter:text-danger">
            <Link to="/">Home</Link>
          </div>
          <div className="px-4 py-2 hover:bg-slate-600 rounded">
            <Link to="/sales">Vendas</Link>
          </div>
          <div className="px-4 py-2 hover:bg-slate-600 rounded">
            <Link to="/reports">Relatórios</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

