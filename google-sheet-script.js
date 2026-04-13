function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;
  
  // Create a timestamp
  var timestamp = new Date();
  
  // Append row to sheet: Timestamp, Name, Email, Company, Phone, Subject, Message
  try {
    // Honeypot check: If _gotcha is filled, it's a bot.
    // Return success but don't record the data to prevent sheet clutter.
    if (data._gotcha && data._gotcha !== "") {
      return ContentService.createTextOutput(JSON.stringify({
        "result": "success",
        "message": "Data recorded successfully"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      timestamp, 
      data.name, 
      data.email, 
      data.company,
      data.phone, 
      data.subject, 
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "message": "Data recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
