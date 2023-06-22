// BEFORE RUNNING:
// ---------------
// 1. If not already done, enable the Google Sheets API
//   and check the quota for your project at
//   https://console.developers.google.com/apis/api/sheets
// 2. Get access keys for your application. See
//   https://developers.google.com/api-client-library/javascript/start/start-js#get-access-keys-for-your-application
// 3. For additional information on authentication, see
//   https://developers.google.com/sheets/api/quickstart/js#step_2_set_up_the_sample


function makeApiCall() {
  var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1wrvk6VCtuUzubQxRTR05k-3Jjf7zFvGDCnzmvrJLoW0',  // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    range: 'my-range',  // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    valueRenderOption: '',  // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    dateTimeRenderOption: '',  // TODO: Update placeholder value.
  };

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${params.spreadsheetId}/values/${params.range}`).then(response=> response.json()).then(data => {
    console.log(data);
  })
}

globalThis.handleCredentialResponse = async (response) => {
  console.log(response);
  makeApiCall();
}
