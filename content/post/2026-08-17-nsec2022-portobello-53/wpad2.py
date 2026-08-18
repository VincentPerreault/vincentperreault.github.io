import subprocess, ipaddress, io

TSHARK = r"C:\Program Files\Wireshark\tshark.exe"
PCAP = r"C:\Users\Root\Downloads\portobello53.pcapng"

out = subprocess.run(
    [TSHARK, "-r", PCAP, "-Y", 'dns.qry.name contains "wpad.ctf"', "-T", "fields",
     "-e", "frame.number", "-e", "dns.flags.response",
     "-e", "dns.qry.name", "-e", "dns.aaaa"],
    capture_output=True, text=True, encoding="utf-8")

def pr(b):
    return "".join(chr(c) if 32 <= c < 127 else "." for c in b)

rows = []
for l in out.stdout.splitlines():
    f = l.split("\t")
    if len(f) < 3: continue
    fn, resp, name = f[0], f[1], f[2]
    aaaa = f[3] if len(f) > 3 else ""
    label = name.split(".")[0]
    if resp == "False":
        rows.append((fn, "Q", label, ""))
    elif aaaa:
        for a in aaaa.split(","):
            b = ipaddress.IPv6Address(a.strip()).packed
            rows.append((fn, "A", b.hex(), pr(b)))

with io.open("wpad_raw.txt", "w", encoding="utf-8") as fh:
    for fn, d, x, p in rows:
        fh.write("%-6s %s  %-34s %s\n" % (fn, d, x, p))

# show only the flag exchange region
print("--- frames 2209..2270 (the FLAG exchange) ---")
for fn, d, x, p in rows:
    if 2200 <= int(fn) <= 2275:
        print("%-6s %s  %-34s %s" % (fn, d, x, p))

print("\n--- a couple of idle polls ---")
for fn, d, x, p in rows[:4]:
    print("%-6s %s  %-34s %s" % (fn, d, x, p))
