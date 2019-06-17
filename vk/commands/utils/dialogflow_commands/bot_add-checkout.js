const path = require('path')
const AddRowToSheet = require('../add_row_spreadsheet');

module.exports = async ({
  answer,
  ctx,
  next
}) => {
  let {
    parameters: params
  } = answer

  if (params['title'][0] != null && params['description'][0] != null && params['date'][0] != null && params['price'][0] != null) {

    console.log(params);

    return new Promise((res, rej) => {

      AddRowToSheet({
        title: params["title"][0],
        description: params["description"][0],
        date: params["date"][0],
        price: params["price"][0],
        status: false,
        id: `vk.com/id${ctx.senderId}`
      })


      res({
        result: "Ваш заказ был добавлен."
      })

    })
  } else {
    return;
  }
}