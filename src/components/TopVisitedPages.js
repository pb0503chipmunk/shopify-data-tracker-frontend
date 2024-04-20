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
  // Initialize the state for storing the top pages data
  const [topPages, setTopPages] = useState([]);
  useEffect(() => {
    console.log("Date Range Received:", dateRange);
    if (dateRange && dateRange.startDate && dateRange.endDate) {
        // Convert to Date objects if necessary
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            console.error('Invalid date values:', dateRange);
            return;
        }

        const formattedStartDate = start.toISOString().split('T')[0];
        const formattedEndDate = end.toISOString().split('T')[0];
        const queryUrl = `${process.env.REACT_APP_API_URL}/api/top-pages?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
        console.log('Fetching Top Pages with URL:', queryUrl);

        fetch(queryUrl)
            .then(response => response.json())
            .then(data => {
                console.log("Data Received:", data);
                setTopPages(data); // Assuming you have a state `topPages` to store fetched data
            })
            .catch(error => console.error("Error fetching top visited pages:", error));
    } else {
        console.error('Date Range is invalid:', dateRange);
    }
}, [dateRange]);  // Ensure dateRange is part of the dependency array if it comes from props or state


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
