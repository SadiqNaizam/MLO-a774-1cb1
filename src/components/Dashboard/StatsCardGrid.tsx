import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface ReasonStat {
  id: string;
  percentage: number;
  description: string;
}

interface OtherDataStat {
  id: string;
  value: string;
  label: string;
  tooltip?: string;
}

const reasonsForLeadsLost: ReasonStat[] = [
  { id: 'proposalUnclear1', percentage: 40, description: 'The proposal is unclear' },
  { id: 'venturePursuit', percentage: 20, description: 'However venture pursuit' },
  { id: 'other', percentage: 10, description: 'Other' },
  { id: 'proposalUnclear2', percentage: 30, description: 'The proposal is unclear' }, // Assuming this is a distinct category or a typo in original image
];

const otherDataStats: OtherDataStat[] = [
  { id: 'totalLeads', value: '900', label: 'total leads count' },
  { id: 'avgConversionTime', value: '12', label: 'days in average to convert lead' },
  { id: 'inactiveLeads', value: '30', label: 'inactive leads', tooltip: 'Leads that have not shown activity in the last X days.' },
];

interface StatsCardGridProps {
  className?: string;
}

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Reasons of leads lost</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-x-6 gap-y-8">
            {reasonsForLeadsLost.map((reason) => (
              <div key={reason.id}>
                <p className="text-3xl font-bold text-foreground">{reason.percentage}%</p>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Other data</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
            {otherDataStats.map((stat) => (
              <div key={stat.id}>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{stat.label}</span>
                  {stat.tooltip && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{stat.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default StatsCardGrid;
