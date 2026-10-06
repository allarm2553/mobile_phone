# หน่วยที่ 5: การติดตั้ง การตรวจวัด และทดสอบระบบสัญญาณ
(Unit 5: Base Station Installation, RF Measurement & Field Drive Testing)

เว็บแอปพลิเคชันเพื่อการเรียนรู้แบบโต้ตอบ (Interactive Learning Web App)

---

### โครงสร้างไฟล์
* `index.html` — ไฟล์เว็บแอปพลิเคชันหลัก (Single Page Application พร้อม HTML5 Canvas Spectrum Simulator + Interactive Drive Test + Tailwind CSS)
* `Code.gs` — สคริปต์ Google Apps Script สำหรับรับผลคะแนนแบบทดสอบเข้าสู่ชีต `Responses_Unit5` พร้อมระบบตรวจสิทธิ์ป้องกันการส่งซ้ำ

---

### ฟังก์ชันการทำงานหลักใน Web App
1. **📈 ห้องทดลองจำลองเครื่องมือวัดสเปกตรัม (Spectrum Analyzer Virtual Lab):**
   * กราฟจำลองการกวาดสัญญาณ RF บนหน้าจอ Spectrum Analyzer ด้วย HTML5 Canvas แบบ Real-time
   * โหมดจำลองสถานการณ์สัญญาณ RF:
     * สัญญาณปกติสมบูรณ์ (Clean Carrier Signal - 2100 MHz)
     * สัญญาณถูกรบกวนร่วมช่อง (Co-channel Interference)
     * สัญญาณอ่อนและมีสัญญาณรบกวนสูง (Low Signal & High Noise Floor)
     * การแผ่สัญญาณคลื่นแปลกปลอม (Spurious / Harmonics Emission)
   * คำนวณค่า Power, Center Frequency, RBW (Resolution Bandwidth) และ Noise Floor
2. **🎯 พารามิเตอร์ชี้วัดคุณภาพสัญญาณ 4G/5G (RF Key Parameters):**
   * **RSSI:** Received Signal Strength Indicator (กำลังรวมทุกย่าน)
   * **RSRP:** Reference Signal Received Power (กำลังสัญญาณอ้างอิงของสถานีฐาน)
   * **RSRQ:** Reference Signal Received Quality (คุณภาพของสัญญาณอ้างอิง)
   * **SINR:** Signal to Interference plus Noise Ratio (อัตราส่วนสัญญาณต่อสัญญาณรบกวน)
   * เกณฑ์มาตรฐานเปรียบเทียบระดับคุณภาพสัญญาณ (Excellent / Good / Fair / Poor)
3. **🚗 ระบบจำลองการทดสอบภาคสนาม (Drive Test Route Simulator):**
   * แผนที่จำลองเส้นทางขับรถทดสอบ (Route Simulation) พร้อมกราฟิกเส้นทาง SVG
   * สไลเดอร์เลื่อนตำแหน่งรถตามพิกัด Waypoints แสดงสถานะ Real-time:
     * การสลับเปลี่ยนเซลล์ (Handover Zone) ระหว่าง Tower A และ Tower B
     * บริเวณจุดอับสัญญาณ (Coverage Hole / Shadowing Zone)
     * บริเวณเกิดคลื่นรบกวนจากเสาต้นอื่น (Interference Zone)
4. **📝 แบบทดสอบเก็บคะแนน (Quiz):**
   * ข้อสอบ 5 ข้อ ระบบตรวจคำตอบแบบ **บอกคะแนนและข้อที่ผิด (ไม่เผยเฉลยคำตอบ)**
   * ส่งผลคะแนนเข้าสู่ Google Sheet ของครูผู้สอน
   * ระบบป้องกันการส่งซ้ำ 2 ชั้น (LocalStorage และ Apps Script)
   * เมนูสำหรับครูผู้สอนในการคัดลอกลิงก์และดาวน์โหลด `Code.gs`
