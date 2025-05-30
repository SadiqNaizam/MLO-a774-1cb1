import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import FunnelCountWidget from '../components/Dashboard/FunnelCountWidget';
import SourcesWidget from '../components/Dashboard/SourcesWidget';
import LeadsTrackingChart from '../components/Dashboard/LeadsTrackingChart';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';

/**
 * DashboardPage component
 * 
 * This page serves as the main dashboard overview, assembling various
 * widgets and charts within the MainAppLayout.
 * It follows the structure:
 * - Row 1: FunnelCountWidget and SourcesWidget (side-by-side on larger screens)
 * - Row 2: LeadsTrackingChart (full width)
 * - Row 3: StatsCardGrid (full width, internally handles its two-column layout)
 */
const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* Row 1: Funnel Count and Sources Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FunnelCountWidget />
        <SourcesWidget />
      </div>

      {/* Row 2: Leads Tracking Chart */}
      <LeadsTrackingChart />

      {/* Row 3: Stats Card Grid (Reasons for leads lost & Other data) */}
      <StatsCardGrid />
    </MainAppLayout>
  );
};

export default DashboardPage;
