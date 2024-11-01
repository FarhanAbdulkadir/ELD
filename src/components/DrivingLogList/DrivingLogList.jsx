import React from 'react';

function DrivingLogList({ drivingLogs }) {
  return (
    <div>
      <h2>Driving Logs</h2>
      <ul>
        {drivingLogs.map(log => (
          <li key={log.id}>
            Location: {log.location}, Start Time: {new Date(log.start_time).toLocaleString()}, End Time: {new Date(log.end_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DrivingLogList;
