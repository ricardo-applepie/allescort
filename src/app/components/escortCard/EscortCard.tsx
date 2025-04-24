// components/EscortCard.tsx

import React from 'react';
import Link from 'next/link';
import './escort-card.scss';

interface EscortCardProps {
  text?: string;
  escortIndex: number;
  className?: string;
}

const today = new Date();
today.setHours(0, 0, 0, 0); // reset to start of today

const EscortCard = ({ escort, escortIndex }: any) => {
  const { adId, imageUrls } = escort;
  const previewImage = imageUrls && imageUrls[0];
  const createdAt = escort.createdAt?.toDate?.() || new Date(escort.createdAt);
  const isNew = createdAt >= today;

  return (
    <div 
      className="transition-transform hover:-translate-y-1 duration-300 shadow-md hover:shadow-lg rounded-xl border border-gray-200 bg-white overflow-hidden escort-card"
      key={`escort-card-${escortIndex}`}
    >
      {isNew && (
        <div className="escort-card__new-tag">
          New
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 escort-card__img-wrapper">
          {previewImage && (
            <img className="h-full w-full object-cover escort-card__img" src={previewImage} alt="Escort" />
          )}
        </div>
        <div className="md:w-1/3 pl-4 pr-4 md:pb-4 pt-4  flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{escort?.adTitle}</h2>
            <p className="text-gray-600 text-md line-clamp-4">
              {escort?.description}
            </p>
          </div>
          <div className="text-sm mt-3 text-red-700 font-semibold">{escort?.phone}</div>
        </div>
        <div className="md:w-1/3 pl-4 pr-4 pb-4 md:pt-4 flex flex-col justify-between">
          <ul className="text-sm mt-4 space-y-1">
            <li><strong>Location:</strong> {escort?.address}</li>
            <li><strong>Age:</strong> {escort.age}</li>
            <li><strong>Likes:</strong> bj</li>
            <li><strong>Sex:</strong> F</li>
          </ul>
          <Link 
            href={`/escort/${adId}`}
            className="mt-4 inline-block text-center bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-full transition-all duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EscortCard;
