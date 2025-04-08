
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isSameDay, isWithinInterval } from 'date-fns';
import MoodSelector from './MoodSelector';
import { Button } from '@/components/ui/button';

type MoodType = 'happy' | 'neutral' | 'sad' | 'angry' | undefined;

interface DayData {
  date: Date;
  mood?: MoodType;
  hasJournal: boolean;
  hasEvent: boolean;
}

const MonthlyOverview = () => {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 3, 1)); // April 2025
  const [moodDialogOpen, setMoodDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [userMoods, setUserMoods] = useState<{date: string, mood: MoodType}[]>([]);
  
  // Effect to load saved moods from localStorage
  useEffect(() => {
    const savedMoods = localStorage.getItem('userMoods');
    if (savedMoods) {
      setUserMoods(JSON.parse(savedMoods));
    }
  }, []);

  // Effect to save moods to localStorage when changed
  useEffect(() => {
    if (userMoods.length) {
      localStorage.setItem('userMoods', JSON.stringify(userMoods));
    }
  }, [userMoods]);

  // Generate month data with user moods
  const generateMonthData = (date: Date): DayData[] => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    return days.map(day => {
      // Find user mood for this day
      const dateStr = format(day, 'yyyy-MM-dd');
      const savedMood = userMoods.find(m => m.date === dateStr);
      
      // Only allow mood recording for March and April 2025
      const allowMoodRecording = isWithinInterval(day, {
        start: new Date(2025, 2, 1), // March 1, 2025
        end: new Date(2025, 4, 0)    // April 30, 2025
      });
      
      return {
        date: day,
        mood: savedMood?.mood,
        hasJournal: Math.random() > 0.6,
        hasEvent: Math.random() > 0.7,
        allowMoodRecording
      };
    });
  };
  
  const monthData = React.useMemo(() => generateMonthData(currentMonth), [currentMonth, userMoods]);
  
  const handleDayClick = (day: DayData) => {
    const isAllowedMonth = isWithinInterval(day.date, {
      start: new Date(2025, 2, 1), // March 1, 2025
      end: new Date(2025, 4, 0)    // April 30, 2025
    });
    
    if (isAllowedMonth) {
      setSelectedDate(day.date);
      setMoodDialogOpen(true);
    } else {
      toast({
        title: format(day.date, 'MMMM d, yyyy'),
        description: "Mood recording is only available for March and April 2025.",
      });
    }
  };
  
  const handleSaveMood = (date: Date, mood: MoodType) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    
    setUserMoods(prev => {
      const existing = prev.findIndex(m => m.date === dateStr);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { date: dateStr, mood };
        return updated;
      }
      return [...prev, { date: dateStr, mood }];
    });
    
    toast({
      title: "Mood recorded",
      description: `${format(date, 'MMMM d')}: ${mood.charAt(0).toUpperCase() + mood.slice(1)}`,
    });
  };
  
  const getCurrentMood = (date: Date): MoodType => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const saved = userMoods.find(m => m.date === dateStr);
    return saved?.mood;
  };
  
  // Calendar rendering logic
  const getDayClass = (day: DayData) => {
    let classes = "aspect-square flex flex-col items-center justify-center rounded-md p-2 transition-all hover:scale-105 cursor-pointer ";
    
    // Check if this day is within allowed months (March and April 2025)
    const isAllowedMonth = isWithinInterval(day.date, {
      start: new Date(2025, 2, 1), // March 1, 2025
      end: new Date(2025, 4, 0)    // April 30, 2025
    });
    
    // Add mood-specific styling
    if (day.mood) {
      classes += `mood-${day.mood} text-white `;
    } else if (isAllowedMonth) {
      classes += "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 ";
    } else {
      classes += "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 opacity-60 ";
    }
    
    // Indicators for journal and events
    if (day.hasJournal || day.hasEvent) {
      classes += "relative ";
    }
    
    return classes;
  };
  
  const renderWeekdays = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((day, index) => (
          <div key={index} className="text-xs font-medium text-center text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>
    );
  };
  
  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const startDay = getDay(monthStart);
    
    const blanks = Array(startDay).fill(null);
    const calendarCells = [...blanks, ...monthData];
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {calendarCells.map((day, index) => (
          <div key={index}>
            {day ? (
              <div
                className={getDayClass(day)}
                onClick={() => handleDayClick(day)}
              >
                <span className="text-sm font-medium">{format(day.date, 'd')}</span>
                <div className="flex gap-0.5 mt-1">
                  {day.hasJournal && (
                    <div className="h-1 w-1 bg-white rounded-full animate-pulse-soft"></div>
                  )}
                  {day.hasEvent && (
                    <div className="h-1 w-1 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
                  )}
                </div>
              </div>
            ) : (
              <div className="aspect-square"></div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const prevMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      
      // Only allow navigation between March and April 2025
      if (newDate.getMonth() < 2 && newDate.getFullYear() === 2025) {
        return new Date(2025, 2, 1); // March 1, 2025
      }
      
      return newDate;
    });
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      
      // Only allow navigation between March and April 2025
      if (newDate.getMonth() > 3 && newDate.getFullYear() === 2025) {
        return new Date(2025, 3, 30); // April 30, 2025
      }
      
      return newDate;
    });
  };

  const goToMarch = () => {
    setCurrentMonth(new Date(2025, 2, 1)); // March 1, 2025
  };
  
  const goToApril = () => {
    setCurrentMonth(new Date(2025, 3, 1)); // April 1, 2025
  };

  return (
    <>
      <Card className="w-full overflow-hidden glass-card animate-scale-in">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Monthly Overview</CardTitle>
            <div className="flex items-center space-x-2">
              <button 
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <CardDescription className="text-sm font-medium">
                {format(currentMonth, 'MMMM yyyy')}
              </CardDescription>
              <button 
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mt-2">
            <Button 
              variant={isSameMonth(currentMonth, new Date(2025, 2, 1)) ? "default" : "outline"} 
              size="sm" 
              onClick={goToMarch}
            >
              March 2025
            </Button>
            <Button 
              variant={isSameMonth(currentMonth, new Date(2025, 3, 1)) ? "default" : "outline"} 
              size="sm" 
              onClick={goToApril}
            >
              April 2025
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {renderWeekdays()}
          {renderCalendar()}
          
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full mood-happy"></div>
              <span>Happy</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full mood-neutral"></div>
              <span>Neutral</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full mood-sad"></div>
              <span>Sad</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full mood-angry"></div>
              <span>Angry</span>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Click on any day in March or April 2025 to record your mood
          </div>
        </CardContent>
      </Card>
      
      {selectedDate && (
        <MoodSelector
          open={moodDialogOpen}
          onOpenChange={setMoodDialogOpen}
          selectedDate={selectedDate}
          onSaveMood={handleSaveMood}
          currentMood={getCurrentMood(selectedDate)}
        />
      )}
    </>
  );
};

export default MonthlyOverview;
