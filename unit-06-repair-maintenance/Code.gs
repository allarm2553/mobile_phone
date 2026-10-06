/**
 * Google Apps Script - หน่วยที่ 6: การตรวจซ่อมและการบำรุงรักษาเครื่องโทรศัพท์เคลื่อนที่
 * คัดลอกโค้ดนี้ไปวางใน Extensions > Apps Script ของ Google Sheets
 * แล้วกด Deploy > New Deployment > Web app (Execute as: Me, Who has access: Anyone)
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = getOrCreateSheet();
    var data = JSON.parse(e.postData.contents);
    
    // ตรวจสอบการส่งซ้ำด้วย รหัสนักศึกษา
    var studentId = String(data.studentId).trim();
    if (isDuplicate(sheet, studentId)) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "duplicate",
        message: "รหัสนักศึกษานี้ได้ทำแบบทดสอบไปแล้ว ไม่สามารถส่งซ้ำได้"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // บันทึกผลคะแนน
    var timestamp = new Date();
    var missed = Array.isArray(data.missedQuestions) ? data.missedQuestions.join(", ") : (data.missedQuestions || "-");
    
    sheet.appendRow([
      timestamp,
      studentId,
      data.studentName || "-",
      data.studentGroup || "-",
      data.score,
      data.totalQuestions,
      missed,
      data.timeSpent || "-"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "บันทึกข้อมูลเรียบร้อยแล้ว"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var sheet = getOrCreateSheet();
    var action = e.parameter.action;
    
    if (action === "check") {
      var studentId = String(e.parameter.studentId).trim();
      var exists = isDuplicate(sheet, studentId);
      return ContentService.createTextOutput(JSON.stringify({
        status: "ok",
        exists: exists
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "ok",
      message: "API หน่วยที่ 6 ทำงานปกติ"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function isDuplicate(sheet, studentId) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;
  
  var idColumnValues = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (var i = 0; i < idColumnValues.length; i++) {
    if (String(idColumnValues[i][0]).trim() === studentId) {
      return true;
    }
  }
  return false;
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "Responses_Unit6";
  var sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headers = [
      "วัน-เวลาที่ส่ง",
      "รหัสนักศึกษา",
      "ชื่อ-นามสกุล",
      "กลุ่มเรียน/ห้อง",
      "คะแนนที่ได้",
      "คะแนนเต็ม",
      "ข้อที่ตอบผิด",
      "เวลาที่ใช้"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#fee2e2");
    sheet.setFrozenRows(1);
  }
  return sheet;
}
