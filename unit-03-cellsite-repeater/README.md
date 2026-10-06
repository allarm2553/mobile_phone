# หน่วยที่ 3: สถานีฐาน (Cell Site) และสถานีทวนสัญญาณ
(Unit 3: Base Station, Cell Site & Repeater)

เว็บแอปพลิเคชันเพื่อการเรียนรู้แบบโต้ตอบ (Interactive Learning Web App)

---

### โครงสร้างไฟล์
* `index.html` — ไฟล์เว็บแอปพลิเคชันหลัก (Single Page Application พร้อม SVG Graphics + Tailwind CSS)
* `Code.gs` — สคริปต์ Google Apps Script สำหรับรับผลคะแนนแบบทดสอบเข้าสู่ชีต `Responses_Unit3` พร้อมระบบตรวจสิทธิ์ป้องกันการส่งซ้ำ

---

### ฟังก์ชันการทำงานหลักใน Web App
1. **⬡ แนวคิดเซลลูลาร์ (Cellular Concept & Frequency Reuse):**
   * แผนผังจำลองโครงข่ายหกเหลี่ยมแบบ 7-Cell Cluster (A–G)
   * แสดงระยะห่างการนำความถี่กลับมาใช้ซ้ำ (Co-channel Reuse Distance)
   * อธิบายขนาดเซลล์ Macrocell, Microcell, Picocell/Femtocell และการเกิดสัญญาณรบกวนร่วมช่อง (CCI)
2. **🗼 กายภาพและอุปกรณ์สถานีฐาน (Cell Site Anatomy):**
   * กราฟิกจำลองส่วนประกอบของเสาสถานีฐานโทรศัพท์เคลื่อนที่:
     * **Sector Antenna:** สายอากาศแผงทิศทางมุม 120 องศา
     * **RRU (Remote Radio Unit):** ภาครับ-ส่งวิทยุบนยอดเสาเพื่อลด Feeder Loss
     * **Microwave Dish:** จานส่งสัญญาณเชื่อมโยง Backhaul
     * **BBU (Baseband Unit) & Shelter:** ตู้ควบคุมประมวลผลเบสแบนด์และระบบสำรองไฟ Rectifier/Battery 48V
3. **🔁 สถานีทวนสัญญาณ & Handover (Repeater & Mobility):**
   * ไดอะแกรมการทำงานของ Repeater (Donor Antenna &rarr; Amplifier & Filter &rarr; Service Antenna สู่จุดอับสัญญาณ)
   * กระบวนการ Handover เมื่อยานพาหนะหรือผู้ใช้เคลื่อนที่ข้ามเซลล์
   * เปรียบเทียบ **Hard Handover (Break-before-Make)** ใน 4G/5G และ **Soft Handover (Make-before-Break)** ใน 3G
4. **📝 แบบทดสอบเก็บคะแนน (Quiz):**
   * ข้อสอบ 5 ข้อ ระบบตรวจคำตอบแบบ **บอกคะแนนและข้อที่ผิด (ไม่เผยเฉลย)**
   * เชื่อมต่อส่งคะแนนเข้า Google Sheet ของครูผู้สอน
   * ระบบป้องกันการส่งซ้ำ 2 ชั้น (LocalStorage และ Apps Script)
   * ปุ่มสำหรับครูผู้สอนในการคัดลอกลิงก์และดาวน์โหลด `Code.gs`
