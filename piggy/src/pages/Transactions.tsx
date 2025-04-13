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
import backButton from '../assets/backButton.png'


type Props = {
  sortedTransactions: Transaction[];
  selectedMonth: string;    
};

export default function Transactions({ sortedTransactions, selectedMonth }: Props) {
  const [clicked, setClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  const filteredByMonth = sortedTransactions.filter((transaction) => {
    const rawDate = transaction.transaction_date || transaction.purchase_date;
    if (!rawDate) return false;
    const txDate = new Date(rawDate);
    const monthName = txDate.toLocaleString('default', { month: 'long' });
    return monthName === selectedMonth;
  });
  useEffect(() => {
    if (clicked) {
      setClicked(false)
      navigate("/"); // Redirect after state update
    }
  }, [clicked, navigate]);

  return (
    <Box className="border">
      <img src={backButton} id="backButton" alt="backButton" sizes="small" onClick={() => setClicked(true)}
         style={{
          height: '50px',
          position: 'relative',
          left: '-200px',
          cursor: 'pointer',
          width: '50px',
      }}/>

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
            {filteredByMonth.map((row, idx) => (
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

