import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function AdminSidebar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path);

  return (
    <header className="w-full bg-gradient-to-r from-sky-600 to-sky-400 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            onClick={() => navigate("/admin")}
            className="flex items-center cursor-pointer"
          >
            <img
              src="/img/logobingo.webp"
              alt="Logo"
              className="h-13 w-13 rounded-full"
            />
            <span className="ml-2 font-semibold text-white text-lg">
              Bingo el llano
            </span>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-6">
            <NavItem
              label="Compras"
              path="/admin"
              navigate={navigate}
              active={location.pathname === "/admin"}
            />
            <NavItem
              label="Cartones"
              path="/admin/CartonesAdmin"
              navigate={navigate}
              active={isActive("/admin/CartonesAdmin")}
            />
            <NavItem
              label="Compradores"
              path="/admin/Compradores"
              navigate={navigate}
              active={isActive("/admin/Compradores")}
            />
          </nav>

          {/* Mobile button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-sky-600 to-sky-400 px-4 py-3 space-y-2">
          <MobileNavItem label="Compras" onClick={() => navigate("/admin")} />
          <MobileNavItem label="Cartones" onClick={() => navigate("/admin/CartonesAdmin")} />
          <MobileNavItem label="Compradores" onClick={() => navigate("/admin/Compradores")} />
        </div>
      )}
    </header>
  );
}

/* ---------- COMPONENTES ---------- */

function NavItem({ label, path, navigate, active }) {
  return (
    <button
      onClick={() => navigate(path)}
      className={`px-3 py-2 rounded-md font-medium transition-colors
        ${active
          ? "text-white bg-sky-700"
          : "text-white hover:text-sky-200"}
      `}
    >
      {label}
    </button>
  );
}

function MobileNavItem({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left py-2 text-white hover:text-sky-200 border-b border-sky-500"
    >
      {label}
    </button>
  );
}