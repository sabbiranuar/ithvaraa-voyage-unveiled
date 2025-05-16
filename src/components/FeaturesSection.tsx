
import React, { useState } from 'react';
import { Check, Shield, Map, Users, Trees, Globe, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const features = [
  {
    id: 'safety',
    title: 'Safety First',
    icon: Shield,
    shortDesc: 'Your wellbeing is our top priority',
    fullDesc: 'At Ithvaraa, safety comes before everything else. Our tours incorporate comprehensive safety protocols, emergency response plans, and guides trained in first aid. We maintain well-inspected equipment, carefully vetted accommodations, and constant communication with local authorities to ensure you can enjoy your adventure with complete peace of mind.'
  },
  {
    id: 'guides',
    title: 'Expert Local Guides',
    icon: Map,
    shortDesc: 'Knowledge that brings destinations alive',
    fullDesc: 'Our guides are not just experts—they\'re locals who share their homeland with pride and passion. Each guide undergoes rigorous training in regional history, cultural sensitivities, and ecological knowledge. With Ithvaraa guides, you\'ll discover hidden gems, hear authentic stories, and gain insights that no guidebook can provide—transforming your journey into a meaningful exploration.'
  },
  {
    id: 'community',
    title: 'Community Trips',
    icon: Users,
    shortDesc: 'Travel with like-minded adventurers',
    fullDesc: 'Traveling with Ithvaraa means becoming part of a community. Our group trips are carefully curated to bring together people with shared interests and complementary personalities. Small group sizes ensure personal attention while fostering meaningful connections. Many travelers begin as strangers and leave as friends for life, planning future adventures together through our alumni network.'
  },
  {
    id: 'responsible',
    title: 'Responsible Tourism',
    icon: Trees,
    shortDesc: 'Sustainable practices for a better future',
    fullDesc: 'Sustainability guides everything we do at Ithvaraa. We implement waste reduction programs, carbon offset initiatives, and support conservation projects throughout Northeast India. We partner exclusively with locally-owned businesses, employ regional staff, and ensure fair wages throughout our supply chain. By choosing us, you\'re contributing to preserving these pristine destinations for generations to come.'
  },
  {
    id: 'cultural',
    title: 'Cultural Immersion',
    icon: Globe,
    shortDesc: 'Authentic experiences that respect traditions',
    fullDesc: 'We design experiences that go beyond surface-level tourism. Through home stays, community-led workshops, and participation in local festivals, our travelers gain genuine insight into Northeast India\'s diverse cultures. We collaborate with indigenous knowledge keepers and community elders to ensure cultural exchanges are respectful, educational, and mutually beneficial for both visitors and hosts.'
  },
  {
    id: 'unique',
    title: 'Unique Experiences',
    icon: Sparkles,
    shortDesc: 'Moments you won\'t find anywhere else',
    fullDesc: 'Ithvaraa specializes in creating moments of wonder and discovery. Whether it\'s a private traditional dance performance, a cooking session with a local family, or accessing restricted areas with special permissions, we craft unexpected experiences that become the highlights of your journey. Our team constantly explores new routes and develops exclusive partnerships to ensure our offerings remain truly one-of-a-kind.'
  }
];

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  const handleFeatureClick = (id: string) => {
    setActiveFeature(id);
  };

  const activeFeatureData = features.find(feature => feature.id === activeFeature);

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary font-montserrat">Why Travel with Ithvaraa?</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We're not just another travel company - we're your gateway to authentic Northeast Indian experiences.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className={cn(
                'feature-card border-2 text-center cursor-pointer h-full',
                activeFeature === feature.id ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/30'
              )}
              onClick={() => handleFeatureClick(feature.id)}
            >
              <CardHeader className="py-6">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <CardDescription>{feature.shortDesc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {activeFeatureData && (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <activeFeatureData.icon className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-semibold">{activeFeatureData.title}</h3>
            </div>
            <p className="text-gray-700">{activeFeatureData.fullDesc}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
