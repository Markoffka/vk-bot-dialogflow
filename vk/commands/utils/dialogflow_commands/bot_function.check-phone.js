let check = require('../getPhoneStats')

module.exports = async ({answer, ctx, next}) => {
let {parameters:params} = answer
  if (params['phone-number'] != '') {
    return await check(params['phone-number']).then(info => {
      let iconRate = info.rate
      let intRate = parseInt(iconRate)
      if (intRate == 0) iconRate = 'неизвестный'
      else if (intRate > 0) iconRate = 'хороший'
      else if (intRate < 0) iconRate = 'плохой'
      return new Promise((res, err)=>{
        res({"rate": iconRate})
      })
      //TODO: Добавить дополнительную информацию в вывод
      /* let addInfo = 'Для доп. информации искать с !!тел [номер]'
      if (params['bot_ext_phoneAddidational-info'] != '')
        addInfo = `Неизвестно......: ${info.stats.unknowed} 
        Коллекторы.....: ${info.stats.collector} 
        Мошенники.....: ${info.stats.scam} 
        Спам.................: ${info.stats.spam} 
        Опрос...............: ${info.stats.poll} 
        Оскорбление...: ${info.stats.abuse} 
        Положительно: ${info.stats.good} 
        Реклама...........: ${info.stats.promo}
      `
      ctx.send(`Телефон....: ${info.formatted} 
      Код.............: ${info.code} 
      Регион.......: ${info.region} 
      Оператор..: ${info.operator}
      Тип.............: ${info.type}
      Рейтинг.....: ${info.rate} ${iconRate}
      --
      ${addInfo}
    `); */
    })
  }
  return {}
}