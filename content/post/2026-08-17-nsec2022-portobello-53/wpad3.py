import subprocess, ipaddress, io, binascii

TSHARK = r"C:\Program Files\Wireshark\tshark.exe"
PCAP = r"C:\Users\Root\Downloads\portobello53.pcapng"

out = subprocess.run(
    [TSHARK, "-r", PCAP, "-Y", 'dns.qry.name contains "wpad.ctf"', "-T", "fields",
     "-e", "frame.number", "-e", "dns.flags.response",
     "-e", "dns.qry.name", "-e", "dns.aaaa"],
    capture_output=True, text=True, encoding="utf-8")

events = []          # (frame, direction, text)
srv_buf, cli_buf = "", ""

for l in out.stdout.splitlines():
    f = l.split("\t")
    if len(f) < 3: continue
    fn, resp, name = int(f[0]), f[1], f[2]
    aaaa = f[3] if len(f) > 3 else ""
    labels = name.split(".")

    if resp == "False":
        # exfil:  <seq>.<hex>.echo.474f415453.wpad.ctf
        if "echo" in labels:
            i = labels.index("echo")
            if i >= 2:
                cli_buf += labels[1]
                if labels[0] == "0":            # last chunk
                    data = binascii.unhexlify(cli_buf)
                    events.append((fn, "client->server (output)",
                                   data.decode("utf-8", "replace")))
                    cli_buf = ""
        continue

    if not aaaa: continue
    for a in aaaa.split(","):
        b = ipaddress.IPv6Address(a.strip()).packed
        remaining, payload = b[0] >> 4, b[2:]
        srv_buf += payload.decode("utf-8", "replace")
        if remaining == 0:
            msg = srv_buf.rstrip("\x00")
            srv_buf = ""
            if msg not in ("NO",):
                events.append((fn, "server->client (command)", msg))

with io.open("wpad_session_full.txt", "w", encoding="utf-8") as fh:
    for fn, d, t in events:
        fh.write("frame %-6d %s\n%s\n%s\n\n" % (fn, d, "-" * 60, t))

print(io.open("wpad_session_full.txt", encoding="utf-8").read())
