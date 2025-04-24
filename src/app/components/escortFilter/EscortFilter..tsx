'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQueryCity } from '@/redux/listings/listings';


export default function Home() {
  // const icons = ['Neubauprojekte', 'Haus bauen', 'Gewerbeimmobilien', 'Auslandsimmobilien'];
  // const { city } = useSelector((state: any) =>  state.searchListings.searchQuery);
  // const encodedSearchKeyword = encodeURIComponent(city);
  // const router = useRouter();
  // const dispatch = useDispatch();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   router.push(`/search?city=${encodedSearchKeyword}`);
  // };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   const encodedSearchKeyword = encodeURIComponent(value);
  //   dispatch(setSearchQueryCity(encodedSearchKeyword));
  // };

  return (
    <main className="flex flex-col h-full w-full font-[family-name:var(--font-geist-sans)]">
      {/* <section className="section section--full flex justify-center pt-8 md:pt-20">
        <div className="search">
          <h1 className="text-4xl md:text-5xl text-center text-white uppercase text-bold-900">Discover your new home</h1>
          <h2  className="text-xl md:text-2xl text-center my-5 text-white">Rent a place and stay for months.</h2>
          <form className="search__form bg-white pt-10 pb-5 px-10" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-2">
              <TextField 
                placeholder="Where will you go ?" 
                className="w-full md:w-2/5" 
                onChange={handleChange}
                value={city}
              />
              <div className="flex w-full md:w-2/5 gap-2">
                <TextField placeholder="Move-in date" className="w-1/2"  />
                <TextField placeholder="Move-out date" className="w-1/2 " />
              </div>
              <Button 
                variant="contained" 
                className="w-full md:w-1/5"
                type='submit'
              > 
                <SearchIcon /> Search
              </Button>
            </div>
          </form>
        </div>
      </section> */}
      {/* <section className="max-w-7xl mx-auto flex flex-wrap justify-between gap-4 px-5">
        {icons.map((text, index) => (
          <OutlinedCard text={text} iconIndex={index} key={`action_icon${index}`} className="w-full md:w-1/5"/>
        ))}
      </section> */}
      <section className="grid md:grid-cols-2 gap-4 max-w-7xl mx-auto items-center px-5">
        <img 
          src="/realty-agent-holding-keys-standing-near-building-isolated-flat-vector-illustration-cartoon-woman-house-sale_74855-8548.avif" 
          alt="finding appartments berlin" 
        />
        <div className="pt-4">
          <h3 className="font-bold text-2xl  md:text-5xl mb-7">Stay safe with protected payments</h3>
          <p>
             When you pay to confirm the booking, your money is safe with us. We send it to the landlord only 48 hours after you move in unless you tell us the place isn't as promised. If you contact us, we'll help you.
            Protecting you against risks. Making your move safer.          
         </p>
        </div>

      </section>
      <section className="grid md:grid-cols-2 gap-4 max-w-7xl mx-auto items-center px-5">
        <img 
          src="/selectionhome.jpg" 
          alt="finding appartments berlin" 
        />
        <div className="pt-4">
          <h3 className="font-bold text-2xl  md:text-5xl mb-7">Get a feel of the place from anywhere</h3>
          <p>
            Tired of trying to fit in viewings around your life? Explore several places at your own pace from the comfort of your couch. Enjoy high-quality photos, videos, floor plans, detailed descriptions, and more.
            Say goodbye to in-person viewings; say hello to more free time.      
         </p>
        </div>

      </section>
      <section className="grid md:grid-cols-2 gap-4 max-w-7xl mx-auto items-center px-5">
        <img 
          src="/istockphoto-1226861544-612x612.jpg" 
          alt="finding appartments berlin" 
        />
        <div className="pt-4">
          <h3 className="font-bold text-2xl  md:text-5xl mb-7">Chat and share directly with landlords</h3>
          <p>
            No more calling, texting, emailing, and discussing things with landlords in different places. Get a private page to message the landlord directly. Ask questions, share information, and see it all in the same place.
            No chance for misunderstandings. Everyone's always on the same page.        
         </p>
        </div>

      </section>
      {/* <section className="max-w-7xl mx-auto justify-between flex-wrap items-center px-5 flex gap-4">
        <div className="pt-4 w-full md:w-1/2">
          <h3 className="font-bold text-2xl  md:text-5xl mb-7">DrollonHub best housing portal 2024*</h3>
          <p>
            Das Deutsche Institut für Service-Qualität und der Nachrichtensender ntv haben 13 Immobilienportale bewertet – und immowelt erhielt den 1. Platz! Die Auszeichnung bestätigt, dass Suchenden wie Immobilienprofis immowelt das beste Erlebnis bietet. Also: Wenn immo, dann immowelt.
          </p>
        </div>
        <img 
          className="w-full md:w-2/5 rounded-md"
          src="/panel-createAd.webp" 
          alt="finding appartments berlin" 
        />
      </section> */}
      {/* <section className="max-w-4xl mx-auto">
        <h3 className="font-bold text-center text-4xl md:text-5xl mb-5">Here are the answers to your questions.</h3>
        <AccordionUsage />
      </section> */}
    </main>
  );


}
