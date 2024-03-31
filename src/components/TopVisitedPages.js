import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

function formatSingaporeTime(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', 
    timeZone: 'Asia/Singapore', timeZoneName: 'short' 
  };
  return new Intl.DateTimeFormat('en-SG', options).format(date);
}

function TopVisitedPages({ dateRange }) {
    const [topPages, setTopPages] = useState([]);
  
    useEffect(() => {
      const loadTopPages = async () => {
        try {
          // Ensure startDate and endDate are formatted as "YYYY-MM-DD"
          let formattedStartDate = dateRange.startDate ? dateRange.startDate.toISOString().split('T')[0] : null;
          let formattedEndDate = dateRange.endDate ? dateRange.endDate.toISOString().split('T')[0] : null;
  
          let url = `${process.env.REACT_APP_API_URL}/api/top-pages`;
          if (formattedStartDate && formattedEndDate) {
            url += `?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
          }
  
          const response = await axios.get(url);
          setTopPages(response.data);
        } catch (error) {
          console.error("Error fetching top visited pages:", error);
        }
      };
  
      loadTopPages();
    }, [dateRange]); // Include dateRange in the dependencies array
  
    // The rest of your component...
    return (
        <TableContainer component={Paper}>
          <Table aria-label="top visited pages table">
            <TableHead>
              <TableRow>
                <TableCell>Page Name</TableCell>
                <TableCell>Number of Visits</TableCell>
                <TableCell>Last Visit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topPages.map((page, index) => (
                <TableRow key={index}>
                  <TableCell>{page.page_name}</TableCell>
                  <TableCell>{page.number_of_visits}</TableCell>
                  <TableCell>{formatSingaporeTime(page.last_visit)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );   
}

export default TopVisitedPages;
