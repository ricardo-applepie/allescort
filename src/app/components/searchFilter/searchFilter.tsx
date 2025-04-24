'use client';

import './searchFilter.scss';
import { Button, TextField } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings, setSearchQueryCity } from '@/redux/listings/listings';
import { AppDispatch } from '@/store/store';

interface SearchFilterProps {
  searchQuery?: string;
  hideSearchResult?: boolean;
}

export default function SearchFilter({ hideSearchResult }: SearchFilterProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, listings } = useSelector((state: any) => state.searchListings);
  const { city } = searchQuery;
  const listingsCount = listings.length > 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchListings());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setSearchQueryCity(value));
  };

  return (
    <div className="mt-1 mb-1">
      {/* <form className="search__form bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            placeholder="Service"
            className="w-full md:w-1/5 md:grow rounded-lg shadow-sm"
            value={city}
            onChange={handleChange}
            variant="outlined"
          />
          <div className="flex w-full md:w-2/5 gap-4 md:grow">
            <TextField
              placeholder="Location"
              className="w-1/2 md:grow rounded-lg shadow-sm"
              variant="outlined"
            />
            <TextField
              placeholder="Escort"
              className="w-1/2 md:grow rounded-lg shadow-sm"
              variant="outlined"
            />
          </div>
          <Button
            variant="contained"
            className="w-full btn md:w-1/5 md:grow bg-red-700 text-white hover:bg-red-900 transition duration-200"
            type="submit"
          >
            <SearchIcon /> Search
          </Button>
        </div>
      </form> */}

      {!hideSearchResult && (
        <div className="escort-overview mt-4 flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md">
          <div>
            <span className="escort-count text-primary text-lg font-semibold">767</span> 
            She seeks him: Sex contacts with ladies' erotic ads in Berlin
          </div>
          <div className="flex space-x-2">
            <SortIcon className="text-primary hover:text-primary-dark" />
            <StarBorderIcon className="text-primary hover:text-primary-dark" />
          </div>
        </div>
      )}
    </div>
  );
}
