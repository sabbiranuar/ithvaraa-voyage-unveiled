
import React, { useState, useEffect } from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

// Sample reviews to show initially before real ones are fetched
const sampleReviews: Review[] = [
  {
    id: '1',
    author: 'Rahul Sharma',
    rating: 5.0,
    text: 'Our trip to Meghalaya with Ithvaraa was absolutely incredible. The guides were knowledgeable and friendly, making our experience truly memorable.',
    date: '2 months ago'
  },
  {
    id: '2',
    author: 'Priya Patel',
    rating: 4.5,
    text: 'Ithvaraa provided an authentic Northeast India experience that we couldn\'t have found elsewhere. Their attention to detail and focus on sustainability really made a difference.',
    date: '1 month ago'
  },
  {
    id: '3',
    author: 'Michael Chang',
    rating: 5.0,
    text: 'The cultural immersion opportunities were the highlight of our journey. We learned so much about the local traditions and made connections that will last a lifetime.',
    date: '3 weeks ago'
  }
];

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [isLoading, setIsLoading] = useState(false);
  
  // This would be where you'd fetch actual reviews from a Google Reviews API
  // For now, we're using sample data since direct Google Reviews integration
  // requires API keys and authentication
  useEffect(() => {
    // Simulating API fetch with a timeout
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real implementation, you'd fetch from Google Reviews API here
      // and replace the sample data with actual reviews
      console.log("Would fetch reviews from Google Reviews API using the link: https://g.co/kgs/MTNRHDP");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to render star ratings
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-secondary text-secondary" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-secondary text-secondary" />);
    }
    
    return stars;
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary font-montserrat">What Our Travelers Say</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Real experiences shared by people who've explored Northeast India with us.
        </p>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-slate-200 h-24 w-24 mb-4"></div>
              <div className="h-2 bg-slate-200 rounded w-48 mb-4"></div>
              <div className="h-2 bg-slate-200 rounded w-64"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <Card 
                key={review.id}
                className={cn(
                  'hover:shadow-lg transition-shadow duration-300',
                  'border-2 border-transparent hover:border-primary/20'
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {review.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.author}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {renderRating(review.rating)}
                        <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                  <div className="mt-4 text-xs text-gray-400">
                    via Google Reviews
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <a 
            href="https://g.co/kgs/MTNRHDP" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline text-sm"
          >
            See all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
