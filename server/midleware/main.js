module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({from:'Server', message: "Hello, from Auda"})
  })
  app.get('*', (req, res) => {
    res.sendStatus(404)
  })
}