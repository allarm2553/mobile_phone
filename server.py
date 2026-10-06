#!/usr/bin/env python3
"""
Local HTTP Server for Mobile Phone Technology Course Web Apps
วิชาโทรศัพท์เคลื่อนที่ - Web Application Local Server
"""

import http.server
import socketserver
import webbrowser
import socket
import os
import sys
import threading
import time

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_local_ip():
    try:
        import subprocess
        res = subprocess.check_output(["ipconfig", "getifaddr", "en0"], stderr=subprocess.DEVNULL).decode().strip()
        if res:
            return res
    except Exception:
        pass
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable aggressive caching for local development
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

def open_browser(port):
    time.sleep(1.0)
    webbrowser.open(f"http://localhost:{port}")

def run_server():
    os.chdir(DIRECTORY)
    local_ip = get_local_ip()

    # Find free port if 8000 is taken
    port = PORT
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", port), CustomHandler) as httpd:
                print("=" * 65)
                print(" 📱 Mobile Phone Technology - Local Development Server")
                print(" โครงการเว็บแอปพลิเคชันเพื่อการเรียนรู้ วิชาโทรศัพท์เคลื่อนที่")
                print("=" * 65)
                print(f" ▶ Local Web Portal  : http://localhost:{port}")
                print(f" ▶ Mobile / LAN Test : http://{local_ip}:{port}")
                print(f" ▶ Root Directory    : {DIRECTORY}")
                print("-" * 65)
                print(" 💡 เคล็ดลับ: คุณสามารถนำมือถือที่ต่อ Wi-Fi เดียวกันมาเปิดผ่าน")
                print(f"    http://{local_ip}:{port} เพื่อทดสอบใช้งานจริงบนสมาร์ตโฟนได้!")
                print(" ⌨️  กด Ctrl + C เพื่อหยุดการทำงานของเซิร์ฟเวอร์")
                print("=" * 65)

                # Open default web browser in background thread
                threading.Thread(target=open_browser, args=(port,), daemon=True).start()

                httpd.serve_forever()
                break
        except OSError as e:
            if e.errno == 48 or "Address already in use" in str(e):
                port += 1
            else:
                raise e

if __name__ == "__main__":
    try:
        run_server()
    except KeyboardInterrupt:
        print("\n🛑 หยุดการทำงาน Local Server เรียบร้อยแล้ว")
        sys.exit(0)
