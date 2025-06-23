import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaDiscord, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-footer pt-10 text-text">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Mobile Apps */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-footerTitle">Mobile Apps</h3>
            <p className="text-gray-600">
              Download SimpleRadio app to listen to Soundshine Radio.
            </p>
            <div className="flex gap-4">
              <a
                href="https://itunes.apple.com/us/app/simple-radio-by-streema-tunein/id891132290?mt=8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/app_store.svg"
                  width="143"
                  height="45"
                  alt="App Store"
                  className="h-11 w-auto"
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
                  className="h-11 w-auto"
                />
              </a>
            </div>
            <small className="block text-gray-500">
              Require iOS 9.0 or better or Android 4.1 or better.
            </small>
          </div>

          {/* Soundshine Radio Links */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-footerTitle">
              Soundshine Radio
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://www.bonfire.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  Merch
                </a>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/benevolat"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  Volunteering
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Inspirations Links */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-footerTitle">Inspirations</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  Lien 1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  Lien 2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  Lien 3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  Lien 4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  Lien 5
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold text-footerTitle mb-4">
              Follow Us
            </h3>
            <ul className="flex gap-6">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  <FaTwitter className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  <FaDiscord className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-linkHover transition-colors"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-black bg-opacity-10 p-4 text-center">
        <div className="comingSoon text-sm text-gray-600">
          Player à venir...
        </div>
        {/* <audio className="js-player w-full" controls>
          <source src="/radio.mp3" />
        </audio> */}
      </div>
    </footer>
  );
}

export default Footer;
