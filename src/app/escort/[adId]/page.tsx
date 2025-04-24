import { dbAdmin } from '@/lib/firebase-admin';
import EscortProfile from '@/app/components/escortProfile/EscortProfile';
import Link from 'next/link';

interface Ad {
  adTitle: string;
  age: number;
  height: string;
  weight: string;
  nationality: string;
  independent: boolean;
  description: string;
  address: string;
  postalCode: string;
  phone: string;
  // Add more fields if necessary
}

interface Props {
  params: { adId: string }; // Next.js dynamic route param
}

export default async function EscortPage({ params }: Props) {
  const { adId } = params;

  try {
    const adsSnapshot = await dbAdmin.collection('ads').where('adId', '==', adId).get();
    const ad = adsSnapshot.docs.map(doc => {
      const data = doc.data();

      // Convert Firebase Timestamp to regular Date object or string
      const convertedAd = {
        ...data,
        boostedAt: "",
        createdAt: ""
      };

      return { id: doc.id, ...convertedAd };
    })[0];

    console.log(ad, "knapishpdhasd");

    if (!ad) {
      return (
        <main className="container font-[family-name:var(--font-geist-sans)]">
          User not found
          <Link className="ml-3 btn--bg btn--default" href="/" > Go to home</Link>
        </main>
      );
    }

    return (
      <main className="container font-[family-name:var(--font-geist-sans)]">
        {ad && (
          <EscortProfile ad={ad} />
        )}
      </main>
    );
  } catch (error) {
    console.error("Error fetching ad:", error);
    return <p>Something went wrong.</p>;
  }
}
