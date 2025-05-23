import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Upload, Trash } from 'lucide-react';

// Define the types for gallery items and categories
type GalleryItem = {
  id: string;
  url: string;
  category: CategoryType;
};

type CategoryType = 'landscapes' | 'culture' | 'wildlife' | 'other';

const GalleryManager = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('landscapes');

  useEffect(() => {
    // Load gallery items from local storage on component mount
    const storedGalleryItems = localStorage.getItem('galleryItems');
    if (storedGalleryItems) {
      setGalleryItems(JSON.parse(storedGalleryItems));
    }
  }, []);

  useEffect(() => {
    // Save gallery items to local storage whenever they change
    localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
  }, [galleryItems]);

  const handleAddImage = () => {
    if (newImageUrl.trim() !== '') {
      const newItem: GalleryItem = {
        id: `img-${Date.now()}`,
        url: newImageUrl,
        category: selectedCategory,
      };
      setGalleryItems([...galleryItems, newItem]);
      setNewImageUrl('');
    }
  };

  const handleDeleteImage = (id: string) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as CategoryType);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic file type validation
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }

      // Basic file size validation (adjust as needed)
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('Image size exceeds 5MB. Please upload a smaller image.');
        return;
      }

      // Use FileReader to convert the image to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setNewImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-10 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Gallery Manager</h1>

      {/* Add Image Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Image</CardTitle>
          <CardDescription>Upload or enter a URL for a new gallery image.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-x-4 sm:space-y-0">
            <Label htmlFor="newImageUrl" className="text-right sm:w-1/4">
              Image URL:
            </Label>
            <Input
              type="text"
              id="newImageUrl"
              placeholder="Enter image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="flex-grow"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-x-4 sm:space-y-0">
            <Label htmlFor="imageUpload" className="text-right sm:w-1/4">
              Upload Image:
            </Label>
            <div className="flex-grow">
              <Input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Label htmlFor="imageUpload" className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold py-2 px-4 rounded inline-flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                <span>Upload Image</span>
              </Label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-x-4 sm:space-y-0">
            <Label htmlFor="category" className="text-right sm:w-1/4">
              Category:
            </Label>
            <Select onValueChange={(value) => setSelectedCategory(value as CategoryType)}>
              <SelectTrigger className="w-full sm:w-auto">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="landscapes">Landscapes</SelectItem>
                <SelectItem value="culture">Culture</SelectItem>
                <SelectItem value="wildlife">Wildlife</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleAddImage} className="ml-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </CardContent>
      </Card>

      {/* Gallery Items Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>Image</CardTitle>
              <CardDescription>Category: {item.category}</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <img src={item.url} alt={`Gallery item ${item.id}`} className="w-full h-48 object-cover rounded-md mb-4" />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteImage(item.id)}
                className="absolute top-2 right-2"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
