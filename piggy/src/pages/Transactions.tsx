import { Typography, Button, Box } from '@mui/material';
import React from 'react';
import settings from '../assets/settings.png';
import TestDashboard from '../components/TestDashboard';
import '../css/transactions.css';

function Transactions() {
  return (
    <Box className="Transactions">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Transaction #</th>
              <th>Transaction Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Item 1</td><td>Hello 1</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>2</td><td>Item 2</td><td>Hello 2</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>3</td><td>Item 3</td><td>Hello 3</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>4</td><td>Item 4</td><td>Hello 4</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>5</td><td>Item 5</td><td>Hello 5</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>6</td><td>Item 6</td><td>Hello 6</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>7</td><td>Item 7</td><td>Hello 7</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>8</td><td>Item 8</td><td>Hello 8</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>9</td><td>Item 9</td><td>Hello 9</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>10</td><td>Item 10</td><td>Hello 10</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>10</td><td>Item 10</td><td>Hello 10</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>10</td><td>Item 10</td><td>Hello 10</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>10</td><td>Item 10</td><td>Hello 10</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>10</td><td>Item 10</td><td>Hello 10</td><td>${Math.random().toFixed(2)}</td></tr>
            <tr><td>10</td><td>Item 10</td><td>Hello 10</td><td>${Math.random().toFixed(2)}</td></tr>

          </tbody>
        </table>
      </div>
    </Box>
   
  );
}

export default Transactions;
