
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const monthlyMoodData = [
  { name: 'Jan', happy: 12, neutral: 10, sad: 5, angry: 3 },
  { name: 'Feb', happy: 15, neutral: 8, sad: 4, angry: 2 },
  { name: 'Mar', happy: 10, neutral: 12, sad: 6, angry: 4 },
  { name: 'Apr', happy: 18, neutral: 8, sad: 3, angry: 1 },
];

const journalLengthData = [
  { date: '04/01', length: 120 },
  { date: '04/03', length: 250 },
  { date: '04/05', length: 180 },
  { date: '04/07', length: 320 },
  { date: '04/10', length: 210 },
  { date: '04/15', length: 150 },
  { date: '04/21', length: 280 },
  { date: '04/28', length: 200 },
];

const activityTimeData = [
  { name: 'Morning', value: 35, color: '#9b87f5' },
  { name: 'Afternoon', value: 45, color: '#33C3F0' },
  { name: 'Evening', value: 15, color: '#0EA5E9' },
  { name: 'Night', value: 5, color: '#7E69AB' },
];

const topicDistributionData = [
  { name: 'Work', value: 30 },
  { name: 'Personal', value: 25 },
  { name: 'Health', value: 20 },
  { name: 'Relationships', value: 15 },
  { name: 'Hobbies', value: 10 },
];

const Insights = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 gradient-text">Insights & Analytics</h2>
        <p className="text-lg text-gray-600">Visualize patterns and trends in your reflections and activities.</p>
      </div>
      
      <Tabs defaultValue="overview" className="animate-scale-in">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mood">Mood Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity Patterns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Monthly Mood Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyMoodData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '8px', 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                        }}
                      />
                      <Legend />
                      <Bar dataKey="happy" name="Happy" fill="#4ADE80" animationDuration={1500} />
                      <Bar dataKey="neutral" name="Neutral" fill="#60A5FA" animationDuration={1500} animationBegin={200} />
                      <Bar dataKey="sad" name="Sad" fill="#C084FC" animationDuration={1500} animationBegin={400} />
                      <Bar dataKey="angry" name="Angry" fill="#F87171" animationDuration={1500} animationBegin={600} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Journal Entry Length</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={journalLengthData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} words`, 'Entry Length']}
                        contentStyle={{ 
                          borderRadius: '8px', 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="length" 
                        stroke="#9b87f5" 
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2 }} 
                        activeDot={{ r: 6 }}
                        animationDuration={2000}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Activity Time Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activityTimeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={300}
                        animationDuration={1500}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {activityTimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                        contentStyle={{ 
                          borderRadius: '8px', 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Topic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={topicDistributionData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 60,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                        contentStyle={{ 
                          borderRadius: '8px', 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        name="Percentage" 
                        fill="#0EA5E9" 
                        radius={[0, 4, 4, 0]} 
                        animationDuration={1500} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="mood" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Detailed Mood Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">Detailed mood analysis is under development. Coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Activity Pattern Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">Activity pattern analysis is under development. Coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Insights;
