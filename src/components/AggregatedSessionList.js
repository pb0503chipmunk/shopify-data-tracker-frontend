import React, { useEffect, useState } from 'react';
import { fetchAggregatedSessions } from '../services/sessionService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function formatSingaporeTime(dateString) {
  const date = new Date(dateString);
  const options = {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZone: 'Asia/Singapore', timeZoneName: 'short'
  };
  return new Intl.DateTimeFormat('en-SG', options).format(date);
}

function AggregatedSessionList({ dateRange }) { // Accept dateRange as a prop
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await fetchAggregatedSessions(dateRange); // Pass dateRange to the fetch function
        setSessions(data);
      } catch (error) {
        console.error("Error fetching aggregated sessions:", error);
      }
    };

    loadSessions();
  }, [dateRange]); // Rerun effect when dateRange changes

  return (
    <TableContainer component={Paper}>
      <Table aria-label="aggregated sessions table">
        <TableHead>
          <TableRow>
            <TableCell>Visitor ID</TableCell>
            <TableCell>IP Address</TableCell>
            <TableCell>Session Start</TableCell>
            <TableCell>Session End</TableCell>
            <TableCell>Pages Viewed Count</TableCell>
            <TableCell>Pages Viewed List</TableCell>
            <TableCell>Browser</TableCell>
            <TableCell>Operating System</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((session, index) => (
            <TableRow key={index}>
              <TableCell>{session.visitor_id}</TableCell>
              <TableCell>{session.ip_address}</TableCell>
              <TableCell>{formatSingaporeTime(session.session_start)}</TableCell>
              <TableCell>{formatSingaporeTime(session.session_end)}</TableCell>
              <TableCell>{session.pages_viewed_count}</TableCell>
              <TableCell>{session.pages_viewed_list}</TableCell>
              <TableCell>{session.browser}</TableCell>
              <TableCell>{session.operating_system}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AggregatedSessionList;
