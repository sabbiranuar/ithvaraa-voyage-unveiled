
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Priya Sharma',
    role: 'Founder & Lead Guide',
    bio: 'Northeast native with 10+ years of guiding experience and a passion for sustainable tourism.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop'
  },
  {
    name: 'Rahul Tamang',
    role: 'Adventure Specialist',
    bio: 'Certified mountaineer and wilderness first responder with intimate knowledge of the Himalayan trails.',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200&h=200&auto=format&fit=crop'
  },
  {
    name: 'Mira Devi',
    role: 'Cultural Expert',
    bio: 'Anthropologist specializing in Northeast tribal traditions and cultural preservation initiatives.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop'
  },
  {
    name: 'Arjun Negi',
    role: 'Operations Manager',
    bio: 'Logistics wizard ensuring every Ithvaraa journey runs smoothly from start to finish.',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&h=200&auto=format&fit=crop'
  }
];

const TeamSection = () => {
  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary font-montserrat">Meet Our Team</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          The passionate experts who will guide your Northeast adventures.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow">
              <div className="overflow-hidden h-48">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center" 
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
                <p className="text-sm text-primary/70 mb-3">{member.role}</p>
                <p className="text-gray-700 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
