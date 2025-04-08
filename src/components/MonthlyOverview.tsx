
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';

type MoodType = 'happy' | 'neutral' | 'sad' | 'angry' | undefined;

interface DayData {
  date: Date;
  mood?: MoodType;
  hasJournal: boolean;
  hasEvent: boolean;
}

const MonthlyOverview = () => {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  // Mock data for demonstration
  const generateMockMonthData = (date: Date): DayData[] => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const moods: MoodType[] = ['happy', 'neutral', 'sad', 'angry'];
    
    return days.map(day => ({
      date: day,
      mood: Math.random() > 0.3 ? moods[Math.floor(Math.random() * moods.length)] : undefined,
      hasJournal: Math.random() > 0.6,
      hasEvent: Math.random() > 0.7
    }));
  };
  
  const monthData = React.useMemo(() => generateMockMonthData(currentMonth), [currentMonth]);
  
  const handleDayClick = (day: DayData) => {
    toast({
      title: format(day.date, 'MMMM d, yyyy'),
      description: `Mood: ${day.mood || 'Not recorded'} | ${day.hasJournal ? 'Has journal entry' : 'No journal entry'} | ${day.hasEvent ? 'Has events' : 'No events'}`,
    });
  };
  
  // Calendar rendering logic
  const getDayClass = (day: DayData) => {
    let classes = "aspect-square flex flex-col items-center justify-center rounded-md p-2 transition-all hover:scale-105 cursor-pointer ";
    
    // Add mood-specific styling
    if (day.mood) {
      classes += `mood-${day.mood} text-white `;
    } else {
      classes += "bg-gray-100 text-gray-600 ";
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
          <div key={index} className="text-xs font-medium text-center text-gray-500">
            {day}
          </div>
        ))}
      </div>
    );
  };
  
  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const startDay = getDay(monthStart);
    const daysInMonth = monthData.length;
    
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
      return newDate;
    });
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <Card className="w-full overflow-hidden glass-card animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Monthly Overview</CardTitle>
          <div className="flex items-center space-x-2">
            <button 
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-left"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <CardDescription className="text-sm font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </CardDescription>
            <button 
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
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
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;
