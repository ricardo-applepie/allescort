'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getData } from '@/utils/utils';
import { useDispatch } from 'react-redux';
import { fetchListings, setSearchQueryCity } from '@/redux/listings/listings';
import { AppDispatch } from '@/store/store';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import EscortCards from '../escortCards/EscortCards';

interface SearchProps {
  results: any[];
  query: string;
}

export default function SearchFilterNew() {
  
  // const searchParams = useSearchParams(); 
  // const searchQuery = searchParams.get('city') || ""; 
  // const [listings, setListings] = useState([]);
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const encodedSearchKeyword = encodeURIComponent(searchQuery);
  //   dispatch(setSearchQueryCity(encodedSearchKeyword));
  //   dispatch(fetchListings())
  // }, []);

  const [escorts, setEscorts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm') || ''; // ?type=diamond

  const searchAds = async (searchTerm: string) => {
    const adsRef = collection(db, "ads");
    const q = query(
      collection(db, "ads"),
      where("adTitle", ">=", searchTerm),
      where("adTitle", "<=", searchTerm + "\uf8ff")
    );

    const snapshot = await getDocs(q);
     const results: any = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
       setEscorts(results);
       setLoaded(true);
      return results;
    };


  useEffect(() => {
    searchAds(searchTerm);
  }, []);

  return (
    <main className="flex flex-col h-full max-w-7xl mx-auto px-5 md:px-10">
      <section className="section">
        {!loaded && (
          <div className="">
            <h1>Searching...</h1>

          </div>
        ) }
        {loaded && escorts.length > 0 && (
          <EscortCards escorts={escorts} />
        )}
        {loaded && escorts.length === 0 && (
          <div>
            <h1>No Escort Found</h1>
          </div>
        )}
      </section>
    </main>
  );
};