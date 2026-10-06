# หน่วยที่ 1: วิวัฒนาการและประเภทโครงข่ายโทรศัพท์เคลื่อนที่
(Unit 1: Mobile Network Evolution & Types)

เว็บแอปพลิเคชันเพื่อการเรียนรู้แบบโต้ตอบ (Interactive Learning Web App)

---

### โครงสร้างไฟล์
* `index.html` — ไฟล์เว็บแอปพลิเคชันหลัก (Single Page Application พร้อม Tailwind CSS)

### ฟังก์ชันการทำงานหลักใน Web App
1. **Interactive Timeline (1G ถึง 5G/6G):**
   * สรุปปีที่เริ่มใช้งาน, คลื่นความถี่, จุดเด่น, เทคโนโลยีหลัก (เช่น AMPS, GSM, WCDMA, LTE, 5G NR, THz)
   * ตารางเปรียบเทียบจุดเด่นและข้อจำกัดของแต่ละยุค
2. **สถาปัตยกรรมโครงข่ายเซลลูลาร์ (Cellular Architecture):**
   * โมดูลโต้ตอบอธิบายความสัมพันธ์ระหว่าง **User Equipment (UE)**, **Radio Access Network (RAN)** และ **Core Network**
   * อธิบายความแตกต่างของสถานีฐานแต่ละยุค (BTS &rarr; NodeB &rarr; eNodeB &rarr; gNodeB)
   * ความแตกต่างระหว่าง Public Mobile Network และ Private 5G Network
3. **ตารางเปรียบเทียบมาตรฐานเชิงวิศวกรรม (Comparison Matrix):**
   * เปรียบเทียบเทคโนโลยี, รูปแบบการมอดูเลชัน, แบนด์วิดท์ความเร็วสูงสุด, ค่าความหน่วง (Latency)
4. **แบบทดสอบท้ายหน่วย (Interactive Quiz):**
   * ข้อสอบวัดผล 5 ข้อ พร้อมเฉลยละเอียดและระบบคำนวณคะแนนแบบเรียลไทม์

---

### วิธีเปิดใช้งาน
* สามารถเปิดไฟล์ `index.html` ด้วยเว็บเบราว์เซอร์ (Chrome, Edge, Safari, Firefox) ได้ทันทีโดยไม่ต้องติดตั้งเซิร์ฟเวอร์
* หรือรันผ่าน Live Server / HTTP Server:
  ```bash
  python3 -m http.server 8000
  ```
  จากนั้นเปิดเบราว์เซอร์ที่ `http://localhost:8000`
