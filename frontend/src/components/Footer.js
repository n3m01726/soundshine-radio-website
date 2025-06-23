import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row pt-4">
          <div className="col-lg-4">
            <nav>
              <div className="title">Mobile Apps</div>
              <span>
                Download SimpleRadio app to listen to Soundshine Radio.
              </span>
              <div style={{ marginTop: 10 }}>
                <a
                  style={{ marginRight: 10 }}
                  href="https://itunes.apple.com/us/app/simple-radio-by-streema-tunein/id891132290?mt=8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/app_store.svg"
                    width="143"
                    height="45"
                    alt="App Store"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.streema.simpleradio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/google-play.png"
                    width="143"
                    height="45"
                    alt="Google Play"
                  />
                </a>
              </div>
              <div style={{ marginTop: 10 }}>
                <small>
                  Require iOS 9.0 ou better or Android 4.1 or better.
                </small>
              </div>
            </nav>
          </div>
          <div className="col-lg-3">
            <nav>
              <ul>
                <li className="title">Soundshine Radio</li>
                <li className="nav-item">
                  <Link to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <a
                    href="https://www.bonfire.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Merch
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/team">Team</Link>
                </li>
                <li className="nav-item">
                  <Link to="/benevolat">Volunteering</Link>
                </li>
                <li className="nav-item">
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <nav>
              <ul>
                <li className="title">Inspirations</li>
                <li className="nav-item">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Lien 1
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Lien 2
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Lien 3
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Lien 4
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Lien 5
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-2">
            <ul className="list-unstyled d-flex me-5 ms-5">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-discord"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-github"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="player">
        <div className="comingSoon">Player à venir...</div>
        <audio className="js-player" controls>
          <source src="/radio.mp3" />
        </audio>
      </div>
    </footer>
  );
}

export default Footer;
