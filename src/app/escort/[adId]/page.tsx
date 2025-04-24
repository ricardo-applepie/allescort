// src/app/escort/[adId]/page.tsx
import { dbAdmin } from '@/lib/firebase-admin';
import EscortProfile from '@/app/components/escortProfile/EscortProfile';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: { adId: string };
}

// Next.js Metadata (optional)
export const metadata: Metadata = {
  title: 'Escort Profile',
};

export default async function EscortPage({ params }: Props) {
  const { adId } = params; // Extract adId from params

  try {
    const adsSnapshot = await dbAdmin
      .collection('ads')
      .where('adId', '==', adId)
      .get();

    const ad = adsSnapshot.docs.map((doc) => {
      const data = doc.data();

      // Handle timestamps if needed
      const convertedAd = {
        ...data,
        boostedAt: '',
        createdAt: '',
      };

      return { id: doc.id, ...convertedAd };
    })[0];

    if (!ad) {
      return (
        <main className="container font-[family-name:var(--font-geist-sans)]">
          User not found
          <Link className="ml-3 btn--bg btn--default" href="/">
            Go to home
          </Link>
        </main>
      );
    }

    return (
      <main className="container font-[family-name:var(--font-geist-sans)]">
        <EscortProfile ad={ad} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching ad:', error);
    return <p>Something went wrong.</p>;
  }
}
