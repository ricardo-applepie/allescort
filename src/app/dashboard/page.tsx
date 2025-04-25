'use client';

import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getCountFromServer, getDoc, getDocs, limit, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function DashBoard() {
  const [user, setUser] = useState<any>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false); // Manage subscription state
  const state: any = useSelector((state) => state);
  const [hasBookedSpot, setHasBookedSpot] = useState<boolean>(false);

  const email = state?.auth?.user?.email;
  const joinedAt = state.auth?.user?.metadata.creationTime;
  const uid = state.auth?.user?.uid;

  // Update user coin count in the database
  const deductCoins = async () => {
    if (user?.coins > 0) {
      try {
        const newCoins = user.coins - 1;

        // Reference to the user document
        const userRef = doc(db, 'users', uid);

        // Update user's coins
        await updateDoc(userRef, { coins: newCoins });

        // Query the ads collection for a document with matching userId
        const adQuery = query(
          collection(db, 'ads'),
          where('uid', '==', uid),
          limit(1)
        );
        const querySnapshot = await getDocs(adQuery);

        if (!querySnapshot.empty) {
          const adDoc = querySnapshot.docs[0];
          const adsRef = adDoc.ref;

          // Update the ad's createdAt to move it to the top
          await updateDoc(adsRef, { boostedAt: Timestamp.now() });
        } else {
          console.warn('No ad found for this user.');
          toast.error('No ad found to boost.');
        }

        // Update local user state
        setUser((prev: any) => ({ ...prev, coins: newCoins }));
        toast.success('Account has been boosted!');
      } catch (error: any) {
        console.error('Error deducting coins:', error.message);
        toast.error(error.message || 'Something went wrong.');
      }
    } else {
      toast.error('You don’t have enough coins.');
    }
  };

const bookASpot = async () => {
  if (user?.coins > 0) {
    try {
      // Query to get the number of ads that have already been booked
      const bookedAdsQuery = query(
        collection(db, 'ads'),
        where('bookASpot', '!=', null) // Check for ads with the bookASpot field
      );

      const bookedAdsSnapshot = await getCountFromServer(bookedAdsQuery);
      const bookedAdsCount = bookedAdsSnapshot.data().count;

      // Check if there are already 6 ads booked
      if (bookedAdsCount >= 6) {
        toast.error('Maximum number of spots booked (6). Cannot book more.');
        return; // Stop execution if the limit is reached
      }

      // Query the ads collection for a document with matching userId
      const adQuery = query(
        collection(db, 'ads'),
        where('uid', '==', uid),
        limit(1)
      );
      const querySnapshot = await getDocs(adQuery);

      if (!querySnapshot.empty) {
        const adDoc = querySnapshot.docs[0];
        const adsRef = adDoc.ref;

        // Update the ad's createdAt to move it to the top (mark it as booked)
        await updateDoc(adsRef, { bookASpot: Timestamp.now() });
        setHasBookedSpot(false);

        // Update local user state
        toast.success('Spot has been booked!');
      } else {
        console.warn('No ad found for this user.');
        toast.error('No ad found to boost.');
      }
    } catch (error: any) {
      console.error('Error deducting coins:', error.message);
      toast.error(error.message || 'Something went wrong.');
    }
  } else {
    toast.error('You don’t have enough coins.');
  }
};
  
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (uid) {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUser(userSnap.data());
        setIsSubscribed(userSnap.data()?.isSubscribed || false);
      }

      // Check if the user has already booked a spot
      const adQuery = query(
        collection(db, 'ads'),
        where('uid', '==', uid),
        limit(1)
      );
      const querySnapshot = await getDocs(adQuery);

      if (!querySnapshot.empty) {
        const adDoc = querySnapshot.docs[0];
        const adData = adDoc.data();
        if (adData?.bookASpot) {
          setHasBookedSpot(false);
        } else {
          setHasBookedSpot(true);
        }
      }
    }
  });

  return () => unsubscribe();
}, [uid]);


  return (
    <main className="min-h-screen bg-gray-50 p-6 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.name || 'User'}
          </h1>
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              isSubscribed ? 'bg-[#8B0000] text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {isSubscribed ? 'Subscribed' : 'Free User'}
          </span>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-[#8B0000]">Profile Details</h2>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Joined:</strong> {joinedAt}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Status:</strong> {isSubscribed ? 'Active Subscription' : 'No Subscription'}
          </p>
          <p className="text-sm text-gray-600 mb-1">
           {user?.coins && (
            <>
              <strong>Coins:</strong> <span>{user.coins}</span>
            </>
           )}
          </p>
          <div className="flex justify-between">
            <div 
                className="text-left mt-5" 
              >
                <span 
                  className="btn--default bg-[#8B0000] hover:bg-[#a80000] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-200"
                  onClick={() => deductCoins()}
                >
                  Move to top
                </span>
            </div>
            {hasBookedSpot && (
              <div className="text-left mt-5">
                <span 
                  className="btn--default bg-[#8B0000] hover:bg-[#a80000] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-200"
                  onClick={() => bookASpot()}
                >
                  Book a spot
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Call to Action for Unsubscribed User */}
        {!isSubscribed && (
          <div className="text-center">
            <Link
              href={"/boostProfile"}
              className="bg-[#8B0000] hover:bg-[#a80000] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-200"
            >
              Upgrade Profile Now
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
