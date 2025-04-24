'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { postData } from '@/utils/utils';

const AddListingPage = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);  // For storing the selected image
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setMessage('Please select an image');
      return;
    }

    // Convert image to Base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string; // Get Base64 string
      const formData = {
        title: title,
        description: description,
        price: price.toString(),
        location: location,
        userId: userId.toString(),
        image: base64Image,  // Send Base64 encoded image as a string
      };

      try {
        const response = await postData("/api/v1/listings", formData);
      } catch (error) {
        console.error(error);
      }
    };

    reader.readAsDataURL(image);  // Read the image as Base64
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);  // Set the first file selected by the user
    }
  };

  return (
    <div className="w-full h-full font-[family-name:var(--font-geist-sans)] signup-page">
      <main className="flex flex-col h-full">
        <section className="mt-10 max-w-2xl mx-auto">
          <h1 className="text-3xl">Add a New Listing</h1>
          {message && <p className="text-center mt-4">{message}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-lg">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded-md"
                required
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="description" className="text-lg">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded-md"
                required
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="price" className="text-lg">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="border p-2 rounded-md"
                required
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="location" className="text-lg">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border p-2 rounded-md"
                required
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="userId" className="text-lg">User ID</label>
              <input
                type="number"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(parseInt(e.target.value))}
                className="border p-2 rounded-md"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="image" className="text-lg">Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"  // Optional: restrict to image files
                onChange={handleImageChange}
                className="border p-2 rounded-md"
                required
              />
            </div>

            <div className="mt-4">
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Add Listing</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AddListingPage;
