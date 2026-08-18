import subprocess, binascii, ipaddress, re, io

TSHARK = r"C:\Program Files\Wireshark\tshark.exe"
PCAP = r"C:\Users\Root\Downloads\portobello53.pcapng"

out = subprocess.run(
    [TSHARK, "-r", PCAP, "-Y", 'dns.qry.name contains "wpad.ctf"', "-T", "fields",
     "-e", "frame.number", "-e", "dns.flags.response",
     "-e", "dns.qry.name", "-e", "dns.aaaa"],
    capture_output=True, text=True, encoding="utf-8")

def aaaa_to_bytes(a):
    return ipaddress.IPv6Address(a).packed

lines, last_q = [], None
for l in out.stdout.splitlines():
    f = l.split("\t")
    if len(f) < 3: continue
    fn, resp, name = f[0], f[1], f[2]
    aaaa = f[3] if len(f) > 3 else ""
    label = name.split(".")[0]
    if resp == "False":
        try: dec = binascii.unhexlify(label).decode("utf-8", "replace")
        except Exception: dec = "<not hex: %s>" % label
        lines.append((fn, ">>", dec))
        last_q = dec
    else:
        if not aaaa: continue
        for a in aaaa.split(","):
            b = aaaa_to_bytes(a.strip())
            lines.append((fn, "<<", b.decode("utf-8", "replace")))

# collapse the repeated polling, keep the conversation readable
prev = None
with io.open("wpad_session.txt", "w", encoding="utf-8") as fh:
    for fn, d, t in lines:
        key = (d, t)
        if key == prev:
            continue
        prev = key
        fh.write("%-7s %s %s\n" % (fn, d, t.replace("\x00", "")))

print(io.open("wpad_session.txt", encoding="utf-8").read())
