
import React from 'react';
import { Users, Star, Image, MessageSquare, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardOverview = () => {
  // Sample stats data
  const stats = [
    { title: 'Total Visitors', value: '12,543', icon: Users, change: '+12%', trend: 'up' },
    { title: 'Reviews', value: '148', icon: Star, change: '+5%', trend: 'up' },
    { title: 'Gallery Images', value: '74', icon: Image, change: '0%', trend: 'neutral' },
    { title: 'Contact Inquiries', value: '32', icon: MessageSquare, change: '-3%', trend: 'down' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
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
          <CardHeader>
            <CardTitle className="text-lg">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="bg-primary/10 rounded-full p-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Trip to Meghalaya</h4>
                    <p className="text-sm text-muted-foreground">
                      From: {`john.doe${i}@example.com`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {i === 0 ? 'Today' : i === 1 ? 'Yesterday' : '3 days ago'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="bg-secondary/10 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{
                      i === 0 ? 'Kaziranga Wildlife Tour' : 
                      i === 1 ? 'Majuli Island Cultural Experience' : 
                      'Tawang Monastery Trek'
                    }</h4>
                    <p className="text-sm text-muted-foreground">
                      {i === 0 ? '12 guests' : i === 1 ? '8 guests' : '6 guests'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {i === 0 ? 'Jun 15, 2025' : i === 1 ? 'Jul 02, 2025' : 'Jul 18, 2025'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
