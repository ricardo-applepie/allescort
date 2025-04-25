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
import ServicesComponent from "../components/servicesTooffer/ServicesToOffer";

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
        description: "Work area / area",
        name: "area",
        require: true,
        type: "select",
        placeholder: "Area",
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
  const [verificationImages, setVerificationImage] = useState<File>();
  const [identityImages, setIdentityImage] = useState<File>();
  const [videoUpload, setVideoUpload] = useState<File>();
  const [ProfilePicture, setProfilePicture] = useState<File>();

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
          <ServicesComponent onChange={(selected) => handleChange("services", selected)} />

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Upload Front Picture</label>
            <p className="text-sm text-gray-600 mb-2">
              <strong>DK:</strong> Upload et forsidebillede til din profil. <br />
              Dette billede vil være det første, kunderne ser på din profilside.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>EN:</strong> Upload a front picture for your profile. <br />
              This image will appear as the main photo on your profile page.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProfilePicture(file);
                }
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Upload Gallery Pictures (Max 20)</label>
            <p className="text-sm text-gray-600 mb-2">
              <strong>DK:</strong> Upload op til 20 billeder i dit galleri. <br />
              <strong>Ny ophavsretslov 2025:</strong> Brug ikke falske billeder – overtrædelse medfører sletning af din konto.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>EN:</strong> Upload up to 20 pictures in your gallery. <br />
              <strong>New Copyright Act 2025:</strong> Do not use fake images – violation will result in account deletion.
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 20) {
                  alert("You can upload a maximum of 20 images.");
                  return;
                }
                setImages(files);
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>


          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Upload Video</label>
            <p className="text-sm text-gray-600 mb-2">
              <strong>DK:</strong> Mange bruger falske eller gamle billeder. Derfor er videoannoncer fremtiden. Lav en kort video med din smartphone og upload den her. Maksimal længde: 2 minutter.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>EN:</strong> Many users upload fake or outdated photos. That’s why video advertising is the future. Record a short video with your smartphone and upload it here. Maximum length: 2 minutes.
            </p>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setVideoUpload(file); // state: const [videoUpload, setVideoUpload] = useState<File | null>(null);
                }
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>


          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Picture Verification</label>
            <p className="text-sm text-gray-600 mb-2">
              <strong>DK:</strong> 
              1. Verificerede profiler vises øverst på siden. <br />
              2. Tag et helkropsbillede i undertøj med et papir foran dig, hvor dagens dato står skrevet. <br />
              3. Vi gennemgår og godkender dine billeder og din profil. <br />
              4. Dette billede vil ikke blive vist online.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>EN:</strong> 
              1. Verified profiles are always shown at the top of the website. <br />
              2. Take a full-body photo in underwear while holding a paper with today’s date written on it. <br />
              3. We will review and approve your photos and profile. <br />
              4. This image will not be displayed online.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setVerificationImage(file);
                }
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Upload Identity Document</label>
            <p className="text-sm text-gray-600 mb-2">
              <strong>DK:</strong> Upload et billed-ID for at bekræfte, at du er over 21 år. Legitimationen skal indeholde dit billede og din fødselsdato. Dit ID vil ikke blive vist online og opbevares sikkert.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>EN:</strong> Upload a photo ID to confirm you are over 21 years old. The document must include your picture and date of birth. Your ID will not be shown online and will be stored securely.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setIdentityImage(file);
                }
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
