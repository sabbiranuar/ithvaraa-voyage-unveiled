
import React, { useState } from 'react';
import { Check, Shield, Map, Users, Trees, Globe, Sparkles, Pencil, Trash, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { LucideIcon } from 'lucide-react';

// Sample features data (would come from an API in a real implementation)
const initialFeatures = [
  {
    id: 'safety',
    title: 'Safety First',
    icon: Shield,
    shortDesc: 'Your wellbeing is our top priority',
    fullDesc: 'At Ithvaraa, safety comes before everything else. Our tours incorporate comprehensive safety protocols, emergency response plans, and guides trained in first aid.'
  },
  {
    id: 'guides',
    title: 'Expert Local Guides',
    icon: Map,
    shortDesc: 'Knowledge that brings destinations alive',
    fullDesc: 'Our guides are not just experts—they are locals who share their homeland with pride and passion. Each guide undergoes rigorous training in regional history, cultural sensitivities, and ecological knowledge.'
  },
  {
    id: 'community',
    title: 'Community Trips',
    icon: Users,
    shortDesc: 'Travel with like-minded adventurers',
    fullDesc: 'Traveling with Ithvaraa means becoming part of a community. Our group trips are carefully curated to bring together people with shared interests and complementary personalities.'
  },
  {
    id: 'responsible',
    title: 'Responsible Tourism',
    icon: Trees,
    shortDesc: 'Sustainable practices for a better future',
    fullDesc: 'Sustainability guides everything we do at Ithvaraa. We implement waste reduction programs, carbon offset initiatives, and support conservation projects throughout Northeast India.'
  },
  {
    id: 'cultural',
    title: 'Cultural Immersion',
    icon: Globe,
    shortDesc: 'Authentic experiences that respect traditions',
    fullDesc: 'We design experiences that go beyond surface-level tourism. Through home stays, community-led workshops, and participation in local festivals, our travelers gain genuine insight into Northeast India's diverse cultures.'
  },
  {
    id: 'unique',
    title: 'Unique Experiences',
    icon: Sparkles,
    shortDesc: 'Moments you won't find anywhere else',
    fullDesc: 'Ithvaraa specializes in creating moments of wonder and discovery. Whether it's a private traditional dance performance, a cooking session with a local family, or accessing restricted areas with special permissions.'
  }
];

// Map of icon names to components for the form
const iconOptions = {
  Shield,
  Map,
  Users,
  Trees,
  Globe,
  Sparkles,
  Check
};

type IconName = keyof typeof iconOptions;

interface FeatureFormData {
  id: string;
  title: string;
  iconName: IconName;
  shortDesc: string;
  fullDesc: string;
}

const FeaturesManager = () => {
  const [features, setFeatures] = useState(initialFeatures);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<FeatureFormData>({
    defaultValues: {
      id: '',
      title: '',
      iconName: 'Shield',
      shortDesc: '',
      fullDesc: ''
    }
  });

  const handleEdit = (feature: any) => {
    // Convert feature to form data format
    const featureFormData = {
      ...feature,
      iconName: Object.keys(iconOptions).find(
        key => iconOptions[key as IconName] === feature.icon
      ) as IconName
    };
    
    form.reset(featureFormData);
    setCurrentFeature(feature);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    form.reset({
      id: `feature-${Date.now()}`,
      title: '',
      iconName: 'Shield',
      shortDesc: '',
      fullDesc: ''
    });
    setCurrentFeature(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      setFeatures(features.filter(feature => feature.id !== id));
    }
  };

  const onSubmit = (data: FeatureFormData) => {
    const updatedFeature = {
      ...data,
      icon: iconOptions[data.iconName]
    };
    
    if (isEditing) {
      setFeatures(features.map(feature => 
        feature.id === data.id ? updatedFeature : feature
      ));
    } else {
      setFeatures([...features, updatedFeature]);
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Features</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Feature
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {features.map((feature) => {
          const FeatureIcon = feature.icon;
          return (
            <Card key={feature.id} className="border-2 border-transparent hover:border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FeatureIcon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{feature.shortDesc}</p>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{feature.fullDesc}</p>
                <div className="flex space-x-2 justify-end">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(feature)}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(feature.id)}>
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Feature' : 'Add New Feature'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Make changes to the existing feature.' 
                : 'Create a new feature to showcase on your website.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Feature title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="iconName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        {Object.keys(iconOptions).map((iconName) => (
                          <option key={iconName} value={iconName}>
                            {iconName}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="shortDesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fullDesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
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

export default FeaturesManager;
