import React from 'react';
import managerStyles from './Manager.module.css';

const MOCK_PAYMENTS = [
  { id: 1, guest: 'Alexandra Chen', amount: 840, method: 'Credit Card', date: '2026-06-24', status: 'completed', booking: 'Deluxe Ocean View' },
  { id: 2, guest: 'James Thompson', amount: 2720, method: 'PayPal', date: '2026-06-22', status: 'completed', booking: 'Royal Suite' },
  { id: 3, guest: 'Sofia Martinez', amount: 1750, method: 'Bank Transfer', date: '2026-06-20', status: 'pending', booking: 'Garden Villa' },
  { id: 4, guest: 'Marco Rossi', amount: 380, method: 'Debit Card', date: '2026-06-18', status: 'completed', booking: 'Family Suite' },
  { id: 5, guest: 'Emma Wilson', amount: 680, method: 'Credit Card', date: '2026-06-15', status: 'refunded', booking: 'Presidential Suite' },
];

function PaymentsManager() {
  return (
    <div>
      <div className={managerStyles.header}>
        <h1 className={managerStyles.title}>Payments</h1>
      </div>
      <div className={managerStyles.tableWrapper}>
        <table className={managerStyles.table}>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Booking</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PAYMENTS.map(p => (
              <tr key={p.id}>
                <td><strong>{p.guest}</strong></td>
                <td>{p.booking}</td>
                <td className={managerStyles.amountCell}>${p.amount}</td>
                <td>{p.method}</td>
                <td>{p.date}</td>
                <td>
                  <span className={`${managerStyles.badge} ${
                    p.status === 'completed' ? managerStyles.badgeSuccess :
                    p.status === 'pending' ? managerStyles.badgeWarning :
                    managerStyles.badgeDanger
                  }`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentsManager;
