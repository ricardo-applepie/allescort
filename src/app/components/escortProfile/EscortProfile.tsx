'use client';

import EscortCards from "../escortCards/EscortCards";
import SimpleSlider from "../simpleSlider/SimpleSlider";
import "./escort-profile.scss";

export default function EscortProfile({ ad }: any) {
  const img = "https://nympho.dk/_pictures/ads/l/1147137591531009752.webp";
  const images = [img, img, img, img, img, img, img, img];
  const { adId, adTitle, address, age, description, height, id, identity, nationality, phone, postalCode, status, uid, weight, imageUrls } = ad;
  const previewImage = imageUrls[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          {adTitle}
        </h1>
        {/* <SimpleSlider images={images} /> */}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative">
            <img  
              className="w-full h-80 object-cover rounded-lg shadow-lg"
              src={previewImage} alt="profile pic"
            />
            <div className="flex thumbnails flex-wrap mt-5">
              {images.map((img, index) => (
                <div key={`thumbnail${index}`} className="w-24 h-24 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <img
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    src={img}
                    alt={`Thumbnail ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="font-semibold text-gray-800">Address:</span>
                <span className="text-gray-600">2100</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold text-gray-800">Updated:</span>
                <span className="text-gray-600">06 Apr 2025</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold text-gray-800">Contact:</span>
                <span className="text-blue-600">Send Message</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold text-gray-800">Write a Review:</span>
                <span className="text-blue-600">Write a Review</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Phone:</span>
                <span className="text-blue-600">{phone}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Phone Number Verified:</span>
                <span className="text-green-600">Verified</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
            <h2 className="text-xl font-semibold text-gray-800">Services</h2>
            <ul className="mt-4 flex flex-wrap gap-4">
              {[
                "69 + Megafransk",
                "Aktiv",
                "69 + Superfransk",
                "69 almindelig",
                "Blide former",
                "Erotisk massage",
                "Escort Service"
              ].map((service, index) => (
                <li
                  key={`erotisk_${index}`}
                  className="relative group flex-1 px-4 py-2 text-center whitespace-nowrap bg-red-700 text-white hover:bg-red-900 transition duration-200 border-r border-gray-100"
                >
                  <a href="#" className="w-full block">{service}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
            <p className="mt-4 text-gray-700">
              {description}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">Service: Out Call</h2>
            <ul className="space-y-4 mt-4">
              <li>
                <i className="fa fa-bullseye" aria-hidden="true"></i> Service: <strong className="text-gray-700"><a href="#">Escort, Escort-massage</a></strong>
              </li>
              <li>
                <i className="fa fa-bullseye" aria-hidden="true"></i> Area: <strong className="text-gray-700"><a href="#">{address}</a></strong>
              </li>
              <li>
                <i className="fa fa-bullseye" aria-hidden="true"></i> Locality: <strong className="text-gray-700"><a href="#">{address}</a></strong>
              </li>
              <li>
                <i className="fa fa-bullseye" aria-hidden="true"></i> I am: <strong className="text-gray-700">{identity}</strong>
              </li>
              <li>
                <i className="fa fa-bullseye" aria-hidden="true"></i> Available for: <strong className="text-gray-700">Men</strong>
              </li>
              <li>
                <i className="fa fa-bullseye" aria-hidden="true"></i> Link: <strong className="text-gray-700"><a href="#">Escort in København</a></strong>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* <section className="section">
        <EscortCards escorts={[1,2,3,4,5,6,7,8]}/>
      </section> */}
    </div>
  );
}
