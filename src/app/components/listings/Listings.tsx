'use client';

import { useSelector } from 'react-redux';
import './listings.scss';
const data = [1, 2 ,3, 4, 5, 6];

interface Listing {
  listingId: number;
  title: string;
  description: string;
  price: string;
  address: string;
  city: string;
  country: string;
  latLng: { lat: number, lng: number } | null;
  images: string[];
  availableFrom: string; 
  availableTo: string | null; 
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string; 
  userId: number;
}

interface ListingsProps {
  listings: Listing[];
}

export default function Listings( props: ListingsProps) {
  const { listings, loading, loaded } = useSelector((state: any) => state.searchListings);
  const listingNotFound = listings.length === 0 && loaded;
  if(loading) return (<h1>Searching...</h1>);

  return (
    <div className="listings mt-5">
      {(listings?.length > 0 ) && (
        <ul className="listings-list grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-8">
          {listings.map((item: Listing , index: number) => {
            const { city, country, address, description, images, price } = item;
            return (
              <li className="listings-item" key={`listings-item-${index}`}>
                <img className="listing-img" src="/list-img.webp"/>
                <div className="listing-content mt-5">
                  <h3 className="listing-description">{description}</h3>
                  <h4 className="listing-description mt-3"> 
                    <span className="listing-price font-bold mr-3">{price}€</span>
                    <span className="listing-area font-bold mr-3">83 m²</span>
                    <span className="listing-rooms font-bold">4 Zi.</span>
                  </h4>
                  <h3 className="mt-1">{address}</h3>
                </div>
              </li>
            )
          })}
        </ul>
      )}
      {(listingNotFound) && (<h1>No listings found</h1>)}
    </div>
  );
}
