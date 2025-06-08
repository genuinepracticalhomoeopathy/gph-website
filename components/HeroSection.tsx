'use client';
import Image from 'next/image';
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 relative bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 z-10">
            <div className="inline-block bg-[#179E25] rounded-full px-4 py-1 mb-6 text-sm font-medium">
              #1 Homoeopathy Course
            </div>
            
            <h1 className="text-5xl md:text-5xl font-bold text-black mb-6 leading-tight">
            BECOME THE <br />
<span className='text-[]'> GENUINE PRACTICAL HOMOEOPATH <br /></span>
YOU WERE MEANT TO BE! 
            </h1>
            
            <div className="relative">
              <div className="h-2 bg-[#179E25] w-3/4 absolute bottom-0 -z-10"></div>
            </div>
            
            <p className="text-gray-600 mb-8 mt-8 max-w-lg">
            Learn the Genuine Practical Homoeopathy to Earn Respectively.</p>
            
            <button 
              className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center hover:bg-gray-800 transition-colors"
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="rounded-3xl overflow-hidden relative">
              <Image
                width={500}
                height={500}
                src="/image.png" 
                alt="Genuine Practical Homoeopathy" 
                className="w-full h-[500px] rounded-3xl object-cover m-5"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;