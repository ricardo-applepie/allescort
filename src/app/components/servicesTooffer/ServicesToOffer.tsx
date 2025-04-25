'use client';

import React, { useState } from 'react';

const services = [
  { id: 64, label: 'Passiv', checked: true },
  { id: 65, label: 'Aktiv', checked: true },
  { id: 68, label: 'Par', checked: true },
  { id: 117, label: '69 + Megafransk' },
  { id: 116, label: '69 + Superfransk' },
  { id: 118, label: '69 almindelig' },
  { id: 94, label: 'Blid Dominans' },
  { id: 106, label: 'Blide former' },
  { id: 107, label: 'Dansk' },
  { id: 74, label: 'Dildo-show' },
  { id: 126, label: 'Erotisk massage' },
  { id: 81, label: 'Erotiskmassage' },
  { id: 127, label: 'Escort Service' },
  { id: 112, label: 'Fransk' },
  { id: 113, label: 'Gensidigfransk' },
  { id: 105, label: 'GFE-kæresteoplevelse' },
  { id: 103, label: 'Giver græsk' },
  { id: 95, label: 'Giver sorte kys' },
  { id: 120, label: 'Handicappet' },
  { id: 85, label: 'Herskerinde' },
  { id: 86, label: 'Hård Dominans' },
  { id: 124, label: 'In Call' },
  { id: 80, label: 'Kropsmassage' },
  { id: 69, label: 'Lesbisk' },
  { id: 70, label: 'Lesbisk show' },
  { id: 115, label: 'Megafransk' },
  { id: 104, label: 'Modtager græsk' },
  { id: 96, label: 'Modtager sorte kys' },
  { id: 67, label: 'Nøgenbilleder/Video' },
  { id: 79, label: 'Oliemassage' },
  { id: 111, label: 'Oliespansk' },
  { id: 109, label: 'Oliesvensk' },
];

const ServicesComponent = ({ onChange }: { onChange: (selected: number[]) => void }) => {
  const [selectedServices, setSelectedServices] = useState(() =>
    services.reduce((acc, service) => {
      acc[service.id] = service.checked || false;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const handleCheckboxChange = (id: number) => {
    const updated = {
      ...selectedServices,
      [id]: !selectedServices[id],
    };
    setSelectedServices(updated);
    onChange(Object.keys(updated).filter((key) => updated[+key]).map(Number));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <hr className="mb-4" />
      <p className="text-lg font-semibold text-gray-700 mb-4">Vælg hvad du tilbyder</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.map(({ id, label }) => (
          <label key={id} htmlFor={`offerValue${id}`} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              id={`offerValue${id}`}
              checked={selectedServices[id]}
              onChange={() => handleCheckboxChange(id)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <span className="text-gray-600">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ServicesComponent;
