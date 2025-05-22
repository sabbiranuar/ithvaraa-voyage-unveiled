
import React, { useState } from 'react';
import { Star, StarHalf, Pencil, Trash, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

// Sample reviews data
const initialReviews = [
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

interface ReviewFormData {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const TestimonialsManager = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<ReviewFormData>({
    defaultValues: {
      id: '',
      author: '',
      rating: 5.0,
      text: '',
      date: ''
    }
  });

  const handleEdit = (review: ReviewFormData) => {
    form.reset(review);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    form.reset({
      id: `review-${Date.now()}`,
      author: '',
      rating: 5.0,
      text: '',
      date: 'Just now'
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  const onSubmit = (data: ReviewFormData) => {
    if (isEditing) {
      setReviews(reviews.map(review => 
        review.id === data.id ? data : review
      ));
    } else {
      setReviews([...reviews, data]);
    }
    
    setIsDialogOpen(false);
  };

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
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Testimonials</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Review
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
              <p className="text-gray-600 mb-4">{review.text}</p>
              <div className="flex space-x-2 justify-end">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(review)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(review.id)}>
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Review' : 'Add New Review'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Make changes to the existing review.' 
                : 'Add a new customer review to display on your website.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      >
                        <option value="5">5.0 Stars</option>
                        <option value="4.5">4.5 Stars</option>
                        <option value="4">4.0 Stars</option>
                        <option value="3.5">3.5 Stars</option>
                        <option value="3">3.0 Stars</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review Text</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Customer review" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2 months ago" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsManager;
