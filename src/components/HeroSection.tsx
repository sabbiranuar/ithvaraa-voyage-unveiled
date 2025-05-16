
import React, { useState, useRef } from 'react';

const videoUrls = [
  'https://player.vimeo.com/external/368763065.sd.mp4?s=13cdda75a40954aeec6e9a44dde7fd67cd5670c6&profile_id=164&oauth2_token_id=57447761',
  'https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=164&oauth2_token_id=57447761'
];

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative pt-16">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="hero-video"
        onClick={toggleVideo}
      >
        <source src={videoUrls[0]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto hero-content p-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-montserrat text-primary">
            Your Journey Begins Here!
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-800">
            Discover the magic of Northeast India with Ithvaraa - where adventure meets community. 
            Explore pristine landscapes, immerse in rich cultures, and create memories that last a lifetime.
          </p>
          
          <div className="bg-white/90 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">The Enchanting Northeast</h2>
            <p className="text-gray-700 mb-4">
              Northeast India, comprised of the "Seven Sister States" and Sikkim, is a treasure trove of natural beauty, 
              diverse cultures, and unique experiences. From the snow-capped mountains of Arunachal Pradesh to the 
              living root bridges of Meghalaya, the region offers unparalleled adventures for all travelers.
            </p>
            <p className="text-gray-700">
              Rich in biodiversity, cultural heritage, and pristine landscapes, the Northeast 
              remains one of India's best-kept secrets, waiting to be explored with respect and wonder.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all">
              Explore Our Trips
            </button>
            <button className="bg-white border border-primary text-primary hover:bg-primary/10 font-medium py-3 px-6 rounded-lg transition-all">
              {isPlaying ? "Pause Video" : "Play Video"} 
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
