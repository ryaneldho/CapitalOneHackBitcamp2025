import { useTransactions } from '../hooks/useTransactions';

type Props = {
  userId: string;
};

export default function TestDashboard({ userId }: Props) {
  const { deposits, purchases } = useTransactions(userId);

  const totalDeposits = deposits.reduce((sum, d: any) => sum + d.amount, 0);
  const totalSpending = purchases.reduce((sum, p: any) => sum + p.amount, 0);

  return (
    <div>
      <h2>Deposits: ${totalDeposits.toFixed(2)}</h2>
      <h2>Spending: ${totalSpending.toFixed(2)}</h2>
    </div>
  );
}
