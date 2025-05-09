import React, { useEffect, useState } from 'react';
import { getWorkshopStats } from '../services/api'; // Adjust path as needed

const MainStatsHeader = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [stats, setStats] = useState({ totalParticipants: 0, totalWorkshops: 0 });

  const yearOptions = [];
  for (let y = currentYear; y >= currentYear - 5; y--) {
    yearOptions.push(y);
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getWorkshopStats(selectedYear);
        setStats({
          totalParticipants: data.totalParticipants || 0,
          totalWorkshops: data.totalWorkshops || 0,
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };
    fetchStats();
  }, [selectedYear]);

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <label style={styles.label}>Session (Year):</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={styles.select}
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}-{parseInt(year) + 1}
            </option>
          ))}
        </select>

        <div style={styles.statBox}>
          <strong>Total Participants:</strong> {stats.totalParticipants}
        </div>

        <div style={styles.statBox}>
          <strong>Total Workshops:</strong> {stats.totalWorkshops}
        </div>
      </div>
    </div>
  );
};

export default MainStatsHeader;