import miniaudio, numpy as np, cv2

d = miniaudio.decode_file("beats.mp3")
s = np.array(d.samples, dtype=np.float32) / 32768.0
if d.nchannels == 2:
    s = s.reshape(-1, 2).mean(axis=1)

N, HOP = 4096, 1024
win = np.hanning(N)
cols = [np.abs(np.fft.rfft(s[i:i+N] * win)) for i in range(0, len(s) - N, HOP)]
S = np.array(cols).T
db = 20 * np.log10(S + 1e-10)

# per-frequency-bin normalisation makes faint overlaid tones pop out
norm = db - np.median(db, axis=1, keepdims=True)
lo, hi = np.percentile(norm, 50), np.percentile(norm, 99.9)
img = np.clip((norm - lo) / (hi - lo) * 255, 0, 255).astype(np.uint8)
img = np.flipud(img)
print("shape", img.shape, " freq/bin = %.1f Hz" % (d.sample_rate / N))
cv2.imwrite("spec_norm_full.png", img)

# the top half of the spectrum is where hidden tones usually live
top = img[: img.shape[0] // 2, :]
cv2.imwrite("spec_norm_top.png", cv2.resize(top, (1800, 600), interpolation=cv2.INTER_AREA))
cv2.imwrite("spec_norm_all.png", cv2.resize(img, (1800, 700), interpolation=cv2.INTER_AREA))
