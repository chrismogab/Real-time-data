import React from 'react'

const LadderView = ({ orders, type, depth = 20 }) => {
  return (
    <div
      className={
        type === 'ask'
          ? 'LadderView LadderView--ask'
          : 'LadderView LadderView--sell'
      }
    >
      {orders.slice(0, depth).map((order, index) => {
        return (
          <div className="LadderView__order" key={index}>
            <div className="LadderView__size">
              <div
                className="LadderView__bar"
                style={{ width: Math.min((order[1] / 5) * 25, 25) }}
              ></div>
              {order[1]}
            </div>
            <div className="LadderView__price">{order[0]}</div>
          </div>
        )
      })}
    </div>
  )
}

export default LadderView
