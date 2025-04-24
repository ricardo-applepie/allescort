
'use client';

import "./navbar.scss";
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from "react-redux";
import { setMenuState } from "@/redux/menu/menu";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setAuthState } from "@/redux/auth/auth";

interface NavbarProps {
  type?: string;
}

export default function Navbar(props: NavbarProps) {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: any) => state.menuState);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter()
  const toggleMenu = () => {
    dispatch(setMenuState(!isOpen));
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setSignedIn(false);
      router.push("/")
      console.log("👋 User signed out successfully");
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user && !user.uid, "this is loged in")
      
      if(user && !user.uid) {
        setSignedIn(false)
      } else if(user) {
        console.log(user, "laksdaksnd")
        setSignedIn(true)
        const userData: any = user;
        dispatch(setAuthState(userData))
      }
    });
    return () => unsubscribe(); // Cleanup when component unmounts
  }, []);


  return (
    <div className="navbar">
      <div className="navbar__banner">
          Allescort.dk Danmarks største og bedste Massage Escort side
      </div>
      <div className="container">
        <div className="max-w-7xl pb-4 mx-auto flex justify-between items-center text-white pt-7  md:pt-10">
          <div className="flex justify-between gap-6 md:flex">
            <Link className="pl-1 navbar__link  font-semibold text-1xl md:text-4xl" href={"/"}> Allescort</Link>
          </div>
          <form className="navbar__search hidden md:block">
              <div className="flex position-relative">
                <input className="navbar__input placeholder:text-[#fff]" placeholder="Search here"/>
                <div className="navbar__search-icon">
                  <SearchIcon />
                </div>
              </div>
          </form>
          <div className="block">
            <Link className="mr-3 btn--outline btn--default hidden" href={"/newAd"}>Post ad </Link>
            {!signedIn && (
              <Link className="mr-3 btn--outline btn--default" href={"/login"}>Login </Link>
            )}
            {signedIn && (
              <>
              
                <Link 
                  className="mr-3 btn--outline btn--default"
                  href={"/dashboard"}
                >
                  Dashboard 
                </Link>
                <span 
                  className="mr-3 btn--bg btn--default"
                  onClick={logout}
                >
                  Logout 
                </span>
              </>
            )}
   
          </div>
          <div  className="block md:hidden">
            <span onClick={toggleMenu}>
              <MenuIcon />
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
