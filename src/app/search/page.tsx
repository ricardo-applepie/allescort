'use client';

import { Suspense } from 'react';
import SearchFilterNew from '../components/SearchFilterNew/SearchFilterNEw';

export default function SearchPage() {
  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchFilterNew />
      </Suspense>
    </div>
  );
};
