
import React, { useEffect } from 'react';
import MonthlyOverview from '@/components/MonthlyOverview';
import MoodSummary from '@/components/MoodSummary';
import MoodTrends from '@/components/MoodTrends';
import RecentJournals from '@/components/RecentJournals';
import EventTimeline from '@/components/EventTimeline';
import ActivityChart from '@/components/ActivityChart';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';

const Dashboard = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  
  useEffect(() => {
    // Welcome toast on first load
    toast({
      title: "Welcome to Reflect",
      description: "Your personal monthly reflection dashboard",
    });
  }, []);
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-3xl font-bold sm:text-4xl mb-2 gradient-text">Your Monthly Reflection</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Track your moods, journal entries, and important events in one place.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <MonthlyOverview />
        </div>
        <div>
          <MoodSummary />
        </div>
      </div>
      
      <div className="mt-6">
        <MoodTrends />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentJournals />
        <div className="space-y-6">
          <EventTimeline />
          <ActivityChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
