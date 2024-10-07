import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; 
import Auth from '../utils/auth'; // Import the Auth instance for authentication handling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [sticky, setSticky] = useState(false); // State for sticky navbar
  const [activeSection, setActiveSection] = useState(''); // Active section state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0); // Make navbar sticky on scroll
      const sections = document.querySelectorAll('section');
      let scrollY = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId); // Update active section based on scroll
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-10 transition-all duration-300 ${
        sticky ? 'bg-[rgb(31,41,55,0.9)] text-white' : 'bg-transparent text-white'
      }`}
    >
      <div className="flex justify-between items-center mx-4 py-4">
        <Link to="/" className="flex items-center">
          <img
            src="/images/hotel-logo.png"  
            alt="Hotel Logo"
            className="h-16 w-16 mr-4"  
          />
          <span className="text-3xl font-serif text-[rgb(156,163,175)] transition duration-300 hover:text-white hover:animate-pulse">
            Pet Haven Hotel
          </span>
        </Link>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <FaBars />
          </button>
        </div>

        <ul className={`hidden md:flex space-x-8`}>
          <li>
            <Link
              to="/"
              className={`text-lg hover:bg-gray-700 p-4 rounded ${
                activeSection === '' ? 'text-cyan-600' : ''
              }`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`text-lg hover:bg-gray-700 p-4 rounded ${
                activeSection === 'services' ? 'text-cyan-600' : ''
              }`}
              onClick={handleLinkClick}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/booking"
              className={`text-lg hover:bg-gray-700 p-4 rounded ${
                activeSection === 'booking' ? 'text-cyan-600' : ''
              }`}
              onClick={handleLinkClick}
            >
              Booking
            </Link>
          </li>
          <li>
            <Link to="/products"
              className={`text-lg hover:bg-gray-700 p-4 rounded ${
                activeSection === 'products' ? 'text-cyan-600' : ''
              }`}
              onClick={handleLinkClick}
            >
              Products
            </Link> {/* New Products Link */}
          </li>
          
          {/* Authenticated User Links */}
          {Auth.loggedIn() ? (  // Use Auth.loggedIn() for authentication check
            <>
              <li>
                <Link
                  to="/me"
                  className={`text-lg hover:bg-gray-700 p-4 rounded ${
                    activeSection === 'me' ? 'text-cyan-600' : ''
                  }`}
                  onClick={handleLinkClick}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => { handleLinkClick(); Auth.logout(); }} // Use Auth.logout() for logout
                  className="text-lg hover:bg-gray-700 p-4 rounded"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/register"
                className={`text-lg hover:bg-gray-700 p-4 rounded ${
                  activeSection === 'register' ? 'text-cyan-600' : ''
                }`}
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </li>
          )}
        </ul>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white bg-opacity-70 rounded-lg p-4 mt-2 absolute right-0 mx-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/booking" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>
                Booking
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>
                Products
              </Link> {/* Mobile Products Link */}
            </li>
            
            {/* Authenticated User Links */}
            {Auth.loggedIn() ? (  // Use Auth.loggedIn() for authentication check
              <>
                <li>
                  <Link to="/me" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => { handleLinkClick(); Auth.logout(); }} className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/registration" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;