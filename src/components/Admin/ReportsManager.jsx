import React from 'react';
import managerStyles from './Manager.module.css';

function ReportsManager() {
  return (
    <div>
      <div className={managerStyles.header}>
        <h1 className={managerStyles.title}>Reports</h1>
        <button className={managerStyles.addBtn}>📄 Export PDF</button>
      </div>
      <div className={managerStyles.reportsGrid}>
        <div className={managerStyles.reportCard}>
          <h3>💰 Revenue Report</h3>
          <p className={managerStyles.reportValue}>$601,000</p>
          <span className={managerStyles.reportLabel}>Total Revenue (YTD)</span>
          <span className={managerStyles.reportTrend}>↑ 12.5% vs last year</span>
        </div>
        <div className={managerStyles.reportCard}>
          <h3>📅 Bookings Report</h3>
          <p className={managerStyles.reportValue}>1,248</p>
          <span className={managerStyles.reportLabel}>Total Bookings (YTD)</span>
          <span className={managerStyles.reportTrend}>↑ 8.3% vs last year</span>
        </div>
        <div className={managerStyles.reportCard}>
          <h3>🏨 Occupancy Report</h3>
          <p className={managerStyles.reportValue}>78%</p>
          <span className={managerStyles.reportLabel}>Average Occupancy</span>
          <span className={managerStyles.reportTrend}>↑ 5.2% vs last year</span>
        </div>
        <div className={managerStyles.reportCard}>
          <h3>⭐ Guest Satisfaction</h3>
          <p className={managerStyles.reportValue}>4.8/5</p>
          <span className={managerStyles.reportLabel}>Average Rating</span>
          <span className={managerStyles.reportTrend}>↑ 0.3 vs last year</span>
        </div>
      </div>
    </div>
  );
}

export default ReportsManager;
