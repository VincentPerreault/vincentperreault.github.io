import io
rows = io.open("art_2.txt", encoding="utf-8").read().splitlines()
print("rows:", len(rows))
# how many distinct rows, and does the sequence repeat with some period?
uniq = {}
for r in rows: uniq[r] = uniq.get(r, 0) + 1
print("distinct rows:", len(uniq))
print("most common row counts:", sorted(uniq.values(), reverse=True)[:10])

# try candidate periods: does rows[i] == rows[i+p] hold often?
best = []
for p in range(2, 200):
    m = sum(1 for i in range(len(rows) - p) if rows[i] == rows[i + p])
    best.append((m / (len(rows) - p), p))
best.sort(reverse=True)
print("top periods (match_ratio, period):", [(round(r, 3), p) for r, p in best[:8]])

# look for all-identical rows that might be frame separators
for i, r in enumerate(rows[:60]):
    print(i, "uniform" if len(set(r)) == 1 else "", r[:30])
