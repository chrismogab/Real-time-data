import { React, usestate, useEffect } from 'react'

import OB from './OB'
import '../styles.css'
import ChakraUI from './ChakraUI'
import { Route, Routes } from 'react-router-dom'
import Selecting from './Select'
export default function App() {
  // const [pair, setPair] = usestate('')
  // // const [currencies, setCureencies] = usestate([])
  // const client = new WebSocket('wss://ws-feed.pro.coinbase.com')
  // const [currencies, setCurrencies] = usestate([])

  // stilll need to do the pair what u wanna do is tdo the routes and use parameters to change the link!!

  // useEffect(() => {
  //   const getPais = () => {
  //     const pairs = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD']

  //     let filtered = pairs.filter((pair) => {
  //       // if (pair.quote_currency === "USD") {
  //       //   return pair;
  //       // if (pair.quote_currency === "USD") {
  //       //   return pair;
  //       // }
  //       if (pair.id === 'ETH-USD') {
  //         return pair
  //       }
  //       if (pair.id === 'BCH-USD') {
  //         return pair
  //       }
  //       if (pair.id === 'BTC-USD') {
  //         return pair
  //       }
  //       if (pair.id === 'LTC-USD') {
  //         return pair
  //       }
  //     })
  //     filtered = filtered.sort((a, b) => {
  //       if (a.base_currency < b.base_currency) {
  //         return -1
  //       }
  //       if (a.base_currency > b.base_currency) {
  //         return 1
  //       }
  //       return 0
  //     })
  //     console.log(filtered)
  //     //setcuurrencies to set new list of currencies
  //     setCurrencies(filtered)
  //   }
  //   getPais()
  // }, [])
  // useEffect(() => {
  //   ChakraUI()
  // }, [pair])

  // const handleSelect = (e) => {
  //   console.log(e.target.value)
  //   let unsubMsg = {
  //     type: 'unsubscribe',
  //     product_ids: [pair],
  //     channels: ['ticker'],
  //   }
  //   let unsub = JSON.stringify(unsubMsg)

  //   client.current.send(unsub)

  //   setPair(e.target.value)
  // }

  return (
    <>
      {/* <select name="currency" value={pair} onChange={handleSelect}>
        {currencies.map((cur, idx) => {
          return (
            <option key={idx} value={cur.id}>
              {cur.display_name}
            </option>
          )
        })}
      </select> */}
      <ChakraUI />

      <OB product_id="BTC-USD" />
      {/* <Selecting />
      <Routes>
        <Route
          path="/BTC-USD"
          element={((<OB product_id="BTC-USD" />), (<ChakraUI />))}
        />
        <Route path="/home" element={<Selecting />} />
      </Routes> */}
    </>
  )
}
