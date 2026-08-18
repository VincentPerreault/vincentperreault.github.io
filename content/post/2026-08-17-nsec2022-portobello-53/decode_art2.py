import subprocess, sys, io

TSHARK = r"C:\Program Files\Wireshark\tshark.exe"
PCAP = r"C:\Users\Root\Downloads\portobello53.pcapng"

out = subprocess.run(
    [TSHARK, "-r", PCAP, "-Y",
     'dns.flags.response==0 && dns.qry.name contains "liberating-art"',
     "-T", "fields", "-e", "dns.qry.name"],
    capture_output=True, text=True, encoding="utf-8")

names = [l.strip() for l in out.stdout.splitlines() if l.strip()]
rows = [n.split(".")[0][4:].encode("ascii").decode("punycode") for n in names]
print("rows:", len(rows))

def to_ascii(s):
    o = []
    for ch in s:
        cp = ord(ch)
        if 0x1F1E6 <= cp <= 0x1F1FF: o.append(chr(cp - 0x1F1E6 + ord("A")))
        elif ch == "\u2796": o.append("-")
        else: o.append(ch)
    return "".join(o)

def is_control(s):
    return bool(s) and all(
        0x1F1E6 <= ord(c) <= 0x1F1FF or c == "\u2796" or c.isdigit() for c in s)

uploads, cur, ctrl = [], None, []
for i, r in enumerate(rows):
    if is_control(r):
        a = to_ascii(r); ctrl.append((i, a))
        if a == "UPLOAD-START": cur = []
        elif a == "UPLOAD-STOP":
            if cur is not None: uploads.append(cur)
            cur = None
    elif cur is not None:
        cur.append(r)

print("\n--- control channel ---")
for i, a in ctrl: print("%5d  %s" % (i, a))

print("\n--- uploads ---")
for i, u in enumerate(uploads, 1):
    w = sorted({len(r) for r in u})
    print("upload %d: %d rows x width %s" % (i, len(u), w))
    io.open("art_%d.txt" % i, "w", encoding="utf-8").write("\n".join(u))
