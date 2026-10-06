# หน่วยที่ 2: ระบบสัญญาณและการมอดูเลชันในระบบโทรศัพท์เคลื่อนที่
(Unit 2: Mobile Signals, Spectrum & Modulation)

เว็บแอปพลิเคชันเพื่อการเรียนรู้แบบโต้ตอบ (Interactive Learning Web App)

---

### โครงสร้างไฟล์
* `index.html` — ไฟล์เว็บแอปพลิเคชันหลัก (Single Page Application พร้อม HTML5 Canvas + Tailwind CSS)
* `Code.gs` — สคริปต์ Google Apps Script สำหรับรับผลคะแนนแบบทดสอบเข้าสู่ชีต `Responses_Unit2` พร้อมระบบตรวจสิทธิ์ป้องกันการส่งซ้ำ

---

### ฟังก์ชันการทำงานหลักใน Web App
1. **📡 สเปกตรัมและความถี่ (Spectrum & Frequency Bands):**
   * กราฟิกจำลองการเปรียบเทียบคลื่น 3 ย่าน: Low-Band (< 1 GHz), Mid-Band (1-6 GHz) และ High-Band / mmWave (24+ GHz)
   * แสดง Trade-offs ระหว่างระยะครอบคลุม (Coverage) และความเร็วในการรับส่งข้อมูล (Capacity / Throughput)
2. **〰️ ห้องทดลองกลุ่มดาวสัญญาณจำลอง (Constellation Diagram Simulator):**
   * เรนเดอร์กลุ่มดาวสัญญาณบนระนาบ I/Q Plane แบบสดผ่าน HTML5 Canvas
   * ปรับเลือกดู BPSK (1 bit), QPSK (2 bits), 16-QAM (4 bits), 64-QAM (6 bits) และ 256-QAM (8 bits)
   * อธิบายทฤษฎี Adaptive Modulation and Coding (AMC) และระดับ SNR ที่ต้องการ
3. **👥 เทคนิคการเข้าถึงช่องสัญญาณ (Multiple Access Schemes):**
   * กราฟิกไดอะแกรมเปรียบเทียบในมิติความถี่และเวลา:
     * **FDMA (1G):** แบ่งช่องความถี่
     * **TDMA (2G):** แบ่งสล็อตเวลา
     * **CDMA (3G):** ใช้แถบความถี่ร่วมกันแยกด้วยรหัส (Code)
     * **OFDMA (4G/5G):** คลื่นพาหะย่อยตั้งฉากทางคณิตศาสตร์ (Orthogonal Subcarriers)
4. **📝 แบบทดสอบเก็บคะแนน (Quiz):**
   * ข้อสอบ 5 ข้อ ตรวจคำตอบแบบ **บอกเฉพาะคะแนนและข้อที่ทำผิด (ไม่เผยเฉลย)**
   * บันทึกคะแนนเข้าสู่ Google Sheet ของอาจารย์ผู้สอน
   * ระบบป้องกันการส่งซ้ำ (Anti-duplicate) ทั้งฝั่ง LocalStorage และฝั่งชีต
   * ปุ่มสำหรับครูผู้สอนเพื่อดาวน์โหลด `Code.gs` และปุ่มคัดลอกลิงก์ส่งให้นักศึกษา (รองรับ GitHub Pages)
