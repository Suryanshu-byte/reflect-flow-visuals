
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood?: 'happy' | 'neutral' | 'sad' | 'angry';
}

const RecentJournals = () => {
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const recentEntries: JournalEntry[] = [
    {
      id: '1',
      date: new Date(2025, 3, 7),
      title: 'Productive day working on the project',
      content: 'Today I managed to implement the core features of the project. The team was very supportive and we made significant progress.',
      mood: 'happy'
    },
    {
      id: '2',
      date: new Date(2025, 3, 5),
      title: 'Reflections on the team meeting',
      content: 'The team meeting was quite challenging today. We had differing opinions on the direction of the project.',
      mood: 'neutral'
    },
    {
      id: '3',
      date: new Date(2025, 3, 2),
      title: 'Weekend getaway thoughts',
      content: 'Spent the weekend in nature, which gave me time to think about life goals and future plans.',
      mood: 'happy'
    }
  ];
  
  const getMoodColor = (mood?: string) => {
    switch(mood) {
      case 'happy': return 'bg-green-400';
      case 'neutral': return 'bg-blue-400';
      case 'sad': return 'bg-purple-400';
      case 'angry': return 'bg-red-400';
      default: return 'bg-gray-300';
    }
  };
  
  return (
    <Card className="w-full glass-card animate-scale-in" style={{ animationDelay: '200ms' }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Recent Journal Entries</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => navigate('/journal')}>
            <MessageSquare className="h-4 w-4" />
            <span>All Entries</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentEntries.map(entry => (
          <div 
            key={entry.id} 
            className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/journal/${entry.id}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <h3 className="font-medium text-gray-900">{entry.title}</h3>
                <p className="text-sm text-gray-500">{format(entry.date, 'MMMM d, yyyy')}</p>
              </div>
              {entry.mood && (
                <div className={`h-3 w-3 rounded-full ${getMoodColor(entry.mood)}`} />
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{entry.content}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full" onClick={() => navigate('/journal/new')}>
          Create New Entry
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentJournals;
