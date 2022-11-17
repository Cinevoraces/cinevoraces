import React, { useState } from 'react';
import Image from 'next/image';
import { InscriptionForm } from '@components/Forms';
import PosterComponent from '@components/PostersComponent';
import Metrics from '@components/Metrics';
interface FormProps {
  children: React.ReactNode;
}

export default function Inscription() {

  // To delete later
  const metrics = {
    seasons_count: 3,
    movies_count: 137,
    countries_count: 46,
  };
    
  return (
    <main className='container mx-auto px-4'>
      <div className='container mx-auto px-4 py-8 lg:py-16 flex flex-col items-center justify-between gap-8 md:flex-row-reverse '>
        <section className='w-full px-auto md:max-w-1/2 xl:mr-[10vh]'>
          <h1 className="text-3xl mb-10 font-bold lg:text-6xl">Créer un compte</h1>
          <InscriptionForm />
        </section>
        <section className='w-full flex justify-center md:max-w-1/2 md:justify-start xl:ml-[10vh]'>
          <PosterComponent number={3} />
        </section>
      </div>
      <Metrics {...metrics}/>
    </main>
  );
}
