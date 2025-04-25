'use client';

import { Suspense } from 'react';
import SearchFilterNew from '../components/SearchFilterNew/SearchFilterNEw';

export default function SearchPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchFilterNew />
      </Suspense>
    </>
  );
};
