import React, { useState } from 'react';
import AggregatedSessionList from './components/AggregatedSessionList';
import TopVisitedPages from './components/TopVisitedPages';
import DateFilter from './components/DateFilter';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';

import './App.css';
import SessionList from './components/SessionList';

function App() {
  // Create a function to format the date in 'YYYY-MM-DD' format for SGT
  const formatDateSGT = (date) => {
    const offset = 8; // UTC+8 for Singapore Time
    const sgtDate = new Date(date.getTime() + offset * 3600 * 1000);
    return sgtDate.toISOString().split('T')[0];
  };

  // Initialize today's date at 00:00 hours SGT
  const todayStart = new Date();
  todayStart.setHours(0 - todayStart.getTimezoneOffset() / 60, 0, 0, 0);

  // Initialize today's date at 23:59 hours SGT
  const todayEnd = new Date();
  todayEnd.setHours(23 - todayEnd.getTimezoneOffset() / 60, 59, 59, 999);

  // Format start and end dates in 'YYYY-MM-DD' format for SGT
  const formattedTodayStart = formatDateSGT(todayStart);
  const formattedTodayEnd = formatDateSGT(todayEnd);

  // Set initial state to today's date range for SGT
  const [dateRange, setDateRange] = useState({
    startDate: formattedTodayStart,
    endDate: formattedTodayEnd
  });

  // Function to handle date range change from DateFilter
  const handleDateRangeChange = (selectedRange) => {
    console.log('Selected Date Range:', selectedRange);
    setDateRange(selectedRange);
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <div className="PageContainer">
          <DateFilter onDateRangeChange={handleDateRangeChange} />
          <h1>Sessions</h1>
          <AggregatedSessionList dateRange={dateRange} />
          <h1>Top Pages</h1>
          <TopVisitedPages dateRange={dateRange} />
        </div>
      </header>
    </div>
  );
}

export default App;
