import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { amountOfCoffee, totalWater, pours } = location.state;

  function formatTimeToMMSS(totalSeconds) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      // Format minutes and seconds with leading zeros if needed
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Brewing Results</h1>
      
      <div style={summaryStyle}>
        <h2>Total Coffee: {amountOfCoffee} grams</h2>
        <h2>Total Water: {totalWater} grams</h2>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>Description</th>
            <th style={headerStyle}>Water (grams)</th>
            <th style={headerStyle}>Time (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {pours.map((pour, index) => (
            <tr key={index}>
              <td style={cellStyle}>{pour.description}</td>
              <td style={cellStyle}>{pour.cumulativeWater.toFixed(2)}</td>
              <td style={cellStyle}>{formatTimeToMMSS(pour.cumulativeTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>

	  <button onClick={() => navigate(-1)} style={backButtonStyle}>
        Back to Input Page
      </button>
    </div>
  );
}

const containerStyle = {
  padding: '20px',
  maxWidth: '800px',
  margin: 'auto',
  fontFamily: '"Roboto", sans-serif',
  lineHeight: '1.6',
};

const titleStyle = {
  fontSize: '2em',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'left',
};

const summaryStyle = {
  marginBottom: '20px',
  textAlign: 'left',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const headerStyle = {
  backgroundColor: '#00796b',
  color: '#fff',
  padding: '10px',
  textAlign: 'left',
  fontSize: '1.1em',
};

const cellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const backButtonStyle = {
  width: '100%',
  padding: '12px',
  marginTop: '20px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#ff5722', // Back button color (orange)
  color: '#fff',
  fontSize: '16px',
};

export default ResultsPage;
