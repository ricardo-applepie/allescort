'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { auth } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

type Listing = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  imageUrls: string[];
};

export default function AdminPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const unsubscribe = onAuthStateChanged(auth, async user => {
        if (!user) {
          router.push('/login');
          return;
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        if (!userData || !userData.admin) {
          router.push('/'); // Redirect non-admin users
          return;
        }

        // ✅ Load all listings if admin
        const snapshot = await getDocs(collection(db, 'ads'));
        const allListings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Listing[];
        setListings(allListings);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    checkAdmin();
  }, [router]);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    const ref = doc(db, 'ads', id);
    await updateDoc(ref, { status });
    setListings(prev => prev.filter(item => item.id !== id)); // Update UI by removing the listing
  };

  const filteredListings = listings.filter(listing => listing.status === selectedStatus);

  if (loading) return <p className="text-center mt-20">Checking permissions...</p>;

  return (
    <main className="container-xl font-[family-name:var(--font-geist-sans)]">
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Escort Listings Approval</h1>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setSelectedStatus('pending')}
            className={`px-4 py-2 rounded-lg ${selectedStatus === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setSelectedStatus('approved')}
            className={`px-4 py-2 rounded-lg ${selectedStatus === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            Approved
          </button>
          <button
            onClick={() => setSelectedStatus('rejected')}
            className={`px-4 py-2 rounded-lg ${selectedStatus === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            Rejected
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map(listing => {
            const previewImage = listing.imageUrls[0];
            return (
              <div key={listing.id} className="bg-white rounded-xl shadow p-4">
                {previewImage && (
                  <img
                    className="rounded-lg object-cover w-full h-48"
                    src={previewImage}
                    alt="this is escort profile pic"
                    width={400}
                    height={300}
                  />
                )}
                <div className="mt-4">
                  <h2 className="text-xl font-semibold">{listing.name}</h2>
                  <p className="text-sm text-gray-600">{listing.description}</p>
                  <p className="text-sm text-yellow-600">Status: {listing.status}</p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => updateStatus(listing.id, 'approved')}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(listing.id, 'rejected')}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredListings.length === 0 && (
          <p className="text-gray-500 text-center mt-20">No listings to review.</p>
        )}
      </div>
    </main>
  );
}
