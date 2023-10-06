// This RPC server will announce itself as `rpc_test`
// in our Grape Bittorrent network
// When it receives requests, it will answer with 'world'

'use strict'
const { PeerRPCServer }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const {OrderBook} = require("../schemas/OrderBook");
const {TCOINT_USD} = require("../shared/coin-types");

const link = new Link({
    grape: 'http://127.0.0.1:40001'
})
link.start()

const peer = new PeerRPCServer(link, {
    timeout: 300000
})
peer.init()

const port = 1024 + Math.floor(Math.random() * 1000)
const service = peer.transport('server')
service.listen(port)


setInterval(function () {
    link.announce('buy_order', service.port, {})
}, 1000)

service.on('request', (rid, key, payload, handler) => {
    if (key === "buy_order") {
        return buyOrder(payload, handler)
    }
    return
})
let tCoinOrderBook;
const makeOrderBook = () => {
    if (tCoinOrderBook) return tCoinOrderBook
    tCoinOrderBook = new OrderBook(TCOINT_USD);
    return tCoinOrderBook
}


const buyOrder = (payload, handler) => {
    console.log({payload, handler})
    makeOrderBook().addOrder(payload)
    console.log(`Local OrderBook  SRV_CLIENT_1`, {
        buys: tCoinOrderBook.countBuys(),
        sells: tCoinOrderBook.countSells()
    })

    handler.reply(null, {msg: 'received'})
}
