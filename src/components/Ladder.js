import React from 'react'
import LadderPrices from './LadderPrices'
import LadderView from './LadderView'
import Table from 'react-bootstrap/Table'

const Ladder = ({ product_id }) => {
  const { asks, buys } = LadderPrices(product_id)

  let spread = '...'
  if (asks[0] && buys[0]) {
    spread = (Number(asks[0][0]) - Number(buys[0][0])).toFixed(2)
  }
  // console.log('nyeke' + asks[0])

  return (
    <>
      <div className="Ladder">
        <LadderView type="ask" orders={asks} product_id={product_id} />
        <div className="Ladder__S">
          <div className="Ladder__SL">Spread:</div>
          <div className="Ladder__SP">{spread}</div>
        </div>
        <LadderView type="buy" orders={buys} product_id={product_id} />
        <div className="Ladder__header">
          <div className="Ladder__header1">Order Book</div>
          <div className="Ladder__header2">
            <div>Size</div>
            <div>Price</div>
          </div>
        </div>
        <div className="agg_div">
          <span className="agg_text">Aggregation</span>
          <span className="agg_nb">number</span>

          <button className="change-agg">-</button>
          <button className="change-agg">+</button>
        </div>
      </div>

      <br />
      <br />
    </>

    //hon bdk thota
  )
}

export default Ladder
