import miniaudio, numpy as np, cv2, wave

d = miniaudio.decode_file("beats.mp3")
print("rate", d.sample_rate, "channels", d.nchannels, "frames", d.num_frames,
      "duration %.1fs" % (d.num_frames / d.sample_rate))

s = np.array(d.samples, dtype=np.float32) / 32768.0
if d.nchannels == 2:
    s = s.reshape(-1, 2).mean(axis=1)

# also dump a wav so it can be listened to
with wave.open("beats.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(d.sample_rate)
    w.writeframes((s * 32767).astype("<i2").tobytes())

N, HOP = 2048, 512
win = np.hanning(N)
cols = []
for i in range(0, len(s) - N, HOP):
    cols.append(np.abs(np.fft.rfft(s[i:i+N] * win)))
S = np.array(cols).T                      # freq x time
S = 20 * np.log10(S + 1e-8)
S = np.clip((S - S.min()) / (S.max() - S.min()) * 255, 0, 255).astype(np.uint8)
S = np.flipud(S)
print("spectrogram", S.shape)
cv2.imwrite("spectrogram_full.png", S)

# split into readable horizontal slices
n = 6
w = S.shape[1]
for i in range(n):
    seg = S[:, i*w//n:(i+1)*w//n]
    seg = cv2.resize(seg, (1400, 500), interpolation=cv2.INTER_AREA)
    cv2.imwrite("spec_%d.png" % i, seg)
print("wrote slices")
