import { useEffect, useState } from 'react'

const client = new WebSocket('wss://ws-feed.pro.coinbase.com')

const LadderPrices = (product_id, depth = undefined) => {
  const [ob, setOB] = useState({
    product_id: product_id,
    buys: [],
    asks: [],
  })

  useEffect(() => {
    client.onopen = () => {
      client.send(
        JSON.stringify({
          type: 'subscribe',
          product_ids: [product_id],
          channels: ['level2_batch'],
        })
      )
    }

    client.onmessage = (message) => {
      const data = JSON.parse(message.data)

      if (data.type === 'snapshot') {
        setOB((prevLadder) => {
          // console.log('2rata' + data.asks[0])

          data.asks.sort((a, b) =>
            Number(a[0]) < Number(b[0])
              ? -1
              : Number(a[0]) > Number(b[0])
              ? 1
              : 0
          )
          data.bids.sort((a, b) =>
            Number(a[0]) < Number(b[0])
              ? 1
              : Number(a[0]) > Number(b[0])
              ? -1
              : 0
          )
          //console.log('setting from snapshot');
          // console.log({ ...prevLadder, asks: data.asks, buys: data.bids })
          // console.log(product_id)
          return {
            ...prevLadder,
            asks: data.asks.slice(0, depth),
            buys: data.bids.slice(0, depth),
          }
        })
      } else if (data.type === 'l2update') {
        const removedItems = data.changes.filter((el) => Number(el[2]) === 0)
        const removedAsks = removedItems
          .filter((el) => el[0] === 'sell')
          .map((el) => el[1])
        const removedBuys = removedItems
          .filter((el) => el[0] === 'buy')
          .map((el) => el[1])
        const addedItems = data.changes.filter((el) => Number(el[2]) !== 0)
        const addedAsks = addedItems
          .filter((el) => el[0] === 'sell')
          .map((el) => el.slice(1))
        const addedBuys = addedItems
          .filter((el) => el[0] === 'buy')
          .map((el) => el.slice(1))
        setOB((prevLadder) => {
          const asks = [...prevLadder.asks]
            .filter((ask) => !removedAsks.includes(ask[0]))
            .concat(addedAsks)
          const buys = [...prevLadder.buys]
            .filter((buy) => !removedBuys.includes(buy[0]))
            .concat(addedBuys)
          asks.sort((a, b) =>
            Number(a[0]) < Number(b[0])
              ? -1
              : Number(a[0]) > Number(b[0])
              ? 1
              : 0
          )
          buys.sort((a, b) =>
            Number(a[0]) < Number(b[0])
              ? 1
              : Number(a[0]) > Number(b[0])
              ? -1
              : 0
          )
          //console.log("setting from update");
          //console.log(prevLadder);
          //console.log({...prevLadder, asks: asks, buys: buys });
          return {
            ...prevLadder,
            asks: asks.slice(0, depth),
            buys: buys.slice(0, depth),
          }
        })
      } else if (data.type === 'subscriptions') {
      } else {
        console.log(data.type, 'nyekee')

        throw new Error()
      }
    }

    setTimeout(() => {
      client.close()
    }, 400000)
    //zedla lwaet honeh

    return () => {
      client.close()
    }
  }, [product_id, depth])

  return ob
}

export default LadderPrices
