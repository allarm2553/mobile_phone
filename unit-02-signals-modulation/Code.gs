/**
 * =========================================================================
 * Google Apps Script (Code.gs)
 * ระบบบันทึกผลคะแนนแบบทดสอบและตรวจสิทธิ์ป้องกันการส่งซ้ำ
 * หน่วยที่ 2: ระบบสัญญาณและการมอดูเลชันในระบบโทรศัพท์เคลื่อนที่
 * =========================================================================
 * 
 * วิธีการนำไปใช้งาน:
 * 1. เปิด Google Sheet ที่ต้องการเก็บคะแนน
 * 2. ไปที่เมนู ส่วนขยาย (Extensions) > Apps Script
 * 3. ลบโค้ดเดิมทั้งหมด แล้วคัดลอกโค้ดนี้ไปวาง
 * 4. กด บันทึก (Save - ไอคอนรูปแผ่นดิสก์)
 * 5. กด การทำให้ใช้งานได้ (Deploy) > การทำให้ใช้งานได้รายการใหม่ (New deployment)
 * 6. เลือกประเภท: เว็บแอป (Web app)
 *    - คำอธิบาย: บันทึกคะแนน Mobile Unit 2 (ป้องกันส่งซ้ำ)
 *    - ดำเนินการในฐานะ (Execute as): ฉัน (Me)
 *    - ผู้มีสิทธิ์เข้าถึง (Who has access): ทุกคน (Anyone)  *** สำคัญมาก ***
 * 7. กด การทำให้ใช้งานได้ (Deploy) และให้สิทธิ์การเข้าถึง (Authorize access)
 * 8. คัดลอก URL ของเว็บแอป (ลงท้ายด้วย /exec) นำไปใส่ในเมนู "ตั้งค่าสำหรับครูผู้สอน"
 */

function getOrCreateResponseSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Responses_Unit2");
  
  if (!sheet) {
    sheet = ss.insertSheet("Responses_Unit2");
  }

  // สร้างแถวหัวตารางหากยังไม่มีข้อมูล
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "วัน-เวลา (Timestamp)",
      "รหัสนักศึกษา (Student ID)",
      "ชื่อ-นามสกุล (Full Name)",
      "คะแนนที่ได้ (Score)",
      "คะแนนเต็ม (Total Score)",
      "คิดเป็นร้อยละ (Percentage)",
      "หน่วยการเรียนรู้ (Unit)"
    ]);
    sheet.getRange(1, 1, 1, 7)
      .setFontWeight("bold")
      .setBackground("#1e293b")
      .setFontColor("#38bdf8")
      .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

/**
 * ฟังก์ชันตรวจสอบว่ารหัสประจำตัวนี้เคยส่งแบบทดสอบแล้วหรือไม่
 */
function checkDuplicate(studentId) {
  if (!studentId || String(studentId).trim() === "") {
    return { duplicate: false };
  }
  
  var cleanId = String(studentId).trim();
  var sheet = getOrCreateResponseSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow > 1) {
    var ids = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      if (String(ids[i][0]).trim() === cleanId) {
        return {
          duplicate: true,
          row: i + 2,
          message: "รหัสประจำตัว " + cleanId + " เคยส่งแบบทดสอบหน่วยที่ 2 ไปแล้ว (ไม่อนุญาตให้ส่งซ้ำ)"
        };
      }
    }
  }
  
  return { duplicate: false };
}

/**
 * รองรับการตรวจสอบผ่าน GET request เช่น ?action=check&studentId=xxx
 */
function doGet(e) {
  var params = e ? e.parameter : {};
  if (params.action === "check" && params.studentId) {
    var result = checkDuplicate(params.studentId);
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "Google Apps Script Web App สำหรับหน่วยที่ 2 พร้อมใช้งาน"
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * บันทึกคะแนนผ่าน POST request
 */
function doPost(e) {
  try {
    var sheet = getOrCreateResponseSheet();
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    var studentId = String(data.studentId || "").trim();
    var studentName = String(data.studentName || "").trim();
    var score = Number(data.score) || 0;
    var totalScore = Number(data.totalScore) || 5;
    var percentage = ((score / totalScore) * 100).toFixed(2) + "%";
    var unitTitle = data.unitTitle || "หน่วยที่ 2: ระบบสัญญาณและการมอดูเลชันในระบบโทรศัพท์เคลื่อนที่";

    if (!studentId) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "กรุณาระบุรหัสประจำตัวนักศึกษา"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ตรวจสอบการส่งซ้ำ
    var dupCheck = checkDuplicate(studentId);
    if (dupCheck.duplicate) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "duplicate",
        duplicate: true,
        message: "❌ รหัสประจำตัว " + studentId + " ได้ส่งผลคะแนนหน่วยที่ 2 ไปแล้ว ไม่อนุญาตให้ส่งซ้ำครับ"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // บันทึกข้อมูลลงชีต
    var timestamp = new Date();
    sheet.appendRow([
      timestamp,
      studentId,
      studentName,
      score,
      totalScore,
      percentage,
      unitTitle
    ]);

    var newLastRow = sheet.getLastRow();
    sheet.getRange(newLastRow, 1, 1, 1).setHorizontalAlignment("center");
    sheet.getRange(newLastRow, 2, 1, 1).setHorizontalAlignment("center");
    sheet.getRange(newLastRow, 4, 1, 3).setHorizontalAlignment("center");

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      duplicate: false,
      message: "บันทึกผลคะแนนเรียบร้อยแล้ว",
      received: {
        studentId: studentId,
        studentName: studentName,
        score: score
      }
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
