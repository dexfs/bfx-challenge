
class OrderBook {
    buyOrders = []
    sellOrders = []
    construct(symbol) {
        this.symbol = symbol
    }
    addOrder(order) {
        if (order.side === 'Buy') {
            this.buyOrders.push(order)
        }   else if (order.side == 'Sell') {
            this.sellOrders.push(order)
        }
    }

    getOrders() {
        return [...this.buyOrders, ...this.sellOrders]
    }

    countBuys() {
        return this.buyOrders.length || 0
    }

    countSells() {
        return this.sellOrders.length || 0
    }
}

class Order {
    constructor(orderId, clientId, symbol, side, price, quantity) {
        this.orderId = orderId;
        this.clientId = clientId;
        this.symbol = symbol;
        this.side = side;
        this.price = price;
        this.quantity = quantity;
    }
}


module.exports = {Order, OrderBook}
