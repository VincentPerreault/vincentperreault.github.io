import io, html

parts = ["<meta charset='utf-8'><style>body{background:#111;color:#eee;font-family:sans-serif}"
         "pre{font-family:'Segoe UI Emoji';font-size:13px;line-height:1.0;letter-spacing:0;"
         "background:#000;padding:6px;display:inline-block}</style>"]

for n in (1, 3, 5, 6):
    rows = io.open("art_%d.txt" % n, encoding="utf-8").read().splitlines()
    parts.append("<h3>artwork %d &mdash; %dx%d</h3><pre>%s</pre>"
                 % (n, len(rows[0]), len(rows), html.escape("\n".join(rows))))

io.open("gallery.html", "w", encoding="utf-8").write("\n".join(parts))
print("wrote gallery.html")
