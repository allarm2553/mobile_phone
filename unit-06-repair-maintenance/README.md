# หน่วยที่ 6: การตรวจซ่อมและการบำรุงรักษาเครื่องโทรศัพท์เคลื่อนที่
(Unit 6: Mobile Phone Troubleshooting, Board-Level Repair & Preventive Maintenance)

เว็บแอปพลิเคชันเพื่อการเรียนรู้แบบโต้ตอบ (Interactive Learning Web App)

---

### โครงสร้างไฟล์
* `index.html` — ไฟล์เว็บแอปพลิเคชันหลัก (Single Page Application พร้อม DC Power Supply Lab Simulator + Tailwind CSS)
* `Code.gs` — สคริปต์ Google Apps Script สำหรับรับผลคะแนนแบบทดสอบเข้าสู่ชีต `Responses_Unit6` พร้อมระบบตรวจสิทธิ์ป้องกันการส่งซ้ำ

---

### ฟังก์ชันการทำงานหลักใน Web App
1. **🛠️ ห้องทดลองจำลองเครื่องจ่ายไฟ DC Power Supply (Precision Current Consumption Simulator):**
   * จำลองหน้าจอแสดงผล 4 ดิจิต (Voltage 4.00V, Current 0.000A) พร้อมปุ่มจำลองการกดเปิดเครื่อง (Power Trigger)
   * กราฟคลื่นกระแสไฟฟ้า Real-time 60 FPS บน HTML5 Canvas
   * จำลอง 5 รูปแบบพฤติกรรมการกินกระแส:
     * **1. บูตปกติ (Normal Boot):** ไม่มีไฟรั่วก่อนกด &rarr; สวิงตามโหลด CPU/RAM 0.1A-1.3A &rarr; เข้าสู่ Sleep Mode 0.03A
     * **2. ลายไฟหลักช็อต (VBAT / VDD_MAIN Short):** กระแสพุ่งตัดวงจรทันที 2.5A+ ก่อนกดปุ่มเปิด
     * **3. ลายไฟย่อยช็อต (Secondary Short):** หลังกดเปิด กระแสกินค้างที่ 0.85A ไม่บูต
     * **4. อาการบูตวนสวิง (Bootloop Cycle):** กระแสสวิง 0.15A - 0.65A แล้วตัดดับวนลูป
     * **5. วงจรเปิด (Open Circuit):** กดปุ่มแล้วไม่มีการกินกระแสเลย 0.000A
2. **🔬 ความปลอดภัย ESD และเทคนิคการยก-วางไอซี BGA (Micro-soldering Standards):**
   * มาตรการป้องกันไฟฟ้าสถิต (ESD Safety: แผ่นยาง, สายรัดข้อมือ, แปรง ESD)
   * โปรไฟล์ความร้อนของตะกั่ว Lead-Free (217°C) vs ตะกั่วซ่อม Sn63/Pb37 (183°C) vs ตะกั่วอุณหภูมิต่ำ (138°C)
   * กระบวนการยก-วางไอซี 4 ขั้นตอน: ขูดกาวดำ Underfill &rarr; เป่ายกไอซี &rarr; ทำขาไอซีใหม่ (Reballing Stencil) &rarr; วางและเป่าจัดตำแหน่ง (Self-alignment)
3. **💻 การกู้คืนระบบปฏิบัติการและแฟลชรอม (OS Recovery & Flashing Protocols):**
   * วิเคราะห์ Soft Brick (กู้คืนผ่าน Fastboot/Odin) vs Hard Brick (กู้คืนผ่าน EDL 9008 Test Point)
   * สถาปัตยกรรมโหมดบริการ Android (Fastboot, Recovery, EDL) vs iOS (Recovery Mode, DFU Mode ข้าม iBoot)
   * ข้อควรระวังความปลอดภัยในการรักษาพาร์ทิชัน EFS / NVRAM เพื่อไม่ให้หมายเลขประจำเครื่อง IMEI สูญหาย
4. **📝 แบบทดสอบเก็บคะแนน (Quiz):**
   * ข้อสอบ 5 ข้อ ระบบตรวจคำตอบแบบ **บอกคะแนนและข้อที่ผิด (ไม่เผยเฉลยคำตอบ)**
   * ส่งผลคะแนนเข้าสู่ Google Sheet ของครูผู้สอน
   * ระบบป้องกันการส่งซ้ำ 2 ชั้น (LocalStorage และ Apps Script)
   * เมนูสำหรับครูผู้สอนในการคัดลอกลิงก์และดาวน์โหลด `Code.gs`
