
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ActivityData {
  name: string;
  journals: number;
  events: number;
}

const ActivityChart = () => {
  // Mock data for demonstration
  const data: ActivityData[] = [
    { name: 'Week 1', journals: 4, events: 2 },
    { name: 'Week 2', journals: 3, events: 5 },
    { name: 'Week 3', journals: 2, events: 3 },
    { name: 'Week 4', journals: 5, events: 4 },
  ];

  return (
    <Card className="w-full glass-card animate-scale-in" style={{ animationDelay: '400ms' }}>
      <CardHeader>
        <CardTitle>Monthly Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                }}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              />
              <Bar 
                dataKey="journals" 
                name="Journal Entries" 
                fill="#9b87f5" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500} 
              />
              <Bar 
                dataKey="events" 
                name="Events" 
                fill="#33C3F0" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500} 
                animationBegin={300} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
