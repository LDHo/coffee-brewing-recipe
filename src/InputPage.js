import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InputPage() {
  const navigate = useNavigate();
  
  // State variables for each field
  const [amountOfCoffee, setAmountOfCoffee] = useState(15, '');
  const [brewRatio, setBrewRatio] = useState(15); // Default brew ratio (1:X)
  const [firstPourRatio, setFirstPourRatio] = useState(60); // Default first pour ratio (in percentage)
  const [numPours, setNumPours] = useState(1); // Default number of pours for last 60%
  const [pourTime, setPourTime] = useState(30); // Default time per pour (seconds)
  
  const handleSubmit = () => {
    const totalWater = amountOfCoffee * brewRatio; // Calculate total water based on coffee and brew ratio
    const firstPourWater = totalWater * 0.4 * (firstPourRatio / 100);
    const secondPourWater = totalWater * 0.4 * ((100 - firstPourRatio) / 100);
    const remainingWater = totalWater * 0.6;
    const pourAmount = remainingWater / numPours; // Divide the remaining water by number of pours

    // Initialize cumulative totals
    let cumulativeWater = 0;
    let cumulativeTime = 0;

    const pours = [];
    
    // First pour (40% phase)
    cumulativeWater += firstPourWater;
    cumulativeTime += pourTime;
    pours.push({ description: `First Pour (40% phase)`, water: firstPourWater, time: pourTime, cumulativeWater, cumulativeTime });

    // Second pour (40% phase)
    cumulativeWater += secondPourWater;
    cumulativeTime += pourTime;
    pours.push({ description: `Second Pour (40% phase)`, water: secondPourWater, time: pourTime, cumulativeWater, cumulativeTime });

    // Remaining pours (60% phase)
    for (let i = 0; i < numPours; i++) {
      cumulativeWater += pourAmount;
      cumulativeTime += pourTime + (i * 2); // Add incremental time for each subsequent pour
      pours.push({ description: `Pour ${i + 3} (60% phase)`, water: pourAmount, time: pourTime + (i * 2), cumulativeWater, cumulativeTime });
    }

    navigate('/results', { state: { amountOfCoffee, totalWater, pours } });
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Coffee Brewing Calculator</h1>

      <div>
        <label style={labelStyle}>Amount of Coffee (grams):</label>
        <input
          type="number"
          value={amountOfCoffee}
          onChange={(e) => setAmountOfCoffee(e.target.value)}
          style={inputStyle}
          placeholder="Enter total coffee in grams"
        />
      </div>

      <div>
        <label style={labelStyle}>Brew Ratio (1:X):</label>
        <input
          type="number"
          value={brewRatio}
          onChange={(e) => setBrewRatio(e.target.value)}
          style={inputStyle}
          placeholder="Enter brew ratio"
        />
      </div>

      <div>
        <label style={labelStyle}>First Pour Ratio for First 40% (0-100%):</label>
        <input
          type="number"
          min="0"
          max="100"
          value={firstPourRatio}
          onChange={(e) => setFirstPourRatio(parseInt(e.target.value))}
          style={inputStyle}
          placeholder="Enter first pour ratio"
        />
      </div>

      <div>
        <label style={labelStyle}>Number of Pours for Last 60%:</label>
        <input
          type="number"
          min="1"
          max="6"
          value={numPours}
          onChange={(e) => setNumPours(parseInt(e.target.value))}
          style={inputStyle}
          placeholder="Enter number of pours for last 60%"
        />
      </div>

      <div>
        <label style={labelStyle}>Time Period per Pour (seconds):</label>
        <input
          type="number"
          min="1"
          value={pourTime}
          onChange={(e) => setPourTime(parseInt(e.target.value))}
          style={inputStyle}
          placeholder="Enter time per pour"
        />
      </div>

      <button onClick={handleSubmit} style={buttonStyle}>Calculate</button>
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
  fontSize: '1.8em',
  fontWeight: 'bold',
  color: '#333',
};

const labelStyle = {
  fontSize: '1.1em',
  fontWeight: 'bold',
  color: '#444',
  marginBottom: '8px',
  display: 'block',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  width: 'calc(100% - 20px)', // Account for padding
  marginBottom: '10px',
  marginRight: '10px', // Right margin
  border: '1px solid #ddd', // Border to make right border visible
  borderRadius: '5px', // Optional rounded corners
};


const buttonStyle = { 
  width: '100%', 
  padding: '12px', 
  marginTop: '20px', 
  border: 'none', 
  borderRadius: '5px', 
  backgroundColor: '#00796b', 
  color: '#fff', 
  fontSize: '16px' 
};

export default InputPage;
