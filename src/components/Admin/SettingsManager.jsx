import React from 'react';
import managerStyles from './Manager.module.css';

function SettingsManager() {
  return (
    <div>
      <div className={managerStyles.header}>
        <h1 className={managerStyles.title}>Settings</h1>
      </div>
      <div className={managerStyles.settingsGrid}>
        <div className={managerStyles.settingsCard}>
          <h3>🏨 Hotel Information</h3>
          <div className={managerStyles.settingsForm}>
            <div className={managerStyles.formGroup}>
              <label>Hotel Name</label>
              <input type="text" defaultValue="The Beach Hotel" />
            </div>
            <div className={managerStyles.formGroup}>
              <label>Email</label>
              <input type="email" defaultValue="stay@thebeachhotel.com" />
            </div>
            <div className={managerStyles.formGroup}>
              <label>Phone</label>
              <input type="tel" defaultValue="+62 812 3456 7890" />
            </div>
            <div className={managerStyles.formGroup}>
              <label>Address</label>
              <input type="text" defaultValue="Jl. Pantai Kuta, Bali, Indonesia" />
            </div>
            <button className={managerStyles.saveBtn}>Save Changes</button>
          </div>
        </div>
        <div className={managerStyles.settingsCard}>
          <h3>⚙️ General Settings</h3>
          <div className={managerStyles.settingsForm}>
            <div className={managerStyles.formGroup}>
              <label>Default Currency</label>
              <select defaultValue="USD"><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option></select>
            </div>
            <div className={managerStyles.formGroup}>
              <label>Check-in Time</label>
              <input type="time" defaultValue="14:00" />
            </div>
            <div className={managerStyles.formGroup}>
              <label>Check-out Time</label>
              <input type="time" defaultValue="12:00" />
            </div>
            <div className={managerStyles.formGroup}>
              <label>Tax Rate (%)</label>
              <input type="number" defaultValue="12" />
            </div>
            <button className={managerStyles.saveBtn}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsManager;
