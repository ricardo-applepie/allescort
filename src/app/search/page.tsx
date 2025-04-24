'use client';

import { useEffect, useState } from 'react';
import Listings from '../components/listings/Listings';
import SearchFilter from '../components/searchFilter/searchFilter';
import { useSearchParams } from 'next/navigation';
import { getData } from '@/utils/utils';
import { useDispatch } from 'react-redux';
import { fetchListings, setSearchQueryCity } from '@/redux/listings/listings';
import { AppDispatch } from '@/store/store';

interface SearchProps {
  results: any[];
  query: string;
}

export default function SearchPage() {
  
  // const searchParams = useSearchParams(); 
  // const searchQuery = searchParams.get('city') || ""; 
  // const [listings, setListings] = useState([]);
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const encodedSearchKeyword = encodeURIComponent(searchQuery);
  //   dispatch(setSearchQueryCity(encodedSearchKeyword));
  //   dispatch(fetchListings())
  // }, []);

  return (
    <main className="flex flex-col h-full max-w-7xl mx-auto px-5 md:px-10">
      <section>
        {/* <SearchFilter 
        /> */}
        {/* <Listings listings={listings} /> */}
      </section>
    </main>
  );
};