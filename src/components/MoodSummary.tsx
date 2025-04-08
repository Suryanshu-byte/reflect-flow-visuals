
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface MoodData {
  name: string;
  value: number;
  color: string;
}

const MoodSummary = () => {
  // Mock data for demonstration
  const moodData: MoodData[] = [
    { name: 'Happy', value: 42, color: '#4ADE80' }, // green-400
    { name: 'Neutral', value: 28, color: '#60A5FA' }, // blue-400
    { name: 'Sad', value: 15, color: '#C084FC' }, // purple-400
    { name: 'Angry', value: 10, color: '#F87171' }, // red-400
    { name: 'No Data', value: 5, color: '#D1D5DB' }, // gray-300
  ];

  return (
    <Card className="w-full h-full glass-card animate-scale-in" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <CardTitle>Monthly Mood Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={moodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
                animationBegin={300}
                animationDuration={1000}
              >
                {moodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} days`, name]}
                contentStyle={{ borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.9)', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
                iconType="circle" 
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodSummary;
