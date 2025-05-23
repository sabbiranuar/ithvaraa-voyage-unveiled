
import React from 'react';
import { Users, Star, Image, MessageSquare, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DashboardOverview = () => {
  // Sample stats data
  const stats = [
    { title: 'Total Visitors', value: '12,543', icon: Users, change: '+12%', trend: 'up' },
    { title: 'Reviews', value: '148', icon: Star, change: '+5%', trend: 'up' },
    { title: 'Gallery Images', value: '74', icon: Image, change: '0%', trend: 'neutral' },
    { title: 'Contact Inquiries', value: '32', icon: MessageSquare, change: '-3%', trend: 'down' },
  ];

  const recentInquiries = [
    { title: 'Trip to Meghalaya', email: 'john.doe@example.com', time: 'Today' },
    { title: 'Wildlife Tour Package', email: 'sarah.miller@example.com', time: 'Yesterday' },
    { title: 'Cultural Experience', email: 'raj.patel@example.com', time: '3 days ago' },
  ];

  const upcomingTours = [
    { name: 'Kaziranga Wildlife Tour', guests: '12 guests', date: 'Jun 15, 2025' },
    { name: 'Majuli Island Cultural Experience', guests: '8 guests', date: 'Jul 02, 2025' },
    { name: 'Tawang Monastery Trek', guests: '6 guests', date: 'Jul 18, 2025' },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="bg-primary/10 p-2 rounded-md">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`flex items-center text-xs mt-1 ${
                stat.trend === 'up' ? 'text-green-500' : 
                stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : 
                 stat.trend === 'down' ? <TrendingUp className="h-3 w-3 mr-1 rotate-180" /> : 
                 <span className="h-3 w-3 mr-1">-</span>}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>Latest customer inquiries</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentInquiries.map((inquiry, i) => (
                <div key={i} className="flex items-start gap-4 p-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{inquiry.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {inquiry.email}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {inquiry.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View All Inquiries <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Upcoming Tours</CardTitle>
            <CardDescription>Your scheduled tours</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {upcomingTours.map((tour, i) => (
                <div key={i} className="flex items-start gap-4 p-4">
                  <div className="bg-secondary/10 rounded-full p-2">
                    <Calendar className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{tour.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {tour.guests}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tour.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View Calendar <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
