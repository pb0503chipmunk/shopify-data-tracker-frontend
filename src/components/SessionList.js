import React, { useEffect, useState } from 'react';
import { fetchSessions } from '../services/sessionService';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
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
            const data = await fetchSessions();
            setSessions(data);
        } catch (error) {
            console.error("Error fetching sessions:", error);
        }
    };

    const toggleStar = async (visitorId) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/sessions/starred/${visitorId}`);
            loadSessions(); // Reload sessions to reflect changes
        } catch (error) {
            console.error("Error toggling star:", error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Star</TableCell>
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
                        <TableRow key={session.visitor_id}>
                            <TableCell>
                                <IconButton onClick={() => toggleStar(session.visitor_id)}>
                                    {session.is_starred ? <StarIcon style={{ color: 'gold' }} /> : <StarBorderOutlinedIcon />}
                                </IconButton>
                            </TableCell>
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
            <IconButton><StarBorderOutlinedIcon></StarBorderOutlinedIcon></IconButton>
        </TableContainer>
    );
}

export default SessionList;
