# หน่วยที่ 4: สถาปัตยกรรม คุณสมบัติ และระบบปฏิบัติการของเครื่องโทรศัพท์เคลื่อนที่
(Unit 4: Mobile Phone Architecture, Hardware Components & Operating Systems)

เว็บแอปพลิเคชันเพื่อการเรียนรู้แบบโต้ตอบ (Interactive Learning Web App)

---

### โครงสร้างไฟล์
* `index.html` — ไฟล์เว็บแอปพลิเคชันหลัก (Single Page Application พร้อม SVG Block Diagram + Tailwind CSS)
* `Code.gs` — สคริปต์ Google Apps Script สำหรับรับผลคะแนนแบบทดสอบเข้าสู่ชีต `Responses_Unit4` พร้อมระบบตรวจสิทธิ์ป้องกันการส่งซ้ำ

---

### ฟังก์ชันการทำงานหลักใน Web App
1. **🧩 บล็อกไดอะแกรมการทำงาน (Functional Block Diagram):**
   * แผนผังจำลองการทำงาน 4 ภาคหลักของสมาร์ตโฟน (Interactive SVG):
     * **RF Section:** Antenna, Power Amplifier (PA), Low Noise Amplifier (LNA), RF Transceiver
     * **Core SoC:** Baseband Modem (DSP) และ Application Processor (CPU/GPU/NPU/RAM)
     * **Power Section:** Battery Li-ion & Power Management IC (PMIC) ควบคุมแรงดันไฟย่อยหลายระดับ
     * **UI & Peripherals:** จอแสดงผล OLED, Digitizer, Audio Codec, กล้อง และ MEMS Sensors
2. **⚡ ชิ้นส่วนฮาร์ดแวร์ & SoC (Mainboard Parts):**
   * เจาะลึกโครงสร้างชิปเซ็ตแบบ System-on-Chip (SoC) เช่น Qualcomm Snapdragon, Apple A-Series, MediaTek
   * โครงสร้างหน่วยความจำแบบซ้อน Package-on-Package (PoP LPDDR RAM)
   * เซนเซอร์ประจำตัวเครื่อง: Accelerometer, Gyroscope, Proximity, Ambient Light, Barometer
   * ความปลอดภัยระดับชิป: Secure Enclave, eSIM / iSIM
3. **🤖 สถาปัตยกรรมระบบปฏิบัติการมือถือ (Mobile OS Stack):**
   * เปรียบเทียบสถาปัตยกรรม 5 ชั้นของ **Android** (Applications &rarr; Java API Framework &rarr; ART/Native &rarr; HAL &rarr; Linux Kernel)
   * สถาปัตยกรรม 4 ชั้นของ **iOS** (Cocoa Touch &rarr; Media &rarr; Core Services &rarr; Core OS / Darwin XNU)
   * ทำความเข้าใจ Real-Time OS (RTOS) ที่ทำงานแยกส่วนอยู่ภายในชิปโมเด็ม Baseband
4. **📝 แบบทดสอบเก็บคะแนน (Quiz):**
   * ข้อสอบ 5 ข้อ ระบบตรวจคำตอบแบบ **บอกคะแนนและข้อที่ผิด (ไม่เผยเฉลยคำตอบ)**
   * ส่งผลคะแนนเข้าสู่ Google Sheet ของครูผู้สอน
   * ระบบป้องกันการส่งซ้ำ 2 ชั้น (LocalStorage และ Apps Script)
   * เมนูสำหรับครูผู้สอนในการคัดลอกลิงก์และดาวน์โหลด `Code.gs`
