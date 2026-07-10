---
title: An overview of OSCP+ and PEN-200
date: 2025-05-27 01:31:22 -0500
draft: false
categories:
  - Blogging
  - Certification
tags:
  - Writing
  - Advice
  - OffSec
  - Cybersecurity
  - Pentesting
  - Opinion
author: 
- VincentPerreault
description: An overview about the OSCP+ exam and the PEN-200 course.
toc: true
comments: false
image:
  path: oscp+.png
  alt: The OSCP+ badge
---



I passed the OSCP+ exam. Here's how I did it, and more importantly, how you can maximize your own chances if you plan on taking on the challenge. This post is meant to be a practical guide, from the moment you start wondering whether you're ready all the way to submitting your exam report.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> This blog was temporarily written by AI to test the visual radar. The handwritten blog will be available soon.
{.prompt-danger }
<!-- markdownlint-restore -->

## Why go for the OSCP? 🔍

The OSCP isn't an end in itself: it's a great way to deepen your technical knowledge in offensive security. If you want to better understand the technical side of vulnerabilities, the certification will help you:

- better understand how a vulnerability actually works;
- better understand the impacts and possible post-exploitation once it's exploited;
- better understand the consequences on an environment following an exploitation;
- better recognize misconfigurations in code and infrastructure;
- be more confident when you find yourself facing the unknown.

That said, the OSCP is only worth it for you if its content aligns with your current or target role. It's not a certification you get "just to have it": it's a significant investment of time and money, so make sure it serves a concrete goal in your journey first.

## Before you dive in: the prerequisites 🧗

The OSCP is internationally recognized for its "high level" of difficulty, notably because it's one of the only hands-on penetration testing certifications that's been on the market for nearly 20 years (2006). It's not the hardest certification out there in pentesting, but it's far from easy. So you'll want to make sure you have enough of a skill foundation before diving in.

### The baseline skills

Before you start, you should already be comfortable with the fundamentals around vulnerabilities and their analysis:

- being able to explain a vulnerability to a non-technical audience, on your own;
- being able to contextualize vulnerabilities and offer relevant recommendations;
- being able to synthesize threats based on vulnerabilities and attack chains;
- being able to assess the real impact of a vulnerability or an attack chain.

These skills develop with experience, and there's no shortcut: it's by working regularly with vulnerabilities that you'll build them. The time required varies a lot from one person to the next depending on your professional and personal background.

### Technical experience: the real barrier

Once the baseline skills are covered, you hit the most demanding prerequisite and the biggest barrier to entry: technical experience.

Nobody should take on the OSCP without several technical prerequisites, and it's one of the hardest steps to clear. You have to be honest with yourself: do you have enough hands-on expertise to put in the required time and have a reasonable shot at passing the exam? Two big blockers for everyone:

- **The cost.** The course now runs close to **4,000 CAD**.
- **The time.** It's a commitment of at least **300 hours** to go through the content, complete the labs, the *Challenge Labs*, the boxes suggested in the *TJ Null List*, plus several dozen additional boxes on *Proving Grounds*. In many cases, it can take 500 hours, or even upwards of 700 hours, to complete everything and be comfortable enough for the exam. All of that within a window of less than 365 days.

### How to demonstrate (and build) your readiness

There are several ways to build and prove your technical expertise before diving in. Here are a few that are widely recognized:

- **Strongly recommended:** earn affordable, hands-on offensive security certifications like **eJPT** and/or **CRTP**;
- several years of professional pentest experience;
- completing a large number of boxes on "black box" style platforms like **HackTheBox** and **Proving Grounds**;
- a solid ranking in recognized CTFs, like **NorthSec** or **RingZer0** (for example, being in the top 100 or having more than 500 points on RingZer0).

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Those who earned eJPT and/or CRTP beforehand generally have a much easier time approaching the OSCP. If you have neither, you'll have to work hard to build a solid foundation before diving in.
{.prompt-tip }
<!-- markdownlint-restore -->

