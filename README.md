# basicCRUD_GAS_Sheet

 - เริ่มมต้น สร้างไฟล์ google sheet ที่มี Column เริ่มต้น  CheckDelete	name	phone	address
 - create :
	 - url  : GAS_URL/exec?action=create
	 - method : GET
    -  data: JSON.stringify({"name": "name", "phone": "phone", "address": "thailand" }
    
- read :
	 - url  : GAS_URL/exec
	 - method : POST
 - update :
	 - url  : GAS_URL/exec?action=update
	 - method : POST
    -  data: JSON.stringify({"name": "new name", "phone": "new phone", "address": "new address" }
- delete :
	- url  : GAS_URL/exec?action=delete&rowId=x
	- method : GET
