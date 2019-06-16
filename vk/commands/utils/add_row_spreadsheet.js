module.exports = () => {
  //FIXME: ДОДЕЛАТЬ
  return new Promise((res, rej) => {
    var sheet_id = "1z4lTwua84wIvoW0TkhJY-Y-TrMcW9jUGPrCJJuG_iG4";
    var secret = "ZhB4UEyqbol2qWr_Wz1T8GqY";
    var client_id =
      "1051873956520-b7mjd4rr137mnuacs3lcduvgrnor9esi.apps.googleusercontent.com";

    const SheetsAPI = require('sheets-api');
    const sheets = new SheetsAPI();
    const SPREADSHEET_ID = sheet_id;
    var date = new Date();
    var toDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    let payload = {
      spreadsheetId: SPREADSHEET_ID,
      range: "DES!A1:D1",
      valueInputOption: 'USER_ENTERED',
      resource: {
        majorDimension: "ROWS",
        values: [
          ["хз как назвать", toDate, "Сделай что нибудь", "vk.com/furryanonim", 2700, false]
        ]
      }
    }

    sheets
      // Get me an authorized OAuth2 client thats ready to make requests.
      .authorize()

      // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
      // Using the spreadsheets.values collection, use the 'append' method to
      // append data (payload) to a spreadsheet.
      .then(auth => sheets.values('append', auth, payload))

      // 'response' is an object that contains the response from the request to the
      // API (append) and the OAuth2 client to be chained further. It looks like this:
      // {auth:auth, response:response}
      .then(response => sheets.values('get', response.auth, {
        spreadsheetId: SPREADSHEET_ID,
        range: 'Orders!A1:D1'
      }))

      // The results of the request to spreadsheets.values.get collection.
      .then(response => {
        res(response.toString());
      })
  })
}