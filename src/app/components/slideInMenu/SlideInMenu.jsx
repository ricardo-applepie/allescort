"use client";

import React, { useEffect } from 'react';
import './slide-in-menu.scss'; // Import the SCSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { setMenuState } from '@/redux/menu/menu';

const SlideInMenu = () => {
  const { isOpen } = useSelector((state) => state.menuState);
  console.log(isOpen, "isOpen")
  const dispatch = useDispatch();

  useEffect(() => {
    // Initial menu state is false (closed) on page load
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpen]);

  const toggleMenu = () => {
    dispatch(setMenuState(!isOpen));
  };

  const closeMenuOnOverlayClick = () => {
    if (isOpen) {
      dispatch(setMenuState(false)); // Close menu when clicking on overlay
    }
  };

  return (
    <div className="menu-slide">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenuOnOverlayClick} // Close menu on overlay click
      />

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl transform transition-transform ${
          isOpen ? 'slide-in' : 'slide-out'
        }`}
        style={{ width: '450px' }}
      >
        <div className="p-4 flex justify-between items-center">
          <a href="https://www.escort-side.dk/">
            <img
              src="https://images.escort-side.dk/Static/logo.webp"
              alt="Logo"
              className="h-10"
            />
          </a>
          <button onClick={toggleMenu} className="text-xl text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="px-4 py-2">
          <nav>
            <ul>
              {/* Menu items */}
              <li className="mb-4">
                <a href="https://www.escort-side.dk/upgradeProfile" className="flex items-center space-x-2">
                  <img
                    src="https://images.escort-side.dk/Static/upgrade.png"
                    alt="Upgrade"
                    className="h-6"
                  />
                  <span>Activate profile (Diamond, Gold, Silver)</span>
                </a>
              </li>
              {/* Add more menu items here */}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SlideInMenu;
