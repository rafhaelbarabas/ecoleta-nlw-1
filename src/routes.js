const express = require("express")
const server = express()

// Template Engine com nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

// Pasta publica
server.use(express.static("public"))

// Home
server.get("/", (req, res) => {
  return res.render("index.html", {
    title: "Seu marketplace de coletas"
  })
})

// Criar pontos de coleta
server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

// Resultados da pesquisa
server.get("/search", (req, res) => {
  return res.render("search-results.html")
})

module.exports = server;