import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const DataTable = ({ data }) => (
    <Paper>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Sensor ID</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Gas Level</TableCell>
                    <TableCell>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.sensorId}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.gasLevel}</TableCell>
                        <TableCell>{row.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
);

export default DataTable;