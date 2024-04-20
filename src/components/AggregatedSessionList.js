import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { fetchAggregatedSessions } from '../services/sessionService';

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

    const toggleStar = async (visitorId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/sessions/starred/${visitorId}`);
            if (response.data) {
                setSessions(sessions.map(session =>
                    session.visitor_id === visitorId ? { ...session, is_favorite: !session.is_favorite } : session
                ));
            }
        } catch (error) {
            console.error("Error toggling star:", error);
        }
    };

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
                        <TableCell>Pages Viewed List</TableCell>
                        <TableCell>Browser</TableCell>
                        <TableCell>Operating System</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions.map((session, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                <IconButton onClick={() => toggleStar(session.visitor_id)}>
                                    {session.is_favorite ? <StarIcon color="secondary" /> : <StarOutlineIcon />}
                                </IconButton>
                                {session.visitor_id}
                            </TableCell>
                            <TableCell align="right">{`${session.city}, ${session.country}`}</TableCell>
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
