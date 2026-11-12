---
title: "About"
date: 2023-04-20
draft: false
layout: page
math: true
---

[Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) is a blog theme originally based on [Jekyll](https://jekyllrb.com/). Due to Jekyll's design limitations, it does not natively support internationalization (i18n) and requires third-party plugins for i18n functionality. To enable i18n support for Chirpy without the hassle of relying on third-party plugins, the [hugo-theme-chirpy](https://github.com/geekifan/hugo-theme-chirpy) project migrated the Chirpy theme to [Hugo](https://gohugo.io/) with minimal adaptations. All features of Chirpy are available in hugo-theme-chirpy (though some functionalities may operate differently within the Hugo framework).

Follow the posts in the demo site to quickly set up a free personal blog!
## Features

- **Dark Mode**: Enhanced readability in low-light environments.
- **Multilingual UI**: Easily switch between different languages.
- **Efficient Post Organization**: Use hierarchical categories, trending tags, recommended reading, and search functionalities.
- **Optimized Layout**: Includes TOC, syntax highlighting, prompts, and more.
- **Rich Writing Extensions**: Support for mathematical formulas, charts, flowcharts, and embedded media.
- **Multiple Comment Systems**: Choose from various commenting options.
- **Web Analysis Tools**: Integrated with multiple analytics tools.
- **Modern Web Technologies**: Built for SEO and web performance.
- **RSS Feed Support**: Keep your readers updated with RSS feeds.

## Groove Radar 🕺

Every post on this blog ends with a *groove radar*, the five-sided chart from Dance Dance Revolution. It tells you what kind of read you are in for. Move the sliders below to see what each value means for an actual post.

{{< groove-radar-playground >}}

### From the arcade to the blog 🕹️

The [Groove Radar](https://dancedancerevolution.fandom.com/wiki/Groove_Radar) (グルーヴレーダー) was introduced in *DDRMAX -Dance Dance Revolution 6thMIX-*. It is a pentagon that shows the difficulty of a song through five values: Stream, Voltage, Air, Freeze and Chaos. I kept the five axes and what each one stands for, and applied them to reading instead of dancing.

Two numbers come back in the formulas below. The first is \(w\), the word count of the post, which is the same count the read-time indicator uses. The second is the size factor \(s\). In the game, most values are measured against the length of the song. Here, every axis except READING TIME is multiplied by \(s\), so the radar grows with the post: a five-minute read can't fill it with two images and one long paragraph. A post gets its full weight from 3,000 words, which is about a 17-minute read:

$$ s = \min\left( \sqrt{\frac{w}{3000}},\ 1 \right) $$

Each axis reads 100% at the outer ring and stops at 150%. The *blog radar value* is the sum of the five percentages.

#### READING TIME

**STREAM** (全体密度, "overall density") is the overall density of the steps in a chart. On the blog it is the overall size of the post, noted \(T\): the reading time at 180 words per minute. A 40-minute read reaches 100%, and anything past 60 minutes maxes out the axis.

$$ T = \frac{w / 180}{40} $$

#### HEAVINESS

**VOLTAGE** (最大密度, "maximum density") is the [peak density](https://dancedancerevolution.fandom.com/wiki/Voltage_%28Groove_Radar%29) of a chart: the most arrows packed on screen in one measure, multiplied by the average BPM of the song. A chart scores high when it has a packed section and a fast pace overall.

On the blog it is the weight of the text, noted \(\rho\). That is the letter physicists use for density, and DDR likes its Greek letters. The packed section is the longest paragraph \(p_{\max}\). The overall pace is the average number of words per paragraph \(\bar{p}\) and the amount of prose \(W\), in words: a long text is a dense one. Code, quizzes and checklists are left out, so a long post that is mostly code stays light.

$$ \rho = \left( 0.3\,\frac{p_{\max}}{300} + 0.25\,\frac{\bar{p}}{120} + 0.45\,\frac{W}{4000} \right) s $$

#### BREATHER

**AIR** (ジャンプ度, "jump degree") counts the jumps in a chart. On the blog it counts what makes the text jump out and lets you breathe, noted \(B\). Each kind of visual is worth a number of points: \(i\) images, \(p\) prompt boxes, \(z\) spoilers, \(h\) section breaks, and \(b\) and \(e\) for the bold and italic runs. Those last two are capped, so a post written entirely in bold gains nothing. A block of code is not a breather. It counts toward TECHNICAL.

$$ E = 5\,i + 2\,p + 2\,z + h + \tfrac{1}{4}\min(b,\,30) + \tfrac{1}{4}\min(e,\,30) $$

The axis then mixes how dense those points are, how many there are in total, and the variety \(v\) of what is used (up to 7 kinds):

$$ B = \left( 0.6\,\frac{E / (w/1000)}{30} + 0.3\,\frac{E}{80} + 0.1\,\frac{v}{7} \right) s $$

#### TECHNICAL

**FREEZE** (踏みっぱ度, "hold degree", from 踏みっぱなし, *keep stepping on it*) is how long you hold the freeze arrows. On the blog it is how long you stay frozen in front of code and equations, noted \(C\). \(k\) is the number of characters of code, \(N\) the total number of characters, and each of the \(m\) math equations counts as 200 characters of code.

$$ C = \left( 0.6\,\frac{k/N}{0.35} + 0.4\,\frac{k + 200\,m}{5000} \right) s $$

#### COMPLEXITY

**CHAOS** (変則度, "irregularity degree") counts the steps that fall off the beat, and the game [multiplies them by the BPM changes and the stops](https://dancedancerevolution.fandom.com/wiki/Chaos_%28Groove_Radar%29) in the song. That is why even a Beginner chart can have some chaos. Every text has a touch of it too.

On the blog the axis is noted \(X\). The off-beat steps are the irregular parts of the wording: \(L\) is the share of long words (9+ characters), \(A\) the share of acronyms and jargon, and \(S\) the average sentence length. They are measured on the prose only.

The stops are the places where you have to stop reading and do something. The \(q\) quiz questions, the \(c\) answer choices across them and the \(t\) checklist items add up to interactive points:

$$ I = q + \frac{c}{5} + \frac{t}{4} $$

Like in the game, the stops multiply the rest. A 12-question quiz with five choices per question doubles the value:

$$ X = \left( 0.55\,\frac{L}{0.5} + 0.25\,\frac{A}{0.1} + 0.2\,\min\left(\frac{S}{50},\ 1.5\right) \right) \left( 1 + \frac{I}{24} \right) s $$

The marks for the wording are set far out on purpose. Reaching 100% without a quiz would take a text where half the words are long, one word in ten is an acronym and the sentences average 50 words. Ordinary prose only gets a touch of chaos, so the axis usually stays under HEAVINESS. It takes a quiz or a wall of jargon to push it past.
