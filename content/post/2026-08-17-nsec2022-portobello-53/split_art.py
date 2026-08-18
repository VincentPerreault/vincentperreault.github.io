import io, unicodedata

lines = io.open("liberating-art-decoded.txt", encoding="utf-8").read().splitlines()
recs = []
for l in lines:
    idx = int(l[:4]); tag = l[5:9].strip(); body = l[10:]
    recs.append((idx, tag, body))

uploads, cur = [], None
for idx, tag, body in recs:
    if tag == "CTRL" and body == "UPLOAD-START":
        cur = []
    elif tag == "CTRL" and body == "UPLOAD-STOP":
        if cur is not None: uploads.append(cur)
        cur = None
    elif cur is not None:
        cur.append(body)

for i, u in enumerate(uploads, 1):
    widths = sorted({len(r) for r in u})
    print("upload %d: %d rows, code-point widths %s" % (i, len(u), widths))
    io.open("art_%d.txt" % i, "w", encoding="utf-8").write("\n".join(u))
