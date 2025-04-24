'use client';

import { useEffect } from 'react';
import $ from 'jquery';


declare global {
  interface Window {
    jQuery: typeof jQuery;
    $: typeof jQuery;
  }
}

export default function JQueryProvider() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.$ = window.jQuery = $;
    }
  }, []);

  return null;
}
