---
title: "About"
date: 2023-04-20
draft: false
layout: page
math: true
menu:
  main:
    name: About
    weight: 5
    pre: fa-info-circle
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

Every post on this blog ends with a DDR-style *groove radar* that sums up its shape at a glance. Play with the sliders below to see how each stat translates into an actual blog post.

{{< groove-radar-playground >}}

### From the arcade to the blog 🕹️

The [Groove Radar](https://remywiki.com/GROOVE_RADAR) first appeared in *DanceDanceRevolution 4thMIX* to describe the character of a song's chart beyond its difficulty rating. Each axis carries an original Japanese label, and this blog reuses the same logic — just applied to reading instead of dancing.

Two quantities are shared by all the formulas below: \(w\), the word count of the post (the same number as the read-time indicator), and the size factor \(s\), which stops short posts from maxing out an axis with just a handful of elements:

$$ s = \min\left( \sqrt{\frac{w}{1500}},\ 1 \right) $$

Every axis reads 100% at the outer ring and caps at 150%; the *blog radar value* is simply the sum of the five displayed percentages.

#### READING TIME

In the game, **STREAM** (全体密度, "overall density") measures the overall step density of the chart. Here it measures the overall size of the post, noted \(T\): reading time at 180 words per minute, where a 20-minute read hits 100% and anything past 30 minutes pegs the axis:

$$ T = \frac{w / 180}{20} $$

#### HEAVINESS

In the game, **VOLTAGE** (最大密度, "maximum density") measures the peak density — the busiest moment of the chart. Here it measures the heaviest stretch of text, noted \(\rho\) — the physicist's letter for density (and DDR loves its Greek letters) — blending the longest paragraph \(p_{\max}\), the average words per paragraph \(\bar{p}\) and the paragraph count \(n\):

$$ \rho = 0.5\,\frac{p_{\max}}{160} + 0.3\,\frac{\bar{p}}{60} + 0.2\,\frac{n}{80} $$

#### BREATHER

In the game, **AIR** (ジャンプ度, "jump degree") counts the jumps. Here it counts how often the text jumps out and lets you breathe, noted \(B\). Visual elements are weighted — with \(i\) images, \(p\) prompt boxes, \(z\) spoilers, \(h\) section breaks, and \(b\)/\(e\) bold and italic runs (capped, so an all-bold post gains nothing):

$$ E = 5\,i + 2\,p + 2\,z + h + \tfrac{1}{4}\min(b,\,30) + \tfrac{1}{4}\min(e,\,30) $$

The axis then blends their density, their absolute amount, and the variety \(v\) of what's used (up to 7 kinds):

$$ B = 0.5\,\frac{E / (w/1000)}{30}\,s + 0.3\,\frac{E}{40} + 0.2\,\frac{v}{7} $$

#### TECHNICAL

In the game, **FREEZE** (踏みっぱ度, "hold degree", from 踏みっぱなし — *keep stepping on it*) measures how long you hold freeze arrows. Here it measures how long you stay frozen on screen reading code and equations, noted \(C\): \(k\) is the characters of code, \(N\) all characters, and each of the \(m\) math equations weighs 200 characters of technical mass:

$$ C = 0.6\,\frac{k/N}{0.35}\,s + 0.4\,\frac{k + 200\,m}{5000} $$

#### COMPLEXITY

In the game, **CHAOS** (変則度, "irregularity degree") measures off-beat and irregular steps. Here it measures how irregular the reading is, noted \(X\), on the prose only (code excluded): \(L\) is the share of long words (9+ characters), \(A\) the share of acronyms and jargon, and \(S\) the average sentence length:

$$ X = \left( 0.55\,\frac{L}{0.25} + 0.25\,\frac{A}{0.05} + 0.2\,\min\left(\frac{S}{30},\ 1.5\right) \right) s $$
