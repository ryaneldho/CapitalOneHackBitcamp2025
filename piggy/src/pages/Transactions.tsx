import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
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
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'date',
    direction: 'asc',
  });
  const navigate = useNavigate();

  const filteredByMonth = sortedTransactions.filter((transaction) => {
    const rawDate = transaction.transaction_date || transaction.purchase_date;
    if (!rawDate) return false;
    const txDate = new Date(rawDate);
    const monthName = txDate.toLocaleString('default', { month: 'long' });
    return monthName === selectedMonth;
  });

  const sortedRows = [...filteredByMonth].sort((a, b) => {

    if (sortConfig.key === "date"){
      const dateA = new Date(a.transaction_date || a.purchase_date || "").getTime();
      const dateB = new Date(b.transaction_date || b.purchase_date || "").getTime();
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }

    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];

    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
  
  useEffect(() => {
    if (clicked) {
      setClicked(false)
      navigate("/");
    }
  }, [clicked, navigate]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction == "asc"? "desc": "asc",
    }))}

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
        <Table sx={{backgroundColor: '#6F655B'}}>
          <TableHead>
            <TableRow>
              <TableCell>
                {/* <TableSortLabel
                  active={sortConfig.key === 'index'}
                  direction={sortConfig.key === 'index' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('index')}
                > */}
                  <strong>Transaction #</strong>
                {/* </TableSortLabel> */}
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'type'}
                  direction={sortConfig.key === 'type' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('type')}
                >
                  <strong>Type</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'amount'}
                  direction={sortConfig.key === 'amount' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('amount')}
                >
                  <strong><strong>Amount ($)</strong></strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'date'}
                  direction={sortConfig.key === 'date' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('date')}
                >
                  <strong><strong>Date</strong></strong>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, idx) => (
              <TableRow
                key={row._id}
                sx={{
                   backgroundColor: ['deposit', 'loan'].includes(row.type) ? '#A1AE74' : '#EF9493',
                   color: 'black',
                   '& td': { color: 'black', fontWeight: 'bold' },
                 }}
              >
                <TableCell>
                    {idx + 1}
                </TableCell>
                <TableCell className = "table-cell">{row.type.charAt(0).toUpperCase() + row.type.slice(1)}</TableCell>
                {/* <TableCell sx={{ color: ['deposit', 'loan'].includes(row.type) ? 'green' : 'red', fontWeight: 'bold'}}>{row.amount}</TableCell> */}
                <TableCell className = "table-cell">{row.amount}</TableCell>
                <TableCell className = "table-cell">{row.purchase_date || row.transaction_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

