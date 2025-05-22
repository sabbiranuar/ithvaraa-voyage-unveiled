
import React, { useState } from 'react';
import { UserPlus, Pencil, Trash, Briefcase } from 'lucide-react';
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

// Sample team members data
const initialTeamMembers = [
  {
    id: '1',
    name: 'Nandita Sharma',
    role: 'Founder & CEO',
    bio: 'Born and raised in Assam, Nandita founded Ithvaraa with a passion for showcasing the authentic beauty of Northeast India to the world.',
    image: '/lovable-uploads/b00b2374-2a70-4421-9636-48f3a5ee28f2.png'
  },
  {
    id: '2',
    name: 'Rajiv Kaushal',
    role: 'Head Guide',
    bio: 'With over 15 years of experience leading tours throughout the Northeast, Rajiv brings unparalleled expertise and local knowledge to our expeditions.',
    image: '/lovable-uploads/3e27ee63-921f-4a24-a5a7-e7c7af35c671.png'
  },
  {
    id: '3',
    name: 'Mei Lin',
    role: 'Sustainability Director',
    bio: 'Mei ensures that all our tours adhere to the highest standards of environmental responsibility and community benefit.',
    image: '/lovable-uploads/e8a80ada-a580-4e5b-b5ef-4edbfb0f3c87.png'
  },
  {
    id: '4',
    name: 'Arjun Thapa',
    role: 'Cultural Experience Designer',
    bio: 'Arjun works with local communities to develop authentic cultural exchanges that honor traditions while creating memorable experiences.',
    image: '/lovable-uploads/1f086aa2-ec1c-4b2d-af23-7452c3a6bfa8.png'
  }
];

interface TeamMemberFormData {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TeamManager = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const form = useForm<TeamMemberFormData>({
    defaultValues: {
      id: '',
      name: '',
      role: '',
      bio: '',
      image: ''
    }
  });

  const handleEdit = (member: TeamMemberFormData) => {
    form.reset(member);
    setUploadPreview(member.image);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    form.reset({
      id: `member-${Date.now()}`,
      name: '',
      role: '',
      bio: '',
      image: ''
    });
    setUploadPreview(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

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

  const onSubmit = (data: TeamMemberFormData) => {
    const updatedMember = {
      ...data,
      image: uploadPreview || data.image
    };
    
    if (isEditing) {
      setTeamMembers(teamMembers.map(member => 
        member.id === data.id ? updatedMember : member
      ));
    } else {
      setTeamMembers([...teamMembers, updatedMember]);
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Team</h2>
        <Button onClick={handleAdd}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-xl font-semibold">{member.name}</h3>
                <div className="flex items-center text-white/80 text-sm">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {member.role}
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{member.bio}</p>
              <div className="flex space-x-2 justify-end">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(member)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(member.id)}>
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
            <DialogTitle>{isEditing ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Make changes to the existing team member profile.' 
                : 'Add a new member to your team.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-4">
                <div className="flex justify-center">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-gray-200">
                    {uploadPreview ? (
                      <img 
                        src={uploadPreview} 
                        alt="Profile preview" 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <label 
                      className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity"
                      htmlFor="profile-upload"
                    >
                      <span className="text-white text-xs font-medium">Change Photo</span>
                    </label>
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Team member name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Position or title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Short biography" 
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

export default TeamManager;
