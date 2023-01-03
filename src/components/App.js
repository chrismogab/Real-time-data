import Ladder from './Ladder'
import '../styles.css'
import ChakraUI from './Containers'
import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@chakra-ui/react'
import Containers from './Containers'
import { formatData } from './Chart'
import Dashboard from './Dashboard'

export default function App() {
  const [currencies, setcurrencies] = useState([])
  const [pair, setpair] = useState('')
  const [price, setprice] = useState('0.00')
  const [bestBidPrice, setBestBidPrice] = useState('')
  const [bestBidQuantity, setBestBidQuantity] = useState('')
  const [bestAskQuantity, setBestAskQuantity] = useState('')
  const [bestAskPrice, setBestAskPrice] = useState('')
  const [selected, setSelected] = useState('')
  const [pastData, setpastData] = useState({})
  const [idTry, setIdTry] = useState('')

  const ws = useRef(null)

  let first = useRef(false)
  const url = 'https://api.pro.coinbase.com'

  useEffect(() => {
    ws.current = new WebSocket('wss://ws-feed.pro.coinbase.com')

    let pairs = []

    const apiCall = async () => {
      await fetch(url + '/products')
        .then((res) => res.json())
        .then((data) => (pairs = data))
      console.log('pairs', pairs)
      // console.log('chrisyahmar' + pairs.id)

      let filtered = pairs.filter((pair) => {
        if (pair.id === 'BTC-USD') {
          return pair
        }
        if (pair.id === 'ETH-USD') {
          return pair
        }
        if (pair.id === 'BCH-USD') {
          return pair
        }
        if (pair.id === 'LTC-USD') {
          return pair
        }
        setIdTry(pair.id)
      })

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1
        }
        if (a.base_currency > b.base_currency) {
          return 1
        }
        return 0
      })

      setcurrencies(filtered)
      // console.log(filtered)

      first.current = true
    }

    apiCall()
  }, [])

  useEffect(() => {
    if (!first.current) {
      return
    }

    let msg = {
      type: 'subscribe',
      product_ids: [pair],
      channels: ['ticker'],
    }
    let jsonMsg = JSON.stringify(msg)
    ws.current.send(jsonMsg)
    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`
    const fetchHistoricalData = async () => {
      let dataArr = []
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data))
      // console.log('sexyboyy' + data)

      let formattedData = formatData(dataArr)
      setpastData(formattedData)
    }

    fetchHistoricalData()

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data)

      if (data.type !== 'ticker') {
        return
      }

      if (data.product_id === pair) {
        setprice(data.price)
        setBestBidPrice(data.best_bid)
        setBestBidQuantity(data.best_bid_size)
        setBestAskPrice(data.best_ask)
        setBestAskQuantity(data.best_ask_size)
        // setSelected(data.product_id)
      }
    }
  }, [pair])

  const handleSelect = (e) => {
    let unsubMsg = {
      type: 'unsubscribe',
      product_ids: [pair],
      channels: ['ticker'],
    }
    let unsub = JSON.stringify(unsubMsg)

    ws.current.send(unsub)

    setpair(e.target.value)
    setSelected(e.target.value)
  }
  let chrissy = selected.toString

  return (
    <div className="container">
      {
        <select
          style={{ marginLeft: '660px', border: '1px solid' }}
          name="currency"
          value={pair}
          onChange={handleSelect}
        >
          {currencies.map((cur, idx) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            )
          })}
        </select>
      }

      <Containers
        best_bid_price={bestBidPrice}
        best_bid_quantity={bestBidQuantity}
        best_ask_price={bestAskPrice}
        best_ask_quantity={bestAskQuantity}
      />
      <h2 style={{ position: 'relative', marginLeft: '100px', color: 'blue' }}>
        {' '}
        {pair}
      </h2>
      <Dashboard price={price} data={pastData} />

      <Ladder product_id="BTC-USD" />
    </div>
  )
}
