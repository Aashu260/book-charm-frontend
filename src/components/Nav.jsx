import { Link } from "react-router-dom";
import { book1 } from "../assets";
import { useState } from "react";
import { useSelector } from "react-redux";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about",
    },
    {
      title: "All books",
      link: "/all-books",
    },
  ];

  if (isLoggedIn) {
    links.push({
      title: "Cart",
      link: "/cart",
    });
  }

  return (
    <div>
      <nav className="bg-amber-100 w-full z-20 top-0 start-0 border-b-2 border-amber-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={book1} className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-bg-amber-950 ">
              Book Charm
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-6 rtl:space-x-reverse">
            <Link to="/login">
              <button
                type="button"
                className="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-amber-950 bg-amber-100 shadow shadow-amber-950 rounded-3xl text-center hover:text-white hover:bg-amber-950 hover:scale-110 transition-transform focus:ring-2 focus:ring-gray-200"
              >
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button
                type="button"
                className="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-amber-950 bg-amber-100 shadow shadow-amber-950 rounded-3xl text-center hover:text-white hover:bg-amber-950 hover:scale-110 transition-transform focus:ring-2 focus:ring-gray-200"
              >
                Sign Up
              </button>
            </Link>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-amber-950 hover:text-white hover:scale-110 transition-transform"
              aria-controls="navbar-sticky"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } w-full mt-4 md:mt-0 md:flex md:items-center md:w-auto`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse p-4 md:p-0 font-semibold bg-amber-100 md:bg-transparent rounded-lg md:rounded-none shadow-md md:shadow-none">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link}
                    onClick={closeMenu}
                    className="block py-2 px-3 text-bg-amber-950 rounded hover:bg-gray-100 hover:scale-110 transition-transform md:hover:bg-transparent md:p-0"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
