import { dbAdmin } from '@/lib/firebase-admin';
import EscortCards from './components/escortCards/EscortCards';
import SearchFilter from './components/searchFilter/searchFilter';
import Services from './components/services/Services';
import { BookASpot } from './components/bookASpot/BookASpot';

export default async function Home() {
  // Fetch boosted ads
  const boostedSnapshot = await dbAdmin
    .collection('ads')
    .where('status', '==', 'approved')
    .where('boostedAt', '!=', null)
    .orderBy('boostedAt', 'desc')
    .get();

  const boostedAds = boostedSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })); 
  // Fetch regular ads (non-boosted)
  const regularSnapshot = await dbAdmin
    .collection('ads')
    .where('status', '==', 'approved')
    .where('boostedAt', '==', null)
    .orderBy('createdAt', 'desc')
    .get();

  const bookedSpotSnapshot = await dbAdmin
  .collection('ads')
  .where('status', '==', 'approved') // Filter for approved ads
  .where('bookASpot', '!=', null) // Only include ads where the bookASpot field is not null
  .orderBy('createdAt', 'desc') // Order by createdAt, descending
  .get();

  const bookedSpotAds = bookedSpotSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const regularAds = regularSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));


  // Combine boosted ads first
  const escorts = [...boostedAds, ...regularAds];

  return (
    <main className="container font-[family-name:var(--font-geist-sans)]">
      <SearchFilter hideSearchResult={true} />
      <Services />
      {bookedSpotAds && (
        <BookASpot bookedSpotAds={bookedSpotAds}/>
      )}
      <h2 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-[rgb(185,28,28)] via-red-600 to-red-800 py-3 px-6 rounded-lg mt-10 md:mt-9 mb-4 md:mb-0 transform transition-all duration-700 hover:scale-105 animate-bounce">
        Velkommen til Alle escort
      </h2>
      <section className="section">
        <EscortCards escorts={escorts} />
      </section>
    </main>
  );
}
