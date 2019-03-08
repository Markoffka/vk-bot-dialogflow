const check = require('./utils/getPhoneStats');

module.exports = async ({ app }) => {
  app.bot.updates.hear(/(!|!!)тел ((\+7|7|8)+([0-9]){10})/i, async (ctx, next) => {
    let phone = ctx.$match[2]
    await ctx.send(`Ищу информацию`)
    await check(phone).then(info => {
      let iconRate = info.rate //✔⚠❔

      let intRate = parseInt(iconRate)
      if (intRate == 0) iconRate = '❔'
      else if (intRate > 0) iconRate = '✔'
      else if (intRate < 0) iconRate = '⚠'

      let addInfo = 'Для доп. информации искать с !!тел [номер]'
      if (ctx.$match[1] === '!!')
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
      `);

    })


    next()
  })
}
