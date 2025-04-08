
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';

interface Event {
  id: string;
  date: Date;
  title: string;
  category: 'work' | 'personal' | 'health' | 'other';
}

const EventTimeline = () => {
  // Mock data for demonstration
  const events: Event[] = [
    {
      id: '1',
      date: new Date(2025, 3, 10),
      title: 'Project Deadline',
      category: 'work'
    },
    {
      id: '2',
      date: new Date(2025, 3, 7),
      title: 'Evening Yoga Session',
      category: 'health'
    },
    {
      id: '3',
      date: new Date(2025, 3, 5),
      title: 'Coffee with Alex',
      category: 'personal'
    },
    {
      id: '4',
      date: new Date(2025, 3, 2),
      title: 'Dental Appointment',
      category: 'health'
    },
    {
      id: '5',
      date: new Date(2025, 3, 1),
      title: 'Monthly Team Meeting',
      category: 'work'
    }
  ];
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'work': return 'bg-blue-500';
      case 'personal': return 'bg-purple-500';
      case 'health': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <Card className="w-full glass-card animate-scale-in" style={{ animationDelay: '300ms' }}>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 ml-0.5"></div>
          
          <div className="space-y-5">
            {events.map((event, index) => (
              <div key={event.id} className="ml-10 relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Timeline dot */}
                <div className={`absolute -left-10 mt-1.5 h-4 w-4 rounded-full border-2 border-white ${getCategoryColor(event.category)}`}></div>
                
                {/* Event card */}
                <div className="flex flex-col p-3 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(event.category)} text-white`}>
                      {event.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{format(event.date, 'MMMM d, yyyy')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventTimeline;
