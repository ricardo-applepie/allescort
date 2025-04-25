'use client';
import React, { useEffect, useState } from "react";
import "./navbar.scss";
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from "react-redux";
import { setMenuState } from "@/redux/menu/menu";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { clearAuthState, setAuthState } from "@/redux/auth/auth";

interface NavbarProps {
  type?: string;
}

export default function Navbar(props: NavbarProps) {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: any) => state.menuState);
  const [signedIn, setSignedIn] = useState(false);
  const [value, setValue] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');  // State for selected region

  const handleChange = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);  // Update selected region
  };

  const router = useRouter();
  const toggleMenu = () => {
    dispatch(setMenuState(!isOpen));
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setSignedIn(false);
      dispatch(clearAuthState());
      router.push("/")
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
    let searchString = "/search";
    if (value) {
      searchString = searchString + `?searchTerm=${value}`;
    }
    console.log(searchString, "searchString");
    setValue('');
    router.push(searchString);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user && !user.uid) {
        setSignedIn(false);
      } else if(user) {
        setSignedIn(true);
        const userData: any = user;
        dispatch(setAuthState(userData));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="navbar">
      <div className="navbar__banner">
        Allescort.dk Danmarks største og bedste Massage Escort side
      </div>
      <div className="container">
        <div className="max-w-7xl pb-1 md:pb-4 mx-auto flex flex-col md:flex-row justify-between md:items-center text-white pt-4 md:pt-7 md:pt-10">
          <div className="flex justify-between gap-6 md:flex  center-mobile pb-2 md:pb-0">
            <Link className="pl-1 navbar__link font-semibold text-1xl md:text-4xl" href={"/"}>Allescort</Link>
          </div>
          <form className="navbar__search desktop mr-2" onSubmit={handleSubmit}>
            <div className="flex position-relative">
              <input className="navbar__input placeholder:text-[#fff]" placeholder="Search here" value={value} onChange={handleChange} />
              <button className="navbar__search-icon" type="submit">
                <SearchIcon />
              </button>
            </div>
          </form>
          <div className="flex justify-between">
            {/* Dropdown for regions */}
            <select
              className="region-dropdown mr-2"
              value={selectedRegion}
              onChange={handleRegionChange}
            >
              <option value="">Select Region</option>
              <option value="København">København</option>
              <option value="Sjælland">Sjælland</option>
              <option value="Sydsjælland">Sydsjælland</option>
              <option value="Nordsjælland">Nordsjælland</option>
              <option value="Fyn">Fyn</option>
              <option value="Aarhus">Aarhus</option>
              <option value="Aalborg">Aalborg</option>
              <option value="Jylland">Jylland</option>
              <option value="Esbjerg">Esbjerg</option>
              <option value="Randers">Randers</option>
              <option value="Kolding">Kolding</option>
              <option value="Horsens">Horsens</option>
              <option value="Vejle">Vejle</option>
              <option value="Roskilde">"Roskilde"</option>
              <option value="Herning">, Herning</option>
              <option value="Norge-Oslo">Norge-Oslo</option>
              <option value="Sverige"> Sverige</option>
              <option value="Flensburg">Flensburg</option>
              <option value="Slagelse">Slagelse</option>
            </select>
            <Link className="mr-2 btn--outline btn--default hidden" href={"/newAd"}>Post ad</Link>
            {!signedIn && (
              <Link className="mr-2 btn--outline btn--default" href={"/login"}>Login</Link>
            )}
            {signedIn && (
              <>
                <Link className="mr-2 btn--outline btn--default" href={"/dashboard"}>
                  <span ><PersonIcon /></span>
                  {/* <span className="hidden">Profile</span> */}
                </Link>
                <span className="mr-2 btn--bg btn--default" onClick={logout}>
                  <span>Logout</span>
                </span>
              </>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <MenuIcon />
            </span>

          </div>
          <form className="navbar__search mobile md:mr-2 mobile" onSubmit={handleSubmit}>
            <div className="flex position-relative">
              <input className="navbar__input placeholder:text-[#fff]" placeholder="Search here" value={value} onChange={handleChange} />
              <button className="navbar__search-icon" type="submit">
                <SearchIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