You have to start somewhere, and it's very rare to begin with one of the certifications known to be among the hardest. Take the time to build your foundations: you'll save yourself a lot of frustration once the journey is underway.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> If you access the course through a **LearnOne** subscription (a year of access to OffSec's platform), you also get two "lighter" courses: **PEN-100** (KLCP) and **PEN-210** (OSWP). I'd suggest starting with PEN-210: the content is the same level as PEN-200, but much shorter, and it's a nice introduction before tackling the OSCP. I go into detail about it in my post on the [OSWP](/post/2025-05-26-oswp/).
{.prompt-info }
<!-- markdownlint-restore -->

## The PEN-200 course: where to start 📚

Congrats, you have access to the OSCP! Taking on a course as massive as PEN-200 can be overwhelming, so let's look at how to approach it.

PEN-200 has roughly 25 modules that vary greatly in length and complexity. Each module is split into three parts:

- **the text;**
- **the videos;**
- **the labs.**

The text and the videos are practically identical: it becomes redundant to read the text *and* watch the videos of the same module back to back. The videos do become useful when you start doing the labs, though, since those are in the vast majority of cases based on the videos (and on the text, to a certain extent). Since the lab instructions aren't always clear, it's easier to follow them alongside the videos.

Each module also includes harder labs, the **Capstone** labs, which assume you've completed the whole course. It's not impossible to do them earlier, but there's a good chance you'll break your head over a solution that gets explained in detail later in the course. If you want to attempt them anyway, you can find hints on OffSec's Discord.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> The **OffSec Discord** community is very active, and full-time employees answer questions with an SLA of only 60 minutes. Use the `pen-200-module-labs` channel to ask your questions and look for answers. You'll often get answered with "*Try Harder*" or "*Git Gud*", but some people will guide you with good questions so you find the solution yourself. In almost every case, someone has already asked the same question: search for the exercise number to find leads. Don't let yourself be intimidated: we've all been a "noob", and it's through practice that you improve.
{.prompt-tip }
<!-- markdownlint-restore -->

## The PEN-200 labs 🏋️

Completing the labs is probably the best way to absorb the material efficiently. It's like the gym: it's by repeating similar exercises that you improve and better understand what they're for. OffSec's labs are a bit like specialized machines: they work one very specific section correctly, and thanks to the available assistance, you can push that section a bit more intensely. By working through several specific sections, you end up progressing quickly, even without assistance, because you'll have developed the right habits.

An important bit of history: before the November 2024 curriculum overhaul, it was possible to earn **10 bonus points** on the exam simply by completing 80% of the course and labs. Those points have since been removed, in exchange for points awarded for a *partial* compromise of the Active Directory environment on the exam (a change tied to the certification's recognition by the U.S. Department of Defense).

So there's less incentive today to complete everything, but it's still essential to do as much as possible: **everything in PEN-200, labs included, can show up on the exam.** Once the labs are done, prepare for the exam by applying what you've learned on Proving Grounds boxes.

## Preparing with Proving Grounds 🥊

Before the exam, it's strongly recommended to complete a good number of boxes on **Proving Grounds** (or simply PG), which comes with LearnOne access. OffSec even publishes stats on the exam pass rate based on the number of completed boxes (boxes drawn from old OSCP exams). I find the numbers seem a bit inflated and don't reflect an absolute pass rate, but the message is clear enough: the more you complete, the better off you are.

Watch out for the time required, though. Some boxes get completed in under 20 minutes, but others can take 3 or 4 hours. Don't underestimate the effort: you can easily put in 200, 300, even 500 hours just to prepare and condition yourself for the exam.

As the French saying goes: **it's by forging that one becomes a blacksmith** (practice makes perfect).

*(Tip: this is a good spot to insert the OffSec stats screenshot illustrating the correlation between the number of completed boxes and the pass rate.)*

## The Proving Grounds boxes 📦

To know which boxes to do, it's strongly recommended to complete the entirety of the **TJ Null list**, a frequently updated Google Sheets document recognized as great preparation for the OSCP.

The **PG Play** platform is considered slightly easier: start with that one. For the other boxes on **PG Practice**, there's no imposed order; you can rely on the community-assigned difficulty to gauge each one.

My recommendation on methodology:

- Try to complete a box **without external help**.
- Only use a walkthrough **after an honest effort**, or after being stuck for an extended period. The goal is to adopt the "*Try Harder*" mindset, without giving up after only 30 minutes.
- It's reasonable to reach for external help after more than **2 hours** on the same box.

The point of a walkthrough isn't just to complete the box, but to **understand why** you didn't spot the intended attack vector, or why your exploitation didn't work. That way you strengthen your methodology, expand your toolkit, and learn to better recognize the most likely attack vectors. As you complete more boxes, you'll spot the "patterns" to follow to fully compromise a machine more and more easily. In short, you learn most by getting your hands dirty.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> If you want to get a head start, an annual PG subscription is relatively affordable compared to the rest: about **200 USD** for full access for a year. HackTheBox's annual VIP+ subscription works out to roughly the same level of access, at about **203 USD**.
{.prompt-info }
<!-- markdownlint-restore -->

## The Challenge Labs 🕸️

There are three I strongly recommend completing ahead of the exam:

- **0. Secura** (the easiest)
- **1. Medtech**
- **2. Relia**
- **3. Skylark** (out of scope for the OSCP, but a nice challenge to take on)

These are full **Active Directory** environments, and the goal is to pivot inside a large network. Some machines won't be exploitable (or simply not reachable) at the start, and that's normal: you'll have to build a game plan to figure out what to attack and how to compromise a first "web facing" machine that's part of the AD network. After that, it's a matter of pivoting, privilege escalation, persistence, and reconnaissance to reach the following machines. Once you're **Domain Admin**, you've practically finished the lab and can compromise the entire network.

These labs are very satisfying to complete, but the resources to get help are more limited. They'll require extra effort and several hours (or even a few days), but they're extremely instructive. Note that OffSec has added extra labs since; I don't cover them here, as I haven't tested them.

## The exam practices: OSCP A, B, and C 🧪

Three other labs carry a naming scheme that may have caught your eye:

- **4. OSCP A**
- **5. OSCP B**
- **6. OSCP C**

These are also labs, but their goal is to reproduce the **format of an OSCP exam**. Each contains two Linux machines, one standalone Windows machine, plus an AD environment of three machines: an initial foothold, an intermediate machine in a different subnet, and a domain controller to compromise in order to become Domain Admin. According to OffSec, these are former exam machines.

Here's what I'd advise: block off **24 hours** to try to complete all the machines in a lab, **without external help** (Discord, ChatGPT, a friend). The goal is to simulate the exam as faithfully as possible and test your real performance. Once the 24 hours are up, do a retrospective: how did it go? How did you feel? What were the blockers, the technical challenges, your morale, your wins? It's important to understand how ready you actually are. If you didn't manage to compromise some machines, finish them with a clear head and don't hesitate to seek help on the tougher sections.

Once the three are done, you'll have good indicators to assess your performance across different aspects of the exam. Then keep completing PG boxes to stay "in the flow" and well prepared.

## A few days before the exam ⏳

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Book your **first** exam at least **6 to 8 weeks** before your LearnOne subscription expires. If you fail your first attempt, you'll have a 4-week cooldown before you can rebook. And if your subscription ends during a busy period (the holidays, for example), good luck finding a slot. OffSec shows no mercy: if the next available date falls after your subscription expires, you lose an attempt. And since the 2024 overhaul, exam attempts have become very expensive.
{.prompt-warning }
<!-- markdownlint-restore -->

The week before the exam, the recipe is simple: keep completing boxes on Proving Grounds (or redo some you've already done), **without external help**, and finish the Challenge Labs if you have any left. Then prepare:

- **your notes** and your note-taking template for the exam;
- **your tools** (privilege escalation, webshell, automated reconnaissance, persistence, AD, pivoting, `mimikatz`, `ncat`, `linpeas`, `printspoofer`, Daniel Miessler's wordlists/SecLists, etc.);
- **your VMs** and your work environment.

The **day before the exam**, don't do anything related to offensive security. Rest and sleep well: a day of mental rest makes a considerable difference in performance. Still, take the opportunity to test that your VM and baseline tools work, to avoid nasty surprises on exam day.

To reuse the sports analogy: the OSCP exam is a marathon. You don't want to burn yourself out the day before the event, and it's very hard to run a marathon without having first completed a few half-marathons without too much difficulty.

## Exam day 🚩

This is it, the moment you've been waiting for has arrived. The routine is the same as during your prep: you do the boxes, you take your notes and screenshots, and every one or two hours, you take a break before coming back to an exercise. A break won't magically hand you the answer, but it'll let you step back and question what you've done — and what's left to try.

**Momentum** is a critical factor: once you land your first 10 points, you'll get a considerable confidence boost. Ride that wave.

Without giving too much away, and contrary to popular belief: **all of the exam content is covered in PEN-200.** If you have to do privilege escalation on a Windows machine, the appropriate technique is part of what you saw in the course. Also keep the **KISS** principle in mind (*Keep It Stupid Simple*): you're not expected to develop a "zero-day" to compromise a machine.

A few concrete guidelines:

- If you need to connect to a service, make sure you have usernames and/or passwords on hand.
- There may be some *bruteforce*, but it shouldn't take more than **10 minutes** to find a valid combination. If your estimate goes well beyond that, you're probably not on the right track: move on.
- There's a good chance some machines contain **rabbit holes**. It's up to you to spot them so you don't waste too much time on them.
- Don't get discouraged if the initial access is harder than the privilege escalation. It's entirely possible to nail every privesc step without having gained the initial access.
- At this stage, you shouldn't depend 100% on automated reconnaissance tools anymore. They're reliable, but you lose a lot of time looking for the right information in the ocean of irrelevant data they generate.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Before the exam ends, take **all** the screenshots you need to reproduce the compromise steps, while the environment is still available. You must be able to explain each exploitation from A to Z using only your screenshots. Better to have too many than not enough. Above all, you must have a screenshot for **every** flag, including the machine's IP address and the username you're connected as. **Without those screenshots, you get no points, even if you submitted the correct flag on the portal.**
{.prompt-danger }
<!-- markdownlint-restore -->

## Once the exam is over: the report 📄

After a long day of effort, you're either euphoric or disappointed. Regardless of the score, your sprint begins: **writing the pentest report**, due within **24 hours** of the exam ending. Its length varies enormously — from 15 to 50 pages — and trust me, 24 hours pass much faster than you'd imagine.

A few essential points:

- **Polish your English** and minimize mistakes. The report is graded strictly, and you can lose points for presentation errors, missing evidence, or numerous spelling mistakes.
- Your **flag screenshots with the username** (and IP address) are essential. Without them, your points simply don't count.
- If you're missing a screenshot demonstrating a step of your exploitation, you can, **as a last resort only**, use the text output of the command to fill the gap.
- Once the report is done, **verify your document's hash**, send it to OffSec, and confirm the submission. The process will ask you to verify the hash: until that's done, your report isn't officially submitted. Double-check everything several times, because once submitted, you can't change anything.

All that's left is to wait for the result, which will arrive by email within the following week. Don't count on OffSec for detailed feedback in case of failure: you'll get almost nothing. That's also why it's important to **complete the report even if you think you failed** — it's excellent practice, and it lets you walk back through your exam to identify what you could have done differently.

## Was it worth it? 🤔

The OSCP demands a serious investment: money, hundreds of hours, and a good dose of perseverance. But it's also one of the few certifications that truly forces you to *do* rather than *memorize*. Once you receive the passing email, you'll have crossed an important milestone in your offensive security journey, and you can be proud of your exploit (literally). There will be even bigger challenges afterward, but for now, enjoy a well-deserved rest.

## TL;DR 🎯

- Build your foundations **before** diving in: ideally eJPT and/or CRTP, plenty of HTB/PG boxes, and CTFs if you can.
- Plan for **300+ hours** (often 500-700) over a maximum of 365 days, and a cost of around **4,000 CAD**.
- Complete as much PEN-200 content as possible: anything can show up on the exam.
- Chain through **Proving Grounds** boxes (TJ Null list), the **Challenge Labs**, then the **OSCP A/B/C** exam practices under real conditions (24 hours, no help).
- Book your exam **6 to 8 weeks** before LearnOne expires, rest the day before, and **capture everything** (flags + IP + username).
- Write a polished report within 24 hours, even in case of failure.

Thanks for taking the time to read all of this. I hope this guide helps you better plan your journey and put every odd in your favor for the OSCP exam. Good luck, and *Try Harder*!
