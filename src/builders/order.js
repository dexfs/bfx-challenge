const {Order} = require("../schemas/OrderBook");
const {TCOINT_USD} = require("../shared/coin-types");
const {randomUUID} = require('node:crypto');

const makeAnOrder = ({price, quantity = 1, clientId, side = 'Buy' }) => {
    return new Order(randomUUID(), clientId, TCOINT_USD, side, price, quantity);
}

const peerRequest = async (peer, resource, payload, options) => {
    return new Promise((resolve, reject) => {
        peer.request(resource, payload, options, (err, data) => {
            console.log('Request from', data)
            if (err) {
                reject(err)
            }
            console.log({data})
            resolve(data)
        })
    })

}

const requestAnOrder = async (buyOrder, peer) => {
    try {
        const result = await peerRequest(peer, 'buy_order', buyOrder, {timeout: 10000})
        return result
    } catch (e) {
        console.error("ERROR", e)
    }
}

module.exports = {requestAnOrder, makeAnOrder}
