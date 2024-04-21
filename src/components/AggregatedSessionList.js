import React, { useEffect, useState } from 'react';
import { fetchAggregatedSessions } from '../services/sessionService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Popper, Typography } from '@mui/material';

function formatSingaporeTime(dateString) {
  const date = new Date(dateString);
  const options = {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZone: 'Asia/Singapore', timeZoneName: 'short'
  };
  return new Intl.DateTimeFormat('en-SG', options).format(date);
}

function AggregatedSessionList({ dateRange }) {
  const [sessions, setSessions] = useState([]);
  const [popperAnchor, setPopperAnchor] = useState(null);
  const [popperContent, setPopperContent] = useState('');

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await fetchAggregatedSessions(dateRange);
        setSessions(data);
      } catch (error) {
        console.error("Error fetching aggregated sessions:", error);
      }
    };

    loadSessions();
  }, [dateRange]);

  const handlePopperClick = (event, pagesViewedList) => {
    setPopperContent(pagesViewedList);
    setPopperAnchor(popperAnchor === event.currentTarget ? null : event.currentTarget);
  };

  const open = Boolean(popperAnchor);
  const id = open ? 'simple-popper' : undefined;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="aggregated sessions table">
        <TableHead>
          <TableRow>
            <TableCell>Visitor ID</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell>IP Address</TableCell>
            <TableCell>Session Start</TableCell>
            <TableCell>Session End</TableCell>
            <TableCell>Pages Viewed Count</TableCell>
            <TableCell>Browser</TableCell>
            <TableCell>Operating System</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((session, index) => (
            <TableRow key={index}>
              <TableCell>{session.visitor_id}</TableCell>
              <TableCell align="right">{`${session.city}, ${session.country}`}</TableCell>
              <TableCell>{session.ip_address}</TableCell>
              <TableCell>{formatSingaporeTime(session.session_start)}</TableCell>
              <TableCell>{formatSingaporeTime(session.session_end)}</TableCell>
              <TableCell>
                <Button color="primary" onClick={(e) => handlePopperClick(e, session.pages_viewed_list)}>
                  {session.pages_viewed_count}
                </Button>
                <Popper id={id} open={open} anchorEl={popperAnchor}>
                  <Paper>
                    <Typography style={{ padding: 10 }}>{popperContent}</Typography>
                  </Paper>
                </Popper>
              </TableCell>
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
