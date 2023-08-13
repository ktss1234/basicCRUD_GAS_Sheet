# basicCRUD_GAS_Sheet

เร่ิมต้น สร้างไฟล์ google sheet ที่มี Column เริ่มต้น  CheckDelete	name	phone	address
create :
  var settings = {
    "url": "GAS_URL/exec?action=create",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "name": "dksfjl;asdfjksad",
      "phone": "045644564",
      "address": "thailand"
    }),
  };

$.ajax(settings).done(function (response) {
  console.log(response);
});

read :
  var settings = {
    "url": "GAS_URL/exec",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

update :
  var settings = {
    "url": "GAS_URL/exec?action=create",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "row": 1,
      "name": "นายตจิด",
      "phone": "045644564",
      "address": "thailand"
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

delete :
  var settings = {
    "url": "GAS_URL/exec?action=delete",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "row": 1,
      "name": "นายตจิด",
      "phone": "045644564",
      "address": "thailand"
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  
