"use client";

import React, { useState, ChangeEvent } from "react";

type PriceOption = {
  days: number;
  price: number;
  description: string;
};

type ProfileCardProps = {
  profileType: "diamond" | "gold" | "silver";
  price: PriceOption[];
  features: string[];
  selectedOption: {
    profile: string;
    days: number;
  };
  onOptionChange: (profile: string, days: number) => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileType,
  price,
  features,
  selectedOption,
  onOptionChange,
}) => {
  const profileImages: Record<"diamond" | "gold" | "silver", string> = {
    diamond: "https://images.escort-side.dk/Static/diamond-image.png",
    gold: "/gold.jpg",
    silver: "/silver.webp",
  };

  const isSelected = selectedOption.profile === profileType;

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between ${
        isSelected ? "border-[#8B0000] shadow-2xl" : "border-gray-200 shadow"
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <img src={profileImages[profileType]} alt={`${profileType} icon`} className="w-16" />
          <div className="text-right">
            <p className="text-xs text-gray-500">Anonymous Payment</p>
            {/* <img
              src="https://images.escort-side.dk/Static/Certified-2.png"
              alt="Certified"
              className="w-8 ml-auto"
            /> */}
          </div>
        </div>

        <h4 className="text-xl font-bold text-[#8B0000] capitalize mb-4">
          {profileType} Profile
        </h4>

        <ul className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-700">
              <i className="fas fa-check text-green-600 mr-2 mt-1"></i>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <h5 className="text-[#8B0000] font-semibold mb-2">Choose Duration</h5>
          <div className="space-y-2">
            {price.map((option, idx) => (
              <label key={idx} className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name={profileType}
                  value={option.days}
                  checked={isSelected && selectedOption.days === option.days}
                  onChange={() => onOptionChange(profileType, option.days)}
                  className="accent-[#8B0000] mt-1"
                />
                <span>{`${option.days} days (${option.price} DKK) – ${option.description}`}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

type ProfileData = {
  diamond: { price: PriceOption[]; features: string[] };
  gold: { price: PriceOption[]; features: string[] };
  silver: { price: PriceOption[]; features: string[] };
};

const ProfileCategory: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<{
    profile: string;
    days: number;
  }>({ profile: "diamond", days: 1 });

  const handleOptionChange = (profile: string, days: number): void => {
    setSelectedOption({ profile, days });
  };

  const profileData: ProfileData = {
    diamond: {
      price: [
        { days: 1, price: 300, description: "Fast to the top" },
        { days: 7, price: 1800, description: "Save 300 DKK" },
      ],
      features: [
        "Diamond Profile is the best profile with 1000% more visibility.",
        "Diamond Profile will always be on top, so more people will see your profile.",
        "No competition with other profiles on your site.",
        "Extra middle ad on the homepage and search page.",
        "Double profile space for more visibility.",
        "Over 90,000 visits daily.",
      ],
    },
    gold: {
      price: [
        { days: 1, price: 250, description: "Fast to the top" },
        { days: 7, price: 1600, description: "Save 200 DKK" },
      ],
      features: [
        "Gold Profile is a visible profile with good exposure.",
        "Gold Profile will get more visibility than standard profiles.",
        "More visitors will be able to find your profile.",
        "Ads show up at the top of the page.",
        "Less competition than on standard profiles.",
      ],
    },
    silver: {
      price: [
        { days: 1, price: 200, description: "Fast to the top" },
        { days: 7, price: 1400, description: "Save 100 DKK" },
      ],
      features: [
        "Silver Profile has decent visibility.",
        "Silver Profile will be shown in the list, but with lower priority.",
        "More visitors will be able to find your profile.",
        "Shown in search results.",
      ],
    },
  };

  const handleSubmit = () => {
    alert(
      `You selected a ${selectedOption.profile.toUpperCase()} profile for ${selectedOption.days} days.`
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#8B0000]">Upgrade Your Profile</h2>
          <p className="text-gray-600 mt-2">Choose a premium profile to boost your visibility.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {(["diamond", "gold", "silver"] as const).map((type) => (
            <ProfileCard
              key={type}
              profileType={type}
              price={profileData[type].price}
              features={profileData[type].features}
              selectedOption={selectedOption}
              onOptionChange={handleOptionChange}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-[#8B0000] hover:bg-[#a80000] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-200"
          >
            Continue with {selectedOption.profile.charAt(0).toUpperCase() + selectedOption.profile.slice(1)} - {selectedOption.days} Day(s)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCategory;
