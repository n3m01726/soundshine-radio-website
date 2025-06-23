import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="bg-white">
        <nav className="navbar navbar-expand-lg mx-5">
          <div className="container-fluid">
            {/* Logo/Brand */}
            <Link to="/" className="navbar-brand">
              {/* Remplacer par le logo réel si besoin */}
              <img src="/logo192.png" alt="Logo" width="40" height="40" />{" "}
              Soundshine Radio
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item" style={{ marginLeft: 40 }}>
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/charts">
                    Charts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/schedule">
                    Schedule
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Shop
                  </a>
                </li>
              </ul>
              <ul>
                <button className="btn btn-danger" type="button">
                  Open the radio menu
                </button>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
