import React from 'react';
import Link from 'next/link';
import './bookASpot.scss';

export const BookASpot = ({ bookedSpotAds }) => {
  // Determine how many "Book a Spot" cards need to be shown
  const spotsAvailable = 6 - bookedSpotAds.length;
  const additionalSpots = spotsAvailable > 0 ? Array(spotsAvailable).fill(null) : [];

  // Function to check if a spot already exists
  const spotExists = (spotId) => {
    return bookedSpotAds.some(ad => ad.id === spotId); // Assuming each spot has a unique 'id' property
  };

  return (
    <div className="mx-auto book-spots-wrapper">
      <div className="flex book-spots">
        {/* Display the booked spots */}
        {bookedSpotAds.map((ad, index) => {
          const previewImage = ad?.imageUrls && ad?.imageUrls[0];
          return (
            <div className="card" key={index}>
              <Link href={`/escort/${ad?.adId}`} className="card-image">
                {previewImage && (
                  <img
                    src={previewImage} // Replace with the actual image URL from the ad
                    alt={`Card ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                )}
                <div className="card-text">{ad.adTitle}</div>
              </Link>
            </div>
        )})}

        {/* Add "Book a Spot" cards for any remaining spots */}
        {additionalSpots.map((_, index) => {
          const spotId = `spot-${index}`; // Unique identifier for each spot

          // Skip rendering the "Book a Spot" card if the spot already exists
          if (spotExists(spotId)) {
            return null;
          }

          return (
            <div className="card btn--default" key={`book-${index}`}>
              <Link href={"/dashboard"} className="card-image">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Card Book a Spot"
                  className="object-cover w-full h-full"
                />
                <div className="card-text">Book a spot</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
