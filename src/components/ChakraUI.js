import React, { useRef } from 'react'
import { Line } from 'react-chartjs-2'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
} from '@chakra-ui/react'

function Containers({
  best_bid_price,
  best_bid_quantity,
  best_ask_price,
  best_ask_quantity,
  da,
}) {
  if (best_bid_price === '0.00') {
    return <h2>please select a currency pair</h2>
  }
  return (
    // <div className="dashboard">
    //   <h2>{`$${price}`}</h2>

    //   <div className="chart-container">
    //     {/* <Line data={data} options={opts} /> */}
    //   </div>

    <>
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
              <Tr>
                <Td
                  width="200px"
                  borderRight="1px solid grey"
                  fontSize="15px"
                  color="black"
                >
                  <p style={{ fontWeight: 'bold' }}> {`${best_bid_price}`}</p>
                  <p>Bid price</p>
                </Td>

                <Td
                  width="200px"
                  fontSize="15px"
                  textAlign="right"
                  color="black"
                >
                  <p style={{ fontWeight: 'bold' }}>
                    {' '}
                    {`${best_bid_quantity}`}
                  </p>
                  <p>Bid quantity</p>
                </Td>
              </Tr>
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
                <p style={{ fontWeight: 'bold' }}>{`${best_ask_price}`}</p>
                <p>Bid price</p>
              </Td>

              <Td width="200px" fontSize="15px" textAlign="right" color="black">
                <p style={{ fontWeight: 'bold' }}>{`${best_ask_quantity}`}</p>
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
