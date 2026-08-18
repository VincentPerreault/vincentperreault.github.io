import subprocess, sys, unicodedata, io, json

TSHARK = r"C:\Program Files\Wireshark\tshark.exe"
PCAP = r"C:\Users\Root\Downloads\portobello53.pcapng"

out = subprocess.run(
    [TSHARK, "-r", PCAP, "-Y",
     'dns.flags.response==0 && dns.qry.name contains "liberating-art"',
     "-T", "fields", "-e", "dns.qry.name"],
    capture_output=True, text=True, encoding="utf-8")

names = [l.strip() for l in out.stdout.splitlines() if l.strip()]
print("queries:", len(names), file=sys.stderr)

def punydecode(label):
    if not label.startswith("xn--"):
        return label
    try:
        return label[4:].encode("ascii").decode("punycode")
    except Exception as e:
        return "<<%s|%s>>" % (label, e)

rows = []
fails = 0
for n in names:
    lab = n.split(".")[0]
    d = punydecode(lab)
    if d.startswith("<<"):
        fails += 1
    rows.append(d)
print("raw punycode failures:", fails, file=sys.stderr)

# collapse consecutive duplicates (DNS retries)
ded = []
for r in rows:
    if not ded or ded[-1] != r:
        ded.append(r)
print("after dedup:", len(ded), file=sys.stderr)

# regional indicator -> ascii letter, so control messages are readable
def to_ascii(s):
    o = []
    for ch in s:
        cp = ord(ch)
        if 0x1F1E6 <= cp <= 0x1F1FF:
            o.append(chr(cp - 0x1F1E6 + ord("A")))
        elif ch == "\u2796":   # heavy minus sign
            o.append("-")
        else:
            o.append(ch)
    return "".join(o)

# a "control" line is one made only of regional indicators / minus / digits
def is_control(s):
    for ch in s:
        cp = ord(ch)
        if 0x1F1E6 <= cp <= 0x1F1FF or ch == "\u2796" or ch.isdigit():
            continue
        return False
    return bool(s)

with io.open("liberating-art-decoded.txt", "w", encoding="utf-8") as f:
    for i, r in enumerate(ded):
        tag = "CTRL" if is_control(r) else "ART "
        f.write("%4d %s %s\n" % (i, tag, to_ascii(r) if is_control(r) else r))

print("\n--- control messages ---")
for i, r in enumerate(ded):
    if is_control(r):
        print("%4d  %s" % (i, to_ascii(r)))
