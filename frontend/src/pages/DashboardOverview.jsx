import React, { useState } from 'react';
import PageHeader from '../components/dashboard/PageHeader';
import KpiCard from '../components/dashboard/KpiCard';
import MainChart from '../components/dashboard/MainChart';
import DonutGauge from '../components/dashboard/DonutGauge';
import ItemList from '../components/dashboard/ItemList';
import { kpiData, chartData, donutData, topItemsData, timeframeOptions } from '../data/mockData';

const DashboardOverview = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader 
        title="Overview"
        timeframeOptions={timeframeOptions}
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={setSelectedTimeframe}
      />

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            delta={kpi.delta}
            icon={kpi.icon}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <MainChart 
            data={chartData}
            title="Performance Overview"
            timeframe={timeframeOptions.find(t => t.value === selectedTimeframe)?.label || 'Monthly'}
          />
        </div>

        {/* Right Rail - Takes 1 column */}
        <div className="space-y-6">
          {/* Goal Progress Donut */}
          <DonutGauge 
            label={donutData.label}
            current={donutData.current}
            target={donutData.target}
            percent={donutData.percent}
            subtext={donutData.subtext}
          />

          {/* Top Items List */}
          <ItemList 
            title="Top Performers"
            items={topItemsData}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
