const googleSheetFileID = "XXXXX";
const sheetName = "sheetName";
const spreadsheet = SpreadsheetApp.openById(googleSheetFileID);
const sheet = spreadsheet.getSheetByName(sheetName);

function myFunction() {
  // เช็คจำนวน Row ทั้งหมด
  const lastRow = sheet.getLastRow();
  // เช็คจำนวน Column ทั้งหมด
  const latCol = sheet.getLastColumn();
}

function doGet(e) {
  if (e.parameter) {
    // D Delete
    if (e.parameter.action == "delete") {
      const response = deleteRow(sheet, e.parameter.rowId);
      return ContentService.createTextOutput(response).setMimeType(
        ContentService.MimeType.TEXT
      );
    }
  }

  // R Read
  const json = getDataWithKey(sheet);
  return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  const request = {
    contents: JSON.parse(e.postData.contents),
    parameters: e.parameter,
    postDataType: e.postData.type,
  };
  if (e.parameter && e.parameter.action) {
    // C create
    if (e.parameter.action == "create") {
      const response = createNewRow(sheet, request.contents);
      return ContentService.createTextOutput(response).setMimeType(
        ContentService.MimeType.TEXT
      );
    } // U Update
    if (e.parameter.action == "update") {
      const response = updateRow(sheet, request.contents);
      return ContentService.createTextOutput(response).setMimeType(
        ContentService.MimeType.TEXT
      );
    }
  }

  return ContentService.createTextOutput("No Action").setMimeType(
    ContentService.MimeType.TEXT
  );
}

// เพิ่มข้อมูลใหม่
function createNewRow(sheet, data) {
  try {
    dataForNewRow = [];
    getKeyfield(sheet).forEach((value, index) => {
      dataForNewRow.push(data[value]);
    });
    sheet.appendRow(dataForNewRow);
    return "success";
  } catch (e) {
    return e;
  }
}

// แก้ไขข้อมูล

function updateRow(sheet, data) {
  try {
    getKeyfield(sheet).forEach((fieldName, index) => {
      sheet.getRange(data.row, index + 1).setValue(data[fieldName]);
    });

    return "success";
  } catch (e) {
    return e;
  }
}

// ลบข้อมูล
function deleteRow(sheet, rowId) {
  try {
    sheet.getRange(Number(rowId) + 1, 1).setValue("Deleted!");
    return "success";
  } catch (e) {
    return e;
  }
}

// ดึงข้อมูลในรูปแบบของ object
function getDataWithKey(sheet) {
  // ดึงข้อมูลทั้งหมด
  const rawDatas = sheet.getDataRange().getValues();
  const keyField = getKeyfield(sheet);
  // รวมข้อมูลแถวที่ 2 กับ key
  let dataWithKey = [];
  rawDatas.forEach((value, index) => {
    if (index > 0 && !value[0]) {
      rowData = { row: index };
      keyField.forEach((key, i) => {
        rowData[key] = value[i];
      });
      dataWithKey.push(rowData);
    }
  });
  return dataWithKey;
}

// ดึงชื่อ Column
function getKeyfield(sheet) {
  const keyField = sheet.getDataRange().getValues()[0];
  return keyField;
}

function getListfilesinFolderById() {
  const files = DriveApp.getFolderById(FolderId).getFiles();
  var list = [];
  while (files.hasNext()) {
    file = files.next();
    list.push({ name: file.getName(), id: file.getId(), size: file.getSize() });
  }
  return list;
}
