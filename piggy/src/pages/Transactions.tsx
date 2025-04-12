import {
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TestDashboard from '../components/TestDashboard';
import { Transaction } from '../hooks/useTransactions';
import { useTransactions } from '../hooks/useTransactions';
import '../css/transactions.css';
import '../css/App.css'


type Props = {
  sortedTransactions: Transaction[]
};

export default function Transactions({ sortedTransactions }: Props) {
  const [clicked, setClicked] = useState<boolean>(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (clicked) {
      setClicked(false)
      navigate("/"); // Redirect after state update
    }
  }, [clicked, navigate]);

  return (
    <Box className="border">
      <Button variant="outlined" color="error" sx={{ mb: 2 }} onClick={() => setClicked(true)}>
        GO BACK
      </Button>

      <TableContainer className="table-container" component={Paper} sx={{ maxHeight: 750, maxWidth: 450, margin: '0 auto', overflowX: 'auto', overflowY: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Transaction #</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Amount ($)</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTransactions.map((row, idx) => (
              <TableRow
                key={row._id}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell color=''>{row.type.charAt(0).toUpperCase() + row.type.slice(1)}</TableCell>
                <TableCell sx={{ color: ['deposit', 'loan'].includes(row.type) ? 'green' : 'red', fontWeight: 'bold'}}>{row.amount}</TableCell>
                <TableCell>{row.purchase_date || row.transaction_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

