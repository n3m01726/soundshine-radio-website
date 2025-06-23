import React from "react";
import { Link } from "react-router-dom";

function Header({ onMenuClick }) {
  return (
    <header className="bg-header shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-bold text-title"
          >
            <img src="/logo192.png" alt="Logo" className="h-10 w-10" />
            <span>Soundshine Radio</span>
          </Link>

          {/* Navigation principale */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link
                to="/"
                className="text-lg font-semibold text-link hover:text-linkHover transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/charts"
                className="text-lg font-semibold text-link hover:text-linkHover transition-colors"
              >
                Charts
              </Link>
            </li>
            <li>
              <Link
                to="/schedule"
                className="text-lg font-semibold text-link hover:text-linkHover transition-colors"
              >
                Schedule
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="text-lg font-semibold text-link hover:text-linkHover transition-colors"
              >
                Shop
              </a>
            </li>
          </ul>

          {/* Bouton d'action */}
          <div>
            <button className="btn btn-primary" type="button">
              Open Radio
            </button>
          </div>

          {/* Menu Burger pour mobile */}
          <div className="md:hidden">
            <button
              className="text-title focus:outline-none"
              onClick={onMenuClick}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
