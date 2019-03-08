const globalOptions = {
  head: {
    title: 'Auda',
    metas : [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  }
}

module.exports = (app) => {
  app.get('/', (req, res) => {
    const data = {
      otherData: 'Something Else'
    };
    req.vueOptions = Object.assign({}, globalOptions)
    res.renderVue('./server/pages/index.vue', data, req.vueOptions);
  })

  app.get('*', (req, res) => {
    req.vueOptions = Object.assign({}, globalOptions)
    res.renderVue('./server/pages/error.vue')
  })
  app.get('/:id/:request', (req, res) => {
    req.vueOptions = Object.assign({
      head: {
        title: 'Auda | Запрос'
      }
    }, globalOptions)
    res.renderVue('./server/pages/create.vue')
  })
}