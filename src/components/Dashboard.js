import React, { useRef } from 'react'
import { Line } from 'react-chartjs-2'

function Dashboard({ price, data }) {
  const opts = {
    tooltips: {
      intersect: false,
      mode: 'index',
    },
    responsive: true,
  }
  if (price === '0.00') {
    return (
      <h2
        style={{
          position: 'absolute',
          marginTop: '-190px',
          marginLeft: '530px',
          fontSize: '30px',
        }}
      >
        Please select a currency pair
      </h2>
    )
  }
  return (
    <div className="dashboard">
      <h2
        style={{ position: 'relative', marginLeft: '100px', color: 'blue' }}
      >{`$${price}`}</h2>

      <div className="chart-container">
        <Line data={data} options={opts} />
      </div>
    </div>
  )
  //fik tnayem l opts ka2ann
}

export default Dashboard
