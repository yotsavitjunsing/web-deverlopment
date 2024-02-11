# ร้านขายอุปกรณ์สำหรับแต่งสวน

คำอธิบาย

## สารบัญ Table of Contents

 - [ขั้นตอนในการติดตั้ง](#%E0%B8%82%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87)
 - [วิธีการใช้งาน](#%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99)

## ขั้นตอนในการติดตั้ง

 1. **เริ่มติดตั้ง node.js การติดตั้ง Node.js** มีขั้นตอนพื้นฐานดังนี้
 - **ดาวน์โหลด Node.js:** เข้าไปที่เว็บไซต์หลักของ Node.js ที่ [nodejs.org](https://nodejs.org) และดาวน์โหลดตัวติดตั้งสำหรับระบบปฏิบัติการที่เหมาะสม (Windows, macOS, หรือ Linux).
 
 - **ติดตั้ง Node.js:** เมื่อดาวน์โหลดเสร็จสิ้นแล้ว ให้เปิดไฟล์ติดตั้งที่ดาวน์โหลดขึ้นมา และทำการติดตั้งตามขั้นตอนที่แสดงบนหน้าต่างติดตั้ง.
 
 - **ตรวจสอบการติดตั้ง:** เมื่อติดตั้งเสร็จสมบูรณ์ คุณสามารถตรวจสอบว่า Node.js ถูกติดตั้งได้อย่างถูกต้องหรือไม่โดยเปิด Command Prompt (Windows) หรือ Terminal (macOS, Linux) และพิมพ์คำสั่งต่อไปนี้
 
 ```
			node -v
		คำสั่งนี้จะแสดงเวอร์ชันของ Node.js ที่ติดตั้งอยู่บนเครื่อง
 ```

2. **ทำการติดตั้ง git โดยไปที่** [**https://git-scm.com/downloads**](https://git-scm.com/downloads "https://git-scm.com/downloads") **เลือก เวอร์ชันที่รองรับ กับระบบปฎิบัติการ**

3. **ทำการติดตั้ง visual studio code**

-	เข้าไปที่เว็บไซต์ [https://code.visualstudio.com/](https://code.visualstudio.com/ "https://code.visualstudio.com/") เลือก เวอร์ชันที่รองรับ กับระบบปฎิบัติการ

-	ทำการ install ไฟล์ที่โหลดมา

4. **ทำการ clone repository**
- **clone ในส่วนของ frontend จาก** URL [https://github.com/yotsavitjunsing/web-deverlopment?fbclid=IwAR1d_xrDrfemWwQBrfGbt1gogDikjharv2mj5BiTB4qIURf57JmxSMdqByI](https://github.com/yotsavitjunsing/web-deverlopment?fbclid=IwAR1d_xrDrfemWwQBrfGbt1gogDikjharv2mj5BiTB4qIURf57JmxSMdqByI "https://github.com/yotsavitjunsing/web-deverlopment?fbclid=iwar1d_xrdrfemwwqbrfgbt1gogdikjharv2mj5bitb4qiurf57jmxsmdqbyi")
- สามารถเข้าไปคัดลอกได้ที่ ([https://github.com/yotsavitjunsing/web-deverlopment?fbclid=IwAR1d_xrDrfemWwQBrfGbt1gogDikjharv2mj5BiTB4qIURf57JmxSMdqByI](https://github.com/yotsavitjunsing/web-deverlopment?fbclid=IwAR1d_xrDrfemWwQBrfGbt1gogDikjharv2mj5BiTB4qIURf57JmxSMdqByI "https://github.com/yotsavitjunsing/web-deverlopment?fbclid=iwar1d_xrdrfemwwqbrfgbt1gogdikjharv2mj5bitb4qiurf57jmxsmdqbyi"))

จากนั้นทำการเข้าไปใน vs code แล้วเปิด terminal และทำการ clone ไฟล์มาจาก URL ดังกล่าว จากนั้นทำการให้ path ที่เราอยู่คือ web-deverlopment ตาม folder ที่โคลนมา จากนั้นทำการ ติดตั้ง react จากคำสั่ง  npm install react react-dom จากนั้นทำการ build run ได้ด้วยคำสั่ง npm start เพื่อนรันหน้าเว็บใส่ 
```
		npm i react-router-dom@6.21.3
	ลองใส่คำสั่งนี้หากไม่สามารถไปหน้าอื่นได้
```
