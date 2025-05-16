
import React from 'react';
import { Card } from '@/components/ui/card';

const galleryImages = [
  {
    src: '/lovable-uploads/e8a80ada-a580-4e5b-b5ef-4edbfb0f3c87.png',
    alt: 'Travelers at a colorful temple',
    category: 'Cultural'
  },
  {
    src: '/lovable-uploads/b00b2374-2a70-4421-9636-48f3a5ee28f2.png',
    alt: 'Mountain lake landscape',
    category: 'Nature'
  },
  {
    src: '/lovable-uploads/babf56fb-0a01-4866-9818-371466a3f16a.png',
    alt: 'Cave exploration experience',
    category: 'Adventure'
  },
  {
    src: '/lovable-uploads/a92c073a-0fb3-4cf8-ba80-a8f0f384a516.png',
    alt: 'Waterfall experience with group',
    category: 'Adventure'
  },
  {
    src: '/lovable-uploads/3e27ee63-921f-4a24-a5a7-e7c7af35c671.png',
    alt: 'Group by a stream in the forest',
    category: 'Community'
  },
  {
    src: '/lovable-uploads/a8fb0844-d310-4e71-afda-3c38eae3d719.png',
    alt: 'Tourist at Bumla high altitude destination',
    category: 'Destinations'
  },
  {
    src: '/lovable-uploads/1f086aa2-ec1c-4b2d-af23-7452c3a6bfa8.png',
    alt: 'Group on a boat in a gorge',
    category: 'Adventure'
  }
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary font-montserrat">Adventure Gallery</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Glimpses of the unforgettable experiences that await you in the Northeast with Ithvaraa.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card key={index} className="overflow-hidden group">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-white text-sm font-medium px-3 py-1 bg-primary/80 rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
