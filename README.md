# The BFX challenge



## install dependencies

```bash
$ npm i -g grenache-grape
$ npm install
```

## How to run

```bash
// grape grapes nodes
$ npm run grapes

// run servers
$ npm run server1
$ npm run server2
```

## How run the clients
> must be execute in separate terminal instance

```bash
// client1
$ npm run client1
// client 2
$ npm run client2
```

## Tasks 

[x] Each client will have its own instance of the orderbook.

[ ] Clients submit orders to their own instance of orderbook. The order is distributed to other instances, too.

[ ] If a client's order matches with another order, any remainer is added to the orderbook, too.

## Problems
[ ] There is communtion problems 

[ ] it's not possible to send dynamica inputs 

[ ] Hard coded links 
