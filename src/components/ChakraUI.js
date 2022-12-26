import { React, useState, useEffect } from 'react'
// import { Table } from "react-bootstrap";

import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
} from '@chakra-ui/react'

const client = new WebSocket('wss://ws-feed.pro.coinbase.com')

function Containers() {
  const [bestBidPrice, setBestBidPrice] = useState('')
  const [bestBidQuantity, setBestBidQuantity] = useState('')
  const [bestAskQuantity, setBestAskQuantity] = useState('')
  const [bestAskPrice, setBestAskPrice] = useState('')

  useEffect(() => {
    client.onopen = () => {
      client.send(
        JSON.stringify({
          type: 'subscribe',
          product_ids: ['BTC-USD'],
          channels: ['ticker'],
        })
      )
    }
    client.onmessage = (message) => {
      const data = JSON.parse(message.data)
      if (data.type === 'ticker') {
        // console.log('meshe lhallll')
      }
      if (data.product_id === 'BTC-USD') {
        // console.log('kamena meshe lhal')
        setBestBidPrice(data.best_bid)
        // console.log('best bid priced' + data.best_bid)
        setBestBidQuantity(data.best_bid_size)
        // console.log('best bid zie' + data.best_bid_size)
        setBestAskPrice(data.best_ask)
        // console.log('best_ask' + data.best_ask)
        setBestAskQuantity(data.best_ask_size)
        // console.log('best ask quantity' + data.best_ask_size)
        console.log(data.product_id)
      }
      if (data.profuct_id !== 'BTC-USD') {
        // console.log('akalna khara')
      }
      // console.log("newest" + message.data.price);
    }
  }, [])

  return (
    <>
      <select
        placeholder="select"
        name="select"
        style={{
          marginLeft: '670px',
          border: ' 3px solid blue',
          backgroundColor: 'blue',
          color: 'white',
        }}
      >
        <option value="option1">chris</option>
        <option VALUE="OPTION 2"> STEPH</option>
      </select>
      <TableContainer
        marginTop="20px"
        width="400px"
        paddingBottom="60px"
        marginLeft="20px"
      >
        <Table variant="simple" border="1px solid grey">
          <Thead>
            <Tr>
              <Th
                height="60px"
                bgColor="blue"
                color="white"
                fontSize="20px"
                textAlign="left"
                paddingLeft="10px"
              >
                Best Bid
              </Th>
            </Tr>

            <Tbody height="80px">
              <Td
                width="200px"
                borderRight="1px solid grey"
                fontSize="15px"
                color="black"
              >
                <p style={{ fontWeight: 'bold' }}>{bestBidPrice}</p>
                <p>Bid price</p>
              </Td>

              <Td width="200px" fontSize="15px" textAlign="right" color="black">
                <p style={{ fontWeight: 'bold' }}>{bestBidQuantity}</p>
                <p>Bid quantity</p>
              </Td>
            </Tbody>
          </Thead>
        </Table>
      </TableContainer>
      <TableContainer
        marginTop="-203px"
        width="400px"
        paddingBottom="60px"
        marginLeft="1015px"
      >
        <Table variant="simple" border="1px solid grey">
          <Thead>
            <Tr>
              <Th
                height="60px"
                bgColor="blue"
                color="white"
                fontSize="20px"
                textAlign="left"
                paddingLeft="10px"
              >
                Best Ask
              </Th>
            </Tr>

            <Tbody height="80px">
              <Td
                width="200px"
                borderRight="1px solid grey"
                fontSize="15px"
                color="black"
              >
                <p style={{ fontWeight: 'bold' }}>{bestAskPrice}</p>
                <p>Bid price</p>
              </Td>

              <Td width="200px" fontSize="15px" textAlign="right" color="black">
                <p style={{ fontWeight: 'bold' }}>{bestAskQuantity}</p>
                <p>Bid quantity</p>
              </Td>
            </Tbody>
          </Thead>
        </Table>
      </TableContainer>
    </>
  )
}

export default Containers
