import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar({logueado}) {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const linkBase = "text-[#fcfcfc] hover:text-[#f6bd0b] hover:bg-[#f6bd0b]/10 text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors";
  const linkActive = "text-[#f6bd0b] bg-[#f6bd0b]/10 text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors";

  const mobileLinkBase = "py-3 text-[#fcfcfc] hover:text-[#f6bd0b] border-b border-[#f6bd0b]/10 font-semibold transition-colors";
  const mobileLinkActive = "py-3 text-[#f6bd0b] border-b border-[#f6bd0b]/10 font-semibold transition-colors";

  return (

    <header className="w-full bg-[#1a1b1f] shadow-md fixed top-0 left-0 z-50 border-b border-[#f6bd0b]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="cursor-pointer" onClick={() => navigate(logueado ? '/admin' : '/')}>
            <img src="/img/Logo_bingo_llano.png" alt="Bingo El Llano" className="h-7 w-auto" />
          </div>

          {/* Menú desktop */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Links públicos */}
            <a className={isActive('/cartonesListado') ? linkActive : linkBase}
              onClick={() => navigate('/cartonesListado')}>Cartones</a>
            <a className={isActive('/ganadoresListado') ? linkActive : linkBase}
              onClick={() => navigate('/ganadoresListado')}>Ganadores</a>
            <a className={linkBase}>Soporte</a>
            <a className={isActive('/comprasListado') ? linkActive : linkBase}
              onClick={() => navigate('/comprasListado')}>Compras</a>

            {/* Links admin — solo si está logueado */}
            {logueado && (
              <>
                <div className="w-px h-5 bg-[#f6bd0b]/20 mx-2" />
                <a className={location.pathname === '/admin' ? linkActive : linkBase}
                  onClick={() => navigate('/admin')}>Compras Admin</a>
                <a className={isActive('/admin/CartonesAdmin') ? linkActive : linkBase}
                  onClick={() => navigate('/admin/CartonesAdmin')}>Cartones Admin</a>
                <a className={isActive('/admin/Compradores') ? linkActive : linkBase}
                  onClick={() => navigate('/admin/Compradores')}>Compradores Admin</a>
              </>
            )}

          </nav>

          {/* Hamburguesa */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#f6bd0b] p-1.5 rounded-md">
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1b1f] border-t border-[#f6bd0b]/15 px-5 pt-2 pb-4 flex flex-col gap-0.5">

          {/* Links públicos */}
          <a className={isActive('/cartonesListado') ? mobileLinkActive : mobileLinkBase}
            onClick={() => { navigate('/cartonesListado'); setIsOpen(false); }}>Cartones</a>
          <a className={isActive('/ganadoresListado') ? mobileLinkActive : mobileLinkBase}
            onClick={() => { navigate('/ganadoresListado'); setIsOpen(false); }}>Ganadores</a>
          <a className={mobileLinkBase}>Soporte</a>
          <a className={isActive('/comprasListado') ? mobileLinkActive : mobileLinkBase}
            onClick={() => { navigate('/comprasListado'); setIsOpen(false); }}>Compras</a>

          {/* Links admin — solo si está logueado */}
          {logueado && (
            <>
              <div className="w-full h-px bg-[#f6bd0b]/20 my-1" />
              <a className={location.pathname === '/admin' ? mobileLinkActive : mobileLinkBase}
                onClick={() => { navigate('/admin'); setIsOpen(false); }}>Compras Admin</a>
              <a className={isActive('/admin/CartonesAdmin') ? mobileLinkActive : mobileLinkBase}
                onClick={() => { navigate('/admin/CartonesAdmin'); setIsOpen(false); }}>Cartones Admin</a>
              <a className={isActive('/admin/Compradores') ? mobileLinkActive : `${mobileLinkBase} border-b-0`}
                onClick={() => { navigate('/admin/Compradores'); setIsOpen(false); }}>Compradores Admin</a>
            </>
          )}

        </div>
      )}
    </header>
  );
}