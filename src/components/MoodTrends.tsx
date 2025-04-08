
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine
} from 'recharts';
import { cn } from "@/lib/utils";

// Mock data for demonstration
const generateMoodData = () => {
  const moodLabels = ['Happy', 'Neutral', 'Sad', 'Angry'];
  const days = 30;
  const data = [];

  for (let i = 1; i <= days; i++) {
    const dayData: any = {
      day: i,
      date: `04/${i <= 9 ? '0' + i : i}`,
    };

    // Generate a weighted random distribution that favors happy/neutral
    moodLabels.forEach(mood => {
      let value = 0;
      
      if (mood === 'Happy') {
        value = Math.max(30, Math.floor(Math.random() * 70) + 30); // Higher values
      } else if (mood === 'Neutral') {
        value = Math.max(20, Math.floor(Math.random() * 60) + 20);
      } else if (mood === 'Sad') {
        value = Math.max(10, Math.floor(Math.random() * 40) + 10);
      } else {
        value = Math.max(5, Math.floor(Math.random() * 30) + 5); // Lower values
      }
      
      // Add some patterns/trends
      if (i > 10 && i < 15) { // A period of increased happiness
        if (mood === 'Happy') value += 15;
        if (mood === 'Sad') value -= 10;
      }
      
      if (i > 20 && i < 25) { // A period of slight sadness
        if (mood === 'Sad') value += 20;
        if (mood === 'Happy') value -= 10;
      }
      
      dayData[mood.toLowerCase()] = Math.max(0, Math.min(100, value));
    });
    
    data.push(dayData);
  }
  
  return data;
};

interface MoodTrendsProps {
  className?: string;
}

const MoodTrends = ({ className }: MoodTrendsProps) => {
  const [data, setData] = useState<any[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    const moodData = generateMoodData();
    let currentIndex = 0;
    
    // Progressively reveal data points
    const interval = setInterval(() => {
      if (currentIndex < moodData.length) {
        setData(prevData => [...prevData, moodData[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 150); // Adjust speed of animation
    
    return () => clearInterval(interval);
  }, []);
  
  const resetAnimation = () => {
    setData([]);
    setIsAnimating(true);
  };
  
  return (
    <Card className={cn("w-full h-full glass-card animate-scale-in overflow-hidden", className)} style={{ animationDelay: '200ms' }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Mood Trends Over Time</CardTitle>
        {!isAnimating && (
          <button 
            onClick={resetAnimation}
            className="text-sm px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Replay Animation
          </button>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="date" />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                }}
              />
              <Legend />
              <defs>
                <linearGradient id="colorHappy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C084FC" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#C084FC" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAngry" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F87171" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F87171" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="happy" 
                name="Happy" 
                stroke="#4ADE80" 
                fillOpacity={1} 
                fill="url(#colorHappy)" 
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
              <Area 
                type="monotone" 
                dataKey="neutral" 
                name="Neutral" 
                stroke="#60A5FA" 
                fillOpacity={1} 
                fill="url(#colorNeutral)" 
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
              <Area 
                type="monotone" 
                dataKey="sad" 
                name="Sad" 
                stroke="#C084FC" 
                fillOpacity={1} 
                fill="url(#colorSad)" 
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
              <Area 
                type="monotone" 
                dataKey="angry" 
                name="Angry" 
                stroke="#F87171" 
                fillOpacity={1} 
                fill="url(#colorAngry)" 
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
              <ReferenceLine y={50} label="Average" stroke="#888888" strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTrends;
