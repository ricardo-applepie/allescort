// components/EscortCards.tsx

import React from 'react';
import EscortCard from '../escortCard/EscortCard';

const EscortCards = ({ escorts }) => {
  return (
    <div className="flex flex-col gap-6 py-6  w-full">
      {escorts?.map((escort, index) => (
        <EscortCard escortIndex={index} escort={escort} />
      ))}
    </div>
  );
};

export default EscortCards;
