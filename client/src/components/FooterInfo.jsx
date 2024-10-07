import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

// Styled component for the info containers
const Container = ({ title, children }) => (
  <div className="flex flex-col items-start bg-white border-2 border-gray-800 rounded-lg p-6 w-full md:w-1/3 hover:bg-gray-100 transition-colors duration-300">
    <h2 className="text-2xl md:text-3xl font-bold mb-5">{title}</h2>
    {children}
  </div>
);

const FooterInfo = () => {
          return (
                <div className="flex flex-col md:flex-row justify-between mt-10 mb-20 px-4 md:px-16 gap-10">
              {/* Container 1: Reservations Office */}
              <Container title="Reservations">
                <div className="flex items-center mb-2 text-gray-800">
                  <FaMapMarkerAlt className="mr-2 text-2xl" />
                  <p className="text-xs md:text-sm">123 Anywhere St.</p> {/* Adjusted text size */}
                </div>
                <p className="ml-8 mb-2 text-xs md:text-sm">Salt Lake City, UT 84101</p> {/* Adjusted text size */}
                <div className="flex items-center mb-2 text-gray-800">
                  <FaPhone className="mr-2 text-2xl" />
                  <p className="text-xs md:text-sm">801-111-2222</p> {/* Adjusted text size */}
                </div>
                <div className="flex items-center text-gray-800">
                  <FaEnvelope className="mr-2 text-2xl" />
                  <p className="text-xs md:text-sm">pethavenhotel@mail.com</p> {/* Adjusted text size */}
                </div>
              </Container>

              {/* Container 2: Office Hours */}
              <Container title="Office Hours">
                <p className="text-xs md:text-sm">Monday to Friday: 9:00 AM to 6:00 PM</p> {/* Adjusted text size */}
                <p className="text-xs md:text-sm">Saturday: 9:00 AM to 12:00 Noon</p> {/* Adjusted text size */}
              </Container>

              {/* Container 3: Get Social */}
              <Container title="Socials">
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 rounded-full p-2 transition-colors duration-300 hover:bg-gray-600"
                  >
                    <FaInstagram className="text-3xl md:text-4xl text-white" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 rounded-full p-2 transition-colors duration-300 hover:bg-gray-600"
                  >
                    <FaFacebook className="text-3xl md:text-4xl text-white" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 rounded-full p-2 transition-colors duration-300 hover:bg-gray-600"
                  >
                    <FaTwitter className="text-3xl md:text-4xl text-white" />
                  </a>
                </div>
              </Container>
            </div>
              );
            };

export default FooterInfo;