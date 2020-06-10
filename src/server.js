const express = require("express")
const routes = require("./routes.js")

const server = express()

server.use(routes)

server.listen(3000)