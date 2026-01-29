# HƯỚNG DẪN CHẠY SERVER

## CẤU TRÚC THƯ MỤC:
```
│   .gitignore
│   main.js
│   package.json
│   README.md
│   users.json
│
└───data
    │   index.html
    │   index.js
    │   style.css
    │
    ├───images
    │       bg.gif
    │       bia-tet.jpg
    │       class1.jpg
    │       class2.jpg
    │       ehhh.png
    │       xu.png
    │
    └───sounds
            fireworks.mp3
            open.mp3
            soundBg.mp3
            voice.wav
```

---


## TRUY CẬP:

### Thiệp Tết:
```
http://localhost:20020/
http://51.75.118.151:20020/
```

## CHIA SẺ CHO BẠN BÈ:

### Cùng WiFi:
1. Tìm IP máy bạn:
```powershell
ipconfig
```
Ví dụ: `192.168.1.100`

2. Bạn bè vào:
```
http://192.168.1.100:20020          (Thiệp)
```

### Public Internet (ngrok):
```powershell
ngrok http 20020
```
---

## DỪNG SERVER:
```
Ctrl + C
```
---

## LƯU Ý:
✅ Server chạy ở folder gốc (ngoài cùng)
## AUTHOR & 
Trần Hữu Nhật Nam 9A4
Huỳnh Gia Kiệt 9A4
Hoàng Thanh Trúc 9A4
