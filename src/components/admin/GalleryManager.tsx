
import React, { useState } from 'react';
import { Image, Upload, Trash, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// Sample gallery images
const initialGalleryItems = [
  {
    id: '1',
    src: '/lovable-uploads/babf56fb-0a01-4866-9818-371466a3f16a.png',
    alt: 'Scenic mountain view in Meghalaya',
    category: 'Landscapes'
  },
  {
    id: '2',
    src: '/lovable-uploads/a8fb0844-d310-4e71-afda-3c38eae3d719.png',
    alt: 'Traditional tribal dance performance',
    category: 'Culture'
  },
  {
    id: '3',
    src: '/lovable-uploads/84eed264-6c40-4c6b-8298-4e5a56cfb8bf.png',
    alt: 'Local cuisine of Northeast India',
    category: 'Food'
  },
  {
    id: '4',
    src: '/lovable-uploads/1f086aa2-ec1c-4b2d-af23-7452c3a6bfa8.png',
    alt: 'Adventure activity in the mountains',
    category: 'Activities'
  },
  {
    id: '5',
    src: '/lovable-uploads/a92c073a-0fb3-4cf8-ba80-a8f0f384a516.png',
    alt: 'Riverside camping in Arunachal Pradesh',
    category: 'Accommodation'
  },
  {
    id: '6',
    src: '/lovable-uploads/e8a80ada-a580-4e5b-b5ef-4edbfb0f3c87.png',
    alt: 'Wildlife encounter in Kaziranga',
    category: 'Wildlife'
  }
];

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

const GalleryManager = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryItems);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [newItemData, setNewItemData] = useState({
    alt: '',
    category: 'Landscapes'
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItemData({
      ...newItemData,
      [name]: value
    });
  };

  const handleUpload = () => {
    if (uploadPreview) {
      setIsUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        const newItem: GalleryItem = {
          id: `gallery-${Date.now()}`,
          src: uploadPreview,
          alt: newItemData.alt || 'Gallery image',
          category: newItemData.category
        };
        
        setGalleryItems([...galleryItems, newItem]);
        setUploadPreview(null);
        setNewItemData({
          alt: '',
          category: 'Landscapes'
        });
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setGalleryItems(galleryItems.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Gallery</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="image-upload" className="block mb-2">Upload New Image</Label>
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer",
                  uploadPreview ? "border-primary/50" : "border-gray-300"
                )}
              >
                {uploadPreview ? (
                  <div className="space-y-4">
                    <img 
                      src={uploadPreview} 
                      alt="Upload preview" 
                      className="max-h-48 mx-auto object-contain" 
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setUploadPreview(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <label 
                    htmlFor="image-upload" 
                    className="flex flex-col items-center justify-center h-48 cursor-pointer"
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="alt-text" className="block mb-2">Alt Text</Label>
                <Input
                  id="alt-text"
                  name="alt"
                  placeholder="Describe the image for accessibility"
                  value={newItemData.alt}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="category" className="block mb-2">Category</Label>
                <select
                  id="category"
                  name="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newItemData.category}
                  onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                >
                  <option value="Landscapes">Landscapes</option>
                  <option value="Culture">Culture</option>
                  <option value="Food">Food</option>
                  <option value="Activities">Activities</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Wildlife">Wildlife</option>
                </select>
              </div>

              <Button 
                className="w-full mt-4" 
                disabled={!uploadPreview || isUploading}
                onClick={handleUpload}
              >
                {isUploading ? "Uploading..." : "Add to Gallery"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold mt-8">Gallery Images</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <div key={item.id} className="group relative">
            <img 
              src={item.src} 
              alt={item.alt} 
              className="w-full h-40 object-cover rounded-md" 
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex flex-col justify-between p-3">
              <div>
                <span className="text-xs text-white/80 bg-primary/80 px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="text-white text-sm line-clamp-2 mb-2">
                {item.alt}
              </div>
              <Button 
                size="sm" 
                variant="destructive"
                className="w-full"
                onClick={() => handleDelete(item.id)}
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
