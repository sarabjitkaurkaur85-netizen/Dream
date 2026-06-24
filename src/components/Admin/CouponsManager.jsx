import React, { useState } from 'react';
import managerStyles from './Manager.module.css';

const MOCK_COUPONS = [
  { id: 1, code: 'LUXURY20', discount: 20, type: 'percentage', expiry: '2026-12-31', uses: 45, status: 'active' },
  { id: 2, code: 'BEACH10', discount: 10, type: 'percentage', expiry: '2026-09-30', uses: 120, status: 'active' },
  { id: 3, code: 'SUMMER50', discount: 50, type: 'fixed', expiry: '2026-08-31', uses: 30, status: 'active' },
  { id: 4, code: 'NEWYEAR', discount: 15, type: 'percentage', expiry: '2026-01-31', uses: 200, status: 'expired' },
];

function CouponsManager() {
  const [coupons] = useState(MOCK_COUPONS);

  return (
    <div>
      <div className={managerStyles.header}>
        <h1 className={managerStyles.title}>Coupons Manager</h1>
        <button className={managerStyles.addBtn}>+ Create Coupon</button>
      </div>
      <div className={managerStyles.tableWrapper}>
        <table className={managerStyles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Expiry</th>
              <th>Uses</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id}>
                <td><strong>{c.code}</strong></td>
                <td>{c.type === 'percentage' ? `${c.discount}%` : `$${c.discount}`}</td>
                <td>{c.expiry}</td>
                <td>{c.uses}</td>
                <td>
                  <span className={`${managerStyles.badge} ${c.status === 'active' ? managerStyles.badgeSuccess : managerStyles.badgeDanger}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <div className={managerStyles.actionBtns}>
                    <button className={managerStyles.editSmBtn}>Edit</button>
                    <button className={managerStyles.deleteSmBtn}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CouponsManager;
