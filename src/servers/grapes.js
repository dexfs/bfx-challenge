const Grape = require('grenache-grape').Grape

const grapes = [{
    dht_port: 20001,
    dht_bootstrap: [
        '127.0.0.1:20002'
    ],
    api_port: 30001

}, {
    dht_port: 20002,
    dht_bootstrap: [
        '127.0.0.1:20001'
    ],
    api_port: 30002
},
    {
        dht_port: 20004,
        dht_bootstrap: [
            '127.0.0.1:20005'
        ],
        api_port: 40001
    },
    {
        dht_port: 20005,
        dht_bootstrap: [
            '127.0.0.1:20004'
        ],
        api_port: 40002
    }

]

for (grapeConf of grapes) {
    let g = new Grape(grapeConf)
    console.log(grapeConf)
    g.start()
}

