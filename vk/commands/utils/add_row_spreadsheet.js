module.exports = ({
  title,
  description,
  date,
  price,
  status,
  id
}) => {
  //FIXME: ДОДЕЛАТЬ
  return new Promise((res, rej) => {
    var sheet_id = "1z4lTwua84wIvoW0TkhJY-Y-TrMcW9jUGPrCJJuG_iG4";
    var secret = "ZhB4UEyqbol2qWr_Wz1T8GqY";
    var client_id =
      "1051873956520-b7mjd4rr137mnuacs3lcduvgrnor9esi.apps.googleusercontent.com";

    const SheetsAPI = require('sheets-api');
    const sheets = new SheetsAPI();
    const SPREADSHEET_ID = sheet_id;
    let payload = {
      spreadsheetId: SPREADSHEET_ID,
      range: "DES!A1:D1",
      valueInputOption: 'USER_ENTERED',
      resource: {
        majorDimension: "ROWS",
        values: [
          [title, date, description, id, price, status]
        ]
      }
    }

    sheets
      .authorize()
      .then(auth => sheets.values('append', auth, payload))
      .then(response => {
        res(response.toString());
      })
  })
}