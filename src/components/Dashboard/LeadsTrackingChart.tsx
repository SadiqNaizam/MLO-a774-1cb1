import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  Area,
  AreaChart
} from 'recharts';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'March', closedWon: 65, closedLost: 50 },
  { month: 'April', closedWon: 59, closedLost: 40 },
  { month: 'May', closedWon: 80, closedLost: 25 },
  { month: 'June', closedWon: 62, closedLost: 5 },
  { month: 'July', closedWon: 75, closedLost: 42 },
  { month: 'August', closedWon: 100, closedLost: 60 }, 
];

const totalClosed = 680;
const totalLost = 70;

interface LeadsTrackingChartProps {
  className?: string;
}

const LeadsTrackingChart: React.FC<LeadsTrackingChartProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
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
        <div className="flex items-baseline space-x-6 mb-6">
          <div>
            <span className="text-3xl font-bold text-foreground">{totalClosed}</span>
            <span className="ml-1.5 text-sm text-muted-foreground">total closed</span>
          </div>
          <div>
            <span className="text-3xl font-bold text-foreground">{totalLost}</span>
            <span className="ml-1.5 text-sm text-muted-foreground">total lost</span>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false}/>
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 'dataMax + 10']}
              />
              <RechartsTooltip 
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: '500' }}
              />
              <RechartsLegend 
                verticalAlign="bottom" 
                iconType="square" 
                iconSize={10}
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value, entry) => {
                  const color = entry.color;
                  return <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>;
                }}
              />
              <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))', stroke: 'hsl(var(--chart-1))' }} activeDot={{ r:6, strokeWidth:2, fill: 'hsl(var(--card))', stroke: 'hsl(var(--chart-1))' }}/>
              <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="hsl(var(--chart-4))" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))', stroke: 'hsl(var(--chart-4))' }} activeDot={{ r:6, strokeWidth:2, fill: 'hsl(var(--card))', stroke: 'hsl(var(--chart-4))' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
