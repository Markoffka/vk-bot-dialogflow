const AddRowToSheet = require('../add_row_spreadsheet');

module.exports = async ({
  answer,
  ctx,
  next
}) => {
  let {
    parameters: params
  } = answer

  return new Promise((res, rej) => {
    AddRowToSheet({
      title: params["title"],
      description: params["description"],
      date: params["date"],
      price: params["price"],
      
    })  


    res({
      result: "Ваш заказ был добавлен."
    })
  })
}