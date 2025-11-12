
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoLogoReact, IoStorefront, IoHomeSharp, IoPerson } from 'react-icons/io5';
import { RiMenu4Line } from 'react-icons/ri';




export default function Header() {
  const [open, setOpen] = useState(false);
  const path = useLocation();
  const title = path.pathname.replace('/', '').charAt(0).toUpperCase() + path.pathname.slice(2);
  const size = 32;
  const icons = {
    '': <IoHomeSharp size={size} />,
    Cadastros: <IoPerson size={size} />,
    Produtos: <IoStorefront size={size}/>,
  };
 useEffect(() => {
  setTimeout(setOpen(false), 1000);
   
 }, [title]);

  return (
    <div className='w-full shadow-lg opacity-95'>
      <header className="bg-slate-700 text-light">
        <div className="flex flex-col sm:flex-row">
          <div className="m-3 text-center hidden sm:block">
            <Link to="/" className="text-white">
              <IoLogoReact size={size} />
            </Link>
          </div>
          <div className=" flex mx-auto mt-3">
            <span className="mr-2">{icons[title]}</span>
            <h2>{title ? title : 'Home'}</h2>
          </div>
          <div className="text-center m-3" onClick={() => setOpen(!open)}>
            <RiMenu4Line className="mx-auto" size={size} />
          </div>
        </div>
      </header>

      <div
        className={`w-full overflow-hidden transition-all duration-300 ease-in-out sm:top-16
          ${open ? 'opacity-100 flex' : 'max-h-0 opacity-0 flex'}
        `}
      >
        <div className="flex flex-col w-full bg-slate-700  justify-around p-4 sm:flex-row ">
          <div className="px-4 py-2  text-center">
            <Link to="/" className="text-white no-underline">
              Home
            </Link>
          </div>
          <div className="px-4 py-2 text-center">
            <Link to="/Produtos" className="text-white no-underline">
              Produtos
            </Link>
          </div>
          <div className="px-4 py-2  text-center">
            <Link to="/cadastros" className="text-white no-underline">
              Cadastros
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

