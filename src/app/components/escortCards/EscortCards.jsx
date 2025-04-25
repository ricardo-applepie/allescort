// components/EscortCards.tsx

import React from 'react';
import EscortCard from '../escortCard/EscortCard';

const EscortCards = ({ escorts }) => {
  return (
    <div className="flex flex-col gap-6 pt-0 pb-6 md:pt-4 md:pb-6 w-full">
      {escorts?.map((escort, index) => (
        <EscortCard escortIndex={index} escort={escort} />
      ))}
    </div>
  );
};

export default EscortCards;
