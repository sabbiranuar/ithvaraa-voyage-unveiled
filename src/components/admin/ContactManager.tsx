
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

// Sample contact inquiries data
const initialInquiries = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 555-123-4567',
    message: 'Interested in the 7-day Meghalaya tour package. Can you provide more details about accommodation options?',
    status: 'new',
    date: '2025-05-20'
  },
  {
    id: '2',
    name: 'Priya Mehta',
    email: 'priya.m@example.com',
    phone: '+91 98765 43210',
    message: 'Looking for a customized tour for a group of 6 people to Arunachal Pradesh in August. We're particularly interested in cultural experiences.',
    status: 'inProgress',
    date: '2025-05-18'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'mjohnson@example.com',
    phone: '+44 7700 900123',
    message: 'Hello, we would like information about wildlife tours in Kaziranga. What's the best time to visit and how long is the recommended stay?',
    status: 'completed',
    date: '2025-05-15'
  },
  {
    id: '4',
    name: 'Li Wei',
    email: 'liwei@example.com',
    phone: '+86 131 2345 6789',
    message: 'I'm a solo traveler interested in your community trips. Do you have any scheduled departures in September that I could join?',
    status: 'new',
    date: '2025-05-21'
  },
  {
    id: '5',
    name: 'Sophie Dupont',
    email: 'sophie.d@example.com',
    phone: '+33 6 12 34 56 78',
    message: 'Bonjour! My husband and I are celebrating our anniversary and would love to explore Northeast India. Could you recommend a romantic 10-day itinerary?',
    status: 'inProgress',
    date: '2025-05-17'
  }
];

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'inProgress' | 'completed';
  date: string;
}

const ContactManager = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsViewDialogOpen(true);
  };

  const handleStatusChange = (inquiryId: string, newStatus: 'new' | 'inProgress' | 'completed') => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
    ));
    
    if (selectedInquiry && selectedInquiry.id === inquiryId) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleRowSelection = (inquiryId: string) => {
    setSelectedRows(prev => {
      if (prev.includes(inquiryId)) {
        return prev.filter(id => id !== inquiryId);
      } else {
        return [...prev, inquiryId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredInquiries.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredInquiries.map(inquiry => inquiry.id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} selected inquiries?`)) {
      setInquiries(inquiries.filter(inquiry => !selectedRows.includes(inquiry.id)));
      setSelectedRows([]);
    }
  };

  const filteredInquiries = statusFilter === 'all' 
    ? inquiries 
    : inquiries.filter(inquiry => inquiry.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500">New</Badge>;
      case 'inProgress':
        return <Badge className="bg-amber-500">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'inProgress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Contact Inquiries</h2>
        <div className="flex space-x-2">
          <select
            className="px-3 py-2 border rounded-md text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          {selectedRows.length > 0 && (
            <Button 
              variant="destructive" 
              onClick={handleBulkDelete}
            >
              Delete Selected ({selectedRows.length})
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Contact Inquiries</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox 
                    checked={filteredInquiries.length > 0 && selectedRows.length === filteredInquiries.length} 
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No inquiries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedRows.includes(inquiry.id)} 
                        onCheckedChange={() => handleRowSelection(inquiry.id)}
                        aria-label={`Select ${inquiry.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{inquiry.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" />
                        {inquiry.email}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(inquiry.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {getStatusBadge(inquiry.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewInquiry(inquiry)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedInquiry && (
            <>
              <DialogHeader>
                <DialogTitle>Inquiry from {selectedInquiry.name}</DialogTitle>
                <DialogDescription>
                  Received on {new Date(selectedInquiry.date).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Contact Info</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {selectedInquiry.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        {selectedInquiry.phone}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Status</h4>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedInquiry.status)}
                      <span>{getStatusBadge(selectedInquiry.status)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Message</h4>
                  <div className="p-3 bg-muted rounded-md text-sm">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant={selectedInquiry.status === 'new' ? 'default' : 'outline'}
                    onClick={() => handleStatusChange(selectedInquiry.id, 'new')}
                  >
                    Mark as New
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedInquiry.status === 'inProgress' ? 'default' : 'outline'}
                    onClick={() => handleStatusChange(selectedInquiry.id, 'inProgress')}
                  >
                    Mark In Progress
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedInquiry.status === 'completed' ? 'default' : 'outline'}
                    onClick={() => handleStatusChange(selectedInquiry.id, 'completed')}
                  >
                    Mark Completed
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactManager;
