// and then establishes a P2P connection it.
// It will then send { msg: 'hello' } to the RPC server

'use strict'
const CLIENT_ID="CLIENT_2"
const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const OrderBuilders = require("../builders/order");

const link = new Link({
    grape: 'http://127.0.0.1:40002'
})
let peer
const startPeer = () => {
    link.start()
    peer = new PeerRPCClient(link, {})
    peer.init()
}

const broadcast = async (order) => {
    console.log('broadcast', {order})
    const link = new Link({
        grape: 'http://127.0.0.1:30002'
    })
    link.start()
    const connectedPeer = new PeerRPCClient(link, {})
    connectedPeer.init()
    await OrderBuilders.requestAnOrder(order, connectedPeer)
}


const run = async () => {
    startPeer()
    const sellOrder = OrderBuilders.makeAnOrder({
        price: 10000,
        quantity: 2,
        clientId: CLIENT_ID,
        side: 'Sell'
    })
    await OrderBuilders.requestAnOrder(sellOrder, peer)
    await broadcast(sellOrder)
}

run()
    .catch(e => console.error(CLIENT_ID, e))

