import React, { useEffect, useState } from 'react';
import { fetchSessions } from '../services/sessionService';
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
  

function SessionList() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await fetchSessions();
        // Assuming your backend returns the sessions already sorted; otherwise, sort them here
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    loadSessions();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Visitor ID</TableCell>
            <TableCell align="right">Page Name</TableCell>
            <TableCell align="right">Browser</TableCell>
            <TableCell align="right">Operating System</TableCell>
            <TableCell align="right">IP Address</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell component="th" scope="row">{session.visitor_id}</TableCell>
              <TableCell align="right">{session.page_name}</TableCell>
              <TableCell align="right">{session.browser}</TableCell>
              <TableCell align="right">{session.operating_system}</TableCell>
              <TableCell align="right">{session.ip_address}</TableCell>
              <TableCell align="right">{formatSingaporeTime(session.created_at)}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SessionList;
