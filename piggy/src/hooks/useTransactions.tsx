import { useEffect, useState } from 'react';
import { getDeposits, getPurchases } from '../api/transactions';

export function useTransactions(userId: string) {
  const [deposits, setDeposits] = useState([]);
  const [loans, setLoans] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [transfer, setTransfers] = useState([]);
  const [bills, setBills] = useState([]);

  const fetchData = async () => {
    try {
      const [depRes, purRes] = await Promise.all([
        getDeposits(userId),
        getPurchases(userId),
      ]);
      console.log(depRes);
      console.log(purRes);
      setDeposits(depRes.data);
      setPurchases(purRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); 
    return () => clearInterval(interval);
  }, [userId]);

  return { deposits, purchases };
}
