import io, numpy as np, cv2

rows = io.open("art_4.txt", encoding="utf-8").read().splitlines()
h, w = len(rows), len(rows[0])
print("matrix %dx%d" % (w, h))

m = np.array([[0 if c == "⬛" else 255 for c in r] for r in rows], dtype=np.uint8)

SCALE, QZ = 12, 6
pad = np.pad(m, QZ, constant_values=255)
img = np.kron(pad, np.ones((SCALE, SCALE), dtype=np.uint8))
cv2.imwrite("art_4_qr.png", img)

det = cv2.QRCodeDetector()
data, pts, _ = det.detectAndDecode(img)
print("decoded:", repr(data))

if not data:
    inv = 255 - m
    pad = np.pad(inv, QZ, constant_values=255)
    img2 = np.kron(pad, np.ones((SCALE, SCALE), dtype=np.uint8))
    data, _, _ = det.detectAndDecode(img2)
    print("inverted decoded:", repr(data))
