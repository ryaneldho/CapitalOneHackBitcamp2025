import { all } from 'axios';
import { useTransactions } from '../hooks/useTransactions';
import { Transaction } from '../hooks/useTransactions';

type Props = {
  userId: string;
};

export default function TestDashboard({ userId }: Props) {
  const { deposits, loans, purchases, withdrawals, transfers, bills } = useTransactions(userId);

  const totalDeposits = deposits.reduce((sum, d) => sum + d.amount, 0);
  const totalLoans = loans.reduce((sum, l) => sum + l.amount, 0)
  const totalPurchases = purchases.reduce((sum, p) => sum + p.amount, 0);
  const totalWithdrawals = withdrawals.reduce((sum, w) => sum + w.amount, 0);
  const totalTransfers = transfers.reduce((sum, t) => sum + t.amount, 0);
  const totalBills = bills.reduce((sum, b) => sum + b.amount, 0);

  

  const allTransactions: Transaction[] = [
    ...deposits,
    ...loans,
    ...purchases,
    ...withdrawals,
    ...transfers,
    ...bills
  ]
  // console.log(allTransactions);

  const sortedTransactions = allTransactions.sort((x, y) => {

    // const dateX = new Date(x.transaction_date || x.purchase_date).getTime()
    // const dateY = new Date(y.transaction_date || y.purchase_date).getTime()
    // return dateY - dateX
    return 9
  })

  // console.log(sortedTransactions)

  return (
    <div>
      <h1>Positive money</h1>
      <h2>Deposits: ${totalDeposits.toFixed(2)}</h2>
      <h2>Loans: ${totalLoans.toFixed(2)}</h2>
      <h1>Negative money</h1>
      <h2>Purchases: ${totalPurchases.toFixed(2)}</h2>
      <h2>Withdrawals: ${totalWithdrawals.toFixed(2)}</h2>
      <h2>Transfers: ${totalTransfers.toFixed(2)}</h2>
      <h2>Bills: ${totalBills.toFixed(2)}</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((entry, index) => {
            const date = entry.transaction_date || entry.purchase_date || 'Unknown';
            const color = ['deposit', 'loan'].includes(entry.type) ? 'green' : 'red';
            return (
              <tr key={index}>
                <td>{entry.type}</td>
                <td style={{ color }}>${entry.amount.toFixed(2)}</td>
                <td>{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
}
