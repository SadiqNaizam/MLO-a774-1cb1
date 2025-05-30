import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  duration: string;
  colorClass: string;
  tooltipText?: string;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, duration: '2 days', colorClass: 'bg-chart2', tooltipText: 'Average 2 days on Discovery' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, duration: '2 days', colorClass: 'bg-accentYellow', tooltipText: 'Average 2 days on Qualified' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, duration: 'average time on this stage', colorClass: 'bg-chart1', tooltipText: 'Average 5 days in Conversation' },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, duration: '8 days', colorClass: 'bg-chart3', tooltipText: 'Average 8 days in Negotiations' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, duration: '10 days', colorClass: 'bg-purple-500', tooltipText: 'Average 10 days to Close (Won)' },
];

const totalActiveLeads = 600;

interface FunnelCountWidgetProps {
  className?: string;
}

const FunnelCountWidget: React.FC<FunnelCountWidgetProps> = ({ className }) => {
  const totalCountForBar = funnelData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <TooltipProvider>
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Funnel count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-4xl font-bold text-foreground">{totalActiveLeads}</span>
            <span className="ml-2 text-muted-foreground">active leads</span>
          </div>

          <div className="mb-6">
            <div className="flex h-3 rounded-full overflow-hidden bg-muted">
              {funnelData.map(stage => (
                <Tooltip key={stage.id}>
                  <TooltipTrigger asChild>
                    <div 
                      className={cn('h-full', stage.colorClass)}
                      style={{ width: `${(stage.count / totalCountForBar) * 100}%` }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stage.name}: {stage.count} leads</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          <ul className="space-y-3">
            {funnelData.map((stage) => (
              <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
                <div className={cn('w-3 h-3 rounded-sm', stage.colorClass)}></div>
                <span className="text-foreground whitespace-nowrap truncate">{stage.name}</span>
                <span className="text-muted-foreground justify-self-end">{stage.count}</span>
                <span className="text-muted-foreground justify-self-end">$ {stage.value}</span>
                {stage.id === 'inConversation' ? (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="text-muted-foreground justify-self-end cursor-help underline decoration-dashed">{stage.duration}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{stage.tooltipText || 'Average time spent by leads at this specific stage.'}</p>
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <span className="text-muted-foreground justify-self-end">{stage.duration}</span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default FunnelCountWidget;
