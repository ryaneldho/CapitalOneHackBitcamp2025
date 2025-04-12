import { useEffect, useState } from 'react';
import { getBills, getLoans, getDeposits, getPurchases, getTransfers, getWithdrawals } from '../api/transactions';
export interface Transaction {
  amount: number;
  transaction_date?: string;
  payment_date?: string;
  [key: string]: any;
};

export function useTransactions(userId: string) {
  const [deposits, setDeposits] = useState<Transaction[]>([]);
  const [loans, setLoans] = useState<Transaction[]>([]);
  const [purchases, setPurchases] = useState<Transaction[]>([]);
  const [withdrawals, setWithdrawals] = useState<Transaction[]>([]);
  const [transfers, setTransfers] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Transaction[]>([]);

  const fetchData = async () => {
    try {
      const [depRes, loanRes, purRes, withdrawRes, transferRes, billRes] = await Promise.all([
        getDeposits(userId),
        getLoans(userId),
        getPurchases(userId),
        getWithdrawals(userId),
        getTransfers(userId),
        getBills(userId),
      ]);
      setDeposits(depRes.data);
      setLoans(loanRes.data);
      setPurchases(purRes.data);
      setWithdrawals(withdrawRes.data);
      setTransfers(transferRes.data);
      setBills(billRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); 
    return () => clearInterval(interval);
  }, [userId]);

  return { deposits, loans, purchases, withdrawals, transfers, bills };
}
