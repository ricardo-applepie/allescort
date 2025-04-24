"use client";

import { onAuthStateChanged } from "firebase/auth";
import ProfileCategory from "../components/profileCategory/ProfileCategory";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";


export default function BoostProfile() {
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user, "this is loged in")
      if(user && !user.uid) {
        router.push("/")
      }
    });
    return () => unsubscribe(); // Cleanup when component unmounts
  }, []);

  return (
    <main className="container-xxl font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <section className="section">
       <ProfileCategory />
      </section>
    </main>
  );

}
