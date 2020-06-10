const express = require("express")
const server = express()

// Template Engine com nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

server.use(express.static("public"))

server.get("/", (req, res) => {
  return res.render("index.html", {
    title: "Seu marketplace de coletas"
  })
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
  return res.render("search-results.html")
})

module.exports = server;