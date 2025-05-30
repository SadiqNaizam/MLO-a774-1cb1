import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip
} from 'recharts';

interface SourceDataPoint {
  name: string;
  value: number;
  amount: number;
  percentage: number;
  color: string;
}

const sourcesData: SourceDataPoint[] = [
  { name: 'Clutch', value: 3000, amount: 3000, percentage: 50, color: 'hsl(var(--chart-2))' }, // orange
  { name: 'Behance', value: 1000, amount: 1000, percentage: 40, color: 'hsl(var(--accent-yellow))' }, // light orange/yellow
  { name: 'Instagram', value: 1000, amount: 1000, percentage: 10, color: 'hsl(var(--chart-1))' }, // indigo
  { name: 'Dribbble', value: 1000, amount: 1000, percentage: 10, color: 'hsl(var(--chart-3))' }, // green
];

interface SourcesWidgetProps {
  className?: string;
}

const SourcesWidget: React.FC<SourcesWidgetProps> = ({ className }) => {
  const pieChartData = sourcesData.map(s => ({ name: s.name, value: s.percentage }));

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Sources</CardTitle>
        <Select defaultValue="last-6-months">
          <SelectTrigger className="w-auto text-xs h-8 px-2 border-none shadow-none data-[placeholder]:text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-12-months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="leads-came" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 h-auto">
            <TabsTrigger value="leads-came" className="text-xs py-1.5">Leads came</TabsTrigger>
            <TabsTrigger value="leads-converted" className="text-xs py-1.5">Leads Converted</TabsTrigger>
            <TabsTrigger value="total-deals-size" className="text-xs py-1.5">Total deals size</TabsTrigger>
          </TabsList>
          <TabsContent value="leads-came">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-52 md:h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={'60%'}
                      outerRadius={'100%'}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={sourcesData[index].color} stroke={sourcesData[index].color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                        formatter={(value: number, name: string) => [`${value}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="space-y-2.5 text-sm">
                {sourcesData.map((source) => (
                  <li key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span 
                        className="w-3 h-3 rounded-sm mr-2"
                        style={{ backgroundColor: source.color }}
                      ></span>
                      <span className="text-foreground">{source.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-muted-foreground text-right w-16">$ {source.amount.toLocaleString()}</span>
                        <span className="text-foreground font-medium text-right w-8">{source.percentage}%</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="leads-converted">
            <p className="text-center text-muted-foreground py-8">Leads Converted data not yet implemented.</p>
          </TabsContent>
          <TabsContent value="total-deals-size">
            <p className="text-center text-muted-foreground py-8">Total deals size data not yet implemented.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SourcesWidget;
