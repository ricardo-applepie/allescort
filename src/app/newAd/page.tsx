'use client';

import { useState } from "react";
import Select from "../components/Select/Select";
import { nationalities } from "../utils";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { auth as firebaseAuth, db, storage } from "@/lib/firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const formFields = [
  {
    category: "Annonce Information",
    fields: [
      {
        inputType: "S",
        description: "I am / I am",
        name: "identity",
        require: true,
        type: "select",
        placeholder: "I am",
        options: [
          "Girl",
          "Gay",
          "Man",
          "Couple",
          "Clinic",
          "Escort agency",
          "Transvestite",
          "Transexual",
        ],
      },
      {
        description: "Ad Title (Max 30 characters)",
        name: "adTitle",
        require: true,
        type: "text",
        placeholder: "Please enter Ad title",
      },
      {
        inputType: "S",
        description: "Age (Note: You must be over 21 years old to create an ad profile.)",
        name: "age",
        require: true,
        type: "number",
        placeholder: "Please Enter Age",
        options: Array.from({ length: 80 }, (_, i) => i + 21),
      },
      {
        inputType: "S",
        description: "Height",
        name: "height",
        require: true,
        type: "select",
        placeholder: "Height",
        options: Array.from({ length: 218 - 140 + 1 }, (_, i) => `${140 + i}cm`),
      },
      {
        description: "Weight",
        name: "weight",
        require: true,
        type: "select",
        placeholder: "Weight",
        options: Array.from({ length: 120 - 35 + 1 }, (_, i) => `${35 + i}kg`),
      },
      {
        description: "Nationality",
        name: "nationality",
        require: true,
        type: "select",
        placeholder: "Enter nationality",
        options: nationalities,
      },
      {
        description: "Do you work independently? / I work independently",
        name: "independent",
        require: true,
        type: "checkbox",
      },
      {
        description: "Beskriv dig selv / Describe yourself (Minimum 400 tegn)",
        name: "description",
        require: true,
        type: "textarea",
        placeholder: "Describe yourself",
      },
      {
        description: "Address",
        name: "address",
        require: true,
        type: "text",
        placeholder: "Enter address",
      },
      {
        description: "Postal code",
        name: "postalCode",
        require: true,
        type: "text",
        placeholder: "Enter Postal Code",
      },
      // Add Region selection field here
      {
        description: "Region",
        name: "ad_country",
        require: true,
        type: "select",
        placeholder: "Select Region",
        options: [
          "København", "Sjælland", "Sydsjælland", "Nordsjælland", "Odense", 
          "Fyn", "Aarhus", "Aalborg", "Jylland", "Esbjerg", "Randers", 
          "Kolding", "Horsens", "Vejle", "Roskilde", "Herning", "Norge-Oslo", 
          "Sverige", "Flensburg", "Slagelse"
        ],
      },
    ],
  },
  {
    category: "Contact Information",
    fields: [
      {
        description: "Phone number",
        name: "phone",
        require: true,
        type: "text",
        placeholder: "Please enter Phone number",
      },
    ],
  },
];

export default function DashBoard() {
  const [formData, setFormData] = useState({ uid: "", status: "pending" });
  const [images, setImages] = useState<File[]>([]);

  const auth = useSelector((state: any) => state.auth);
  const { authToken, user } = auth;
  const router = useRouter();

  const handleChange = (name: any, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      formData.uid = user.uid;
      const q = query(collection(db, "ads"), orderBy("adId", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      let newAdId = 1;
      if (!querySnapshot.empty) {
        const lastAd = querySnapshot.docs[0].data();
        newAdId = parseInt(lastAd.adId) + 1;
      }

      // Upload images to Firebase Storage
      const imageUrls: string[] = [];
      for (const image of images) {
        const imageRef = ref(storage, `ads/${user.uid}_${Date.now()}_${image.name}`);
        const snap = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snap.ref);
        imageUrls.push(url);
      }

      // Save ad with image URLs
      await addDoc(collection(db, "ads"), {
        ...formData,
        adId: newAdId.toString(),
        imageUrls,
        createdAt: Timestamp.now(),
        boostedAt: null,
        bookASpot: null
      });

      toast.success("Ad successfully created! 🎉");
      router.push("/boostProfile");
    } catch (err) {
      console.error("Error posting ad:", err);
      toast.error("Ad not created! Please check the form.");
    }
  };

  return (
    <main className="container font-[family-name:var(--font-geist-sans)]">
      <section className="section">
        <h1 className="text-center text-[rgb(139,0,0)] text-3xl font-bold mb-2">
          Free Announcement
        </h1>
        <p className="text-center text-gray-600">
          Gratis annoncer til Massage & Escort.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-white shadow-lg rounded px-8 pt-8 pb-8 mt-6"
        >
          {formFields.map((category, index) => (
            <div key={`category_${index}`} className="mb-6">
              <h2 className="text-lg font-semibold text-[rgb(139,0,0)] mb-4">
                {category.category}
              </h2>
              {category.fields.map((field, idx) => {
                if (field.options) {
                  return (
                    <Select
                      key={`${index}_${idx}`}
                      fieldIndex={`${index}_${idx}`}
                      options={field.options}
                      label={field.description}
                      onChange={(val: any) => handleChange(field.name, val)}
                    />
                  );
                }
                if (field.type === "checkbox") {
                  return (
                    <div key={`${index}_${idx}`} className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        id={field.name}
                        onChange={(e) => handleChange(field.name, e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={field.name}>{field.description}</label>
                    </div>
                  );
                }
                if (field.type === "textarea") {
                  return (
                    <div key={`${index}_${idx}`} className="mb-3">
                      <label className="block text-gray-700 font-medium mb-1">
                        {field.require && "*"} {field.description}
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded"
                        placeholder={field.placeholder}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      />
                    </div>
                  );
                }
                return (
                  <div key={`${index}_${idx}`} className="mb-3">
                    <label className="block text-gray-700 font-medium mb-1">
                      {field.require && "*"} {field.description}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                );
              })}
            </div>
          ))}

          {/* 📸 Image Upload Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setImages(files);
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[rgb(139,0,0)] text-white font-semibold py-3 rounded hover:bg-red-800"
          >
            Submit Announcement
          </button>
        </form>
      </section>
    </main>
  );
}
