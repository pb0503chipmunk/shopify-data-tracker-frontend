import React, { useEffect, useState } from 'react';
import { fetchSessions } from '../services/sessionService';
import { fetchAggregatedSessions } from '../services/sessionService';}
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tab } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';

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
        loadSessions();
    }, []);

    const loadSessions = async () => {
        try {
            const data = await fetchAggregatedSessions();
            console.log("Fetched sessions data:", data);
            setSessions(data);
        } catch (error) {
            console.error("Error fetching sessions:", error);
        }
    };

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
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Visitor ID</TableCell>
                        <TableCell>Favorite</TableCell>
                        <TableCell align="right">Page Name</TableCell>
                        <TableCell align="right">Browser</TableCell>
                        <TableCell align="right">Operating System</TableCell>
                        <TableCell align="right">IP Address</TableCell>
                        <TableCell align="right">Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions.map((session) => (
                        <TableRow key={session.visitor_id}>
                            <TableCell component="th" scope="row">
                                {session.visitor_id}</TableCell>
                            <TableCell>{session.is_favorite}</TableCell>
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
