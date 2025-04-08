
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MessageSquare, Plus } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood?: 'happy' | 'neutral' | 'sad' | 'angry';
}

const Journal = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for demonstration
  const journalEntries: JournalEntry[] = [
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
    },
    {
      id: '4',
      date: new Date(2025, 2, 28),
      title: 'Feeling stressed about deadlines',
      content: 'Multiple projects are due at the same time and I\'m feeling overwhelmed by the workload.',
      mood: 'sad'
    },
    {
      id: '5',
      date: new Date(2025, 2, 25),
      title: 'Frustrated with technical issues',
      content: 'Spent the entire day debugging an issue that turned out to be a simple configuration problem.',
      mood: 'angry'
    },
    {
      id: '6',
      date: new Date(2025, 2, 20),
      title: 'Birthday reflections',
      content: 'Another year older, time to reflect on accomplishments and set new goals for the year ahead.',
      mood: 'neutral'
    }
  ];
  
  const filteredEntries = journalEntries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 gradient-text">Journal Entries</h2>
          <p className="text-lg text-gray-600">Capture your thoughts, feelings, and experiences.</p>
        </div>
        <Button 
          className="flex items-center gap-2" 
          onClick={() => navigate('/journal/new')}
        >
          <Plus className="h-4 w-4" />
          <span>New Entry</span>
        </Button>
      </div>
      
      <div className="mb-6 animate-scale-in">
        <Input
          type="text"
          placeholder="Search journal entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="list" className="animate-fade-in">
        <TabsList className="mb-6">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>List View</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Calendar View</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry, index) => (
              <Card 
                key={entry.id} 
                className="overflow-hidden glass-card cursor-pointer hover:shadow-md transition-shadow animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => navigate(`/journal/${entry.id}`)}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className={`sm:w-16 ${getMoodColor(entry.mood)} p-4 flex items-center justify-center`}>
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold">{format(entry.date, 'd')}</div>
                        <div className="text-xs">{format(entry.date, 'MMM')}</div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 flex-1">
                      <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
                      <p className="text-gray-600 line-clamp-2">{entry.content}</p>
                      <div className="mt-3 text-xs text-gray-500">{format(entry.date, 'EEEE, MMMM d, yyyy')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No journal entries found.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card className="glass-card">
            <CardContent className="p-6">
              <p className="text-center text-gray-500">Calendar view is under development. Coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Journal;
