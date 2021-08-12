// server.js
/*const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

// With express
/*const express = require('express')
app.prepare().then(() => {
  express().use(handler).listen(3000)
})

// Without express
const { createServer } = require('http')
app.prepare().then(() => {
    createServer(handler).listen(3000)
})*/

const { createServer } = require('http');
const next = require('next');

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);


app.prepare().then(() => {

    let port = 5000;
    createServer(handler).listen(port, (err) => {
        if (err) throw err;
        console.log("Server is ready at port ", port);
    });
});