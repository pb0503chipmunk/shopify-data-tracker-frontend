import React, { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import moment from 'moment-timezone';

function DateFilter({ onDateRangeChange }) {
  const [dateRange, setDateRange] = useState('today');

  useEffect(() => {
    handleDateRangeChange('today');
  }, []);

  const handleDateRangeChange = (rangeValue) => {
    const timezone = 'Asia/Singapore';
    let startDate, endDate;

    switch (rangeValue) {
      case 'today':
        startDate = moment().tz(timezone).startOf('day').toDate();
        endDate = moment().tz(timezone).endOf('day').toDate();
        break;
      case 'yesterday':
        startDate = moment().tz(timezone).subtract(1, 'days').startOf('day').toDate();
        endDate = moment().tz(timezone).subtract(1, 'days').endOf('day').toDate();
        break;
      case 'thisWeek':
        startDate = moment().tz(timezone).startOf('week').toDate();
        endDate = moment().tz(timezone).endOf('week').toDate();
        break;
      // Add more cases as needed
      default:
        startDate = endDate = null;
    }

    setDateRange(rangeValue);
    onDateRangeChange({ startDate, endDate });
  };

  const handleChange = (event) => {
    handleDateRangeChange(event.target.value);
  };

  return (
    <FormControl style={{ width: '200px' }}>
      <InputLabel>Date Range</InputLabel>
      <Select
        value={dateRange}
        label="Date Range"
        onChange={handleChange}
      >
        <MenuItem value="today">Today</MenuItem>
        <MenuItem value="yesterday">Yesterday</MenuItem>
        <MenuItem value="thisWeek">This Week</MenuItem>
        <MenuItem value="last7Days">Last 7 Days</MenuItem>
        {/* Add more MenuItem components for additional ranges */}
      </Select>
    </FormControl>
  );
}

export default DateFilter;
