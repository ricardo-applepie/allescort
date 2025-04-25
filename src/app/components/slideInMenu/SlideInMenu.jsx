"use client";

import React, { useEffect } from 'react';
import './slide-in-menu.scss'; // Import the SCSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { setMenuState } from '@/redux/menu/menu';
import { Home, AccountCircle, HelpOutline, Settings, ExitToApp } from '@mui/icons-material'; // Ensure correct import
import Link from 'next/link'; // Using 'Link' for navigation
import { signOut } from 'firebase/auth';
import { auth } from "@/lib/firebase";

const SlideInMenu = () => {
  const { isOpen } = useSelector((state) => state.menuState);
  const { auth } = useSelector((state) => state);
  console.log(auth, "authauth")
  const dispatch = useDispatch();
  const hasUser = auth?.user?.uid;

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

    const logout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("❌ Logout error:", error);
      }
    };

  return (
    <>
    {isOpen && (
        <div
          className={`overlay fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300`}
          onClick={closeMenuOnOverlayClick} // Close menu on overlay click
        />
      )}


      <div
        className={`menu-slide fixed top-0 left-0 h-full bg-white shadow-xl transform transition-transform ${isOpen ? 'open' : ''}`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">All Escort</h2>
          <button onClick={toggleMenu} className="text-3xl text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="px-4 py-2">
          <nav>
            <ul>
              <li className="mb-4 flex items-center space-x-2">
                <Home className="text-gray-600" />
                <span 
                  className="text-lg text-gray-800"
                  onClick={toggleMenu}
                >
                  Home
                </span>
              </li>
              
              <li className="mb-4 flex items-center space-x-2">
                <AccountCircle className="text-gray-600" />
                <Link href="/dashboard" className="text-lg text-gray-800">My Profile</Link>
              </li>
              
              <li className="mb-4 flex items-center space-x-2">
                <HelpOutline className="text-gray-600" />
                <Link href="/help" className="text-lg text-gray-800">Help & Support</Link>
              </li>
              
              <li className="mb-4 flex items-center space-x-2">
                <Settings className="text-gray-600" />
                <Link href="/settings" className="text-lg text-gray-800">Settings</Link>
              </li>
              
              <li className="mb-4 flex items-center space-x-2">
                <ExitToApp className="text-gray-600" />
                {!hasUser ?  (
                  <Link href="/login" className="text-lg text-gray-800">login</Link>
                ) :  (
                  <span onClick={logout} className="text-lg text-gray-800">Logout</span>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SlideInMenu;
