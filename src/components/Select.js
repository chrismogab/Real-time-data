import React from 'react'
import ChakraUI from './ChakraUI'
import { Select, option } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Selecting() {
  return (
    <>
      <div>
        {/* <Select placeholder="Select currency">
          <option value="option1">
            <Link to="/USD-BTC"> USD-BTC</Link>
          </option>
        </Select> */}

        <ul>
          <Link to="/BTC-USD">BTC-USD</Link>
          <Link to="/home">home</Link>
        </ul>
      </div>
    </>
  )
}

export default Selecting
