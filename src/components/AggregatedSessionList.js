import React, { useEffect, useState } from 'react';
import { fetchAggregatedSessions } from '../services/sessionService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Popper, Typography, List, ListItem, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

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
  const [popperContent, setPopperContent] = useState([]);

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
    setPopperContent(pagesViewedList.split(', ')); // Assuming pages are comma-separated
    setPopperAnchor(popperAnchor === event.currentTarget ? null : event.currentTarget);
  };

  const handleFavoriteToggle = (sessionId) => {
    // Assuming a function to toggle favorite status in your API
    // toggleFavoriteStatus(sessionId);
    console.log("Toggle favorite status for:", sessionId);
  };

  const toggleStar = async (sessionId, isCurrentlyFavorite) => {
    // Immediately update the UI to reflect the user action
    setSessions(sessions.map(session =>
      session.visitor_id === sessionId ? { ...session, is_favorite: !isCurrentlyFavorite } : session
    ));
  
    try {
      // Attempt to update the backend
      await axios.post(`${process.env.REACT_APP_API_URL}/api/sessions/starred/${sessionId}`);
      // No need to do anything here on success, the UI is already updated
    } catch (error) {
      console.error("Error toggling star:", error);
      // Revert the UI change if there's an error
      setSessions(sessions.map(session =>
        session.visitor_id === sessionId ? { ...session, is_favorite: isCurrentlyFavorite } : session
      ));
      // Optionally display an error message to the user
      alert('Failed to update favorite status. Please try again.');
    }
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
              <TableCell>
                {/* <IconButton onClick={() => handleFavoriteToggle(session.visitor_id)}>
                  {session.is_favorite ? <StarIcon /> : <StarOutlineIcon />}
                </IconButton> */}
                <IconButton onClick={() => toggleStar(session.visitor_id, session.is_favorite)}>
                  {session.is_favorite ? <StarIcon /> : <StarOutlineIcon />}
                </IconButton>
                {session.visitor_id}
              </TableCell>
              <TableCell align="right">{`${session.city}, ${session.country}`}</TableCell>
              <TableCell>{session.ip_address}</TableCell>
              <TableCell>{formatSingaporeTime(session.session_start)}</TableCell>
              <TableCell>{formatSingaporeTime(session.session_end)}</TableCell>
              <TableCell>
                <Button color="primary" onClick={(e) => handlePopperClick(e, session.pages_viewed_list)}>
                  {session.pages_viewed_count}
                </Button>
                <Popper id={id} open={open} anchorEl={popperAnchor}>
                  <Paper style={{ padding: '10px' }}>
                    <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>Pages Viewed:</Typography>
                    <List>
                      {popperContent.map((page, idx) => (
                        <ListItem key={idx}>{page}</ListItem>
                      ))}
                    </List>
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
