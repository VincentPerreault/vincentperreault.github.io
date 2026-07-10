---
title: Un aperçu de OSCP+ et PEN-200
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
description: Un aperçu de l'examen OSCP+ et du cours PEN-200.
toc: true
comments: false
image:
  path: oscp+.png
  alt: Le badge OSCP+
---



J'ai passé mon examen OSCP+. Voici comment je m'y suis pris, et surtout comment tu peux maximiser tes chances de réussite si tu comptes te lancer dans l'aventure. Ce billet se veut un guide pratique, du moment où tu te demandes si tu es prêt jusqu'à l'envoi de ton rapport d'examen.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Ce blog a temporairement été rédigé par l'IA, pour but de tester le radar visuel. Le blog écrit à la main arrivera prochainement.
{.prompt-danger }
<!-- markdownlint-restore -->

## Pourquoi viser l'OSCP? 🔍

L'OSCP n'est pas une fin en soi : c'est un excellent moyen d'approfondir tes connaissances techniques en sécurité offensive. Si tu veux mieux comprendre l'aspect technique des vulnérabilités, la certification va te permettre de :

- mieux comprendre comment une vulnérabilité fonctionne réellement;
- mieux comprendre les impacts et les post-exploitations possibles une fois qu'elle est exploitée;
- mieux comprendre les conséquences sur un environnement à la suite d'une exploitation;
- mieux reconnaître les mauvaises configurations dans le code et l'infrastructure;
- être plus confiant lorsque tu te retrouves face à l'inconnu.

Cela dit, l'OSCP n'a de valeur pour toi que si son contenu est aligné avec tes fonctions actuelles ou celles que tu vises. Ce n'est pas une certification qu'on obtient « juste pour le faire » : c'est un investissement important en temps et en argent, alors assure-toi d'abord qu'elle sert un objectif concret dans ton parcours.

## Avant de te lancer : les prérequis 🧗

L'OSCP est reconnue à l'international pour son « haut niveau » de difficulté, notamment parce qu'elle est l'une des seules certifications pratiques liées aux tests d'intrusion à être sur le marché depuis près de 20 ans (2006). Ce n'est pas la certification la plus difficile qui existe en pentest, mais elle n'est pas facile pour autant. Il faut donc t'assurer d'avoir un bagage de compétences suffisant avant de te lancer.

### Les compétences de base

Avant de commencer, tu devrais déjà être à l'aise avec les fondamentaux entourant les vulnérabilités et leur analyse :

- être capable d'expliquer une vulnérabilité à un public non technique, de manière autonome;
- être capable de contextualiser les vulnérabilités et d'offrir des recommandations pertinentes;
- être capable de synthétiser les menaces en fonction des vulnérabilités et des chaînes d'attaque;
- être capable d'évaluer l'impact réel d'une vulnérabilité ou d'une chaîne d'attaque.

Ces compétences se développent avec l'expérience, et il n'y a pas de raccourci : c'est en travaillant régulièrement avec des vulnérabilités que tu vas les acquérir. Le temps requis varie beaucoup d'une personne à l'autre selon ton bagage professionnel et personnel.

### L'expérience technique : la vraie barrière

Une fois les compétences de base acquises, on arrive au prérequis le plus exigeant et à la plus grande barrière à l'entrée : l'expérience technique.

Personne ne devrait se lancer dans l'OSCP sans plusieurs préalables techniques, et c'est l'une des étapes les plus difficiles à franchir. Il faut être honnête avec toi-même : as-tu assez d'expertise pratique pour consacrer le temps nécessaire et avoir une chance raisonnable de réussir l'examen? Deux gros bloquants pour tout le monde :

- **Le coût.** Le cours coûte désormais près de **4 000 $ CAD**.
- **Le temps.** C'est un engagement d'au minimum **300 heures** de ton temps pour passer à travers le contenu, compléter les laboratoires, les *Challenge Labs*, les « boxes » suggérées dans la *TJ Null List*, ainsi que plusieurs dizaines de boxes supplémentaires sur *Proving Grounds*. Dans bien des cas, ça peut prendre 500 heures, voire au-delà de 700 heures, pour tout compléter et être suffisamment à l'aise pour l'examen. Le tout, dans un délai de moins de 365 jours.

### Comment démontrer (et bâtir) ta préparation

Il y a plusieurs manières de développer et de prouver ton expertise technique avant de te lancer. En voici quelques-unes qui sont largement reconnues :

- **Fortement recommandé :** obtenir des certifications abordables et pratiques en sécurité offensive, comme **eJPT** et/ou **CRTP**;
- plusieurs années d'expérience professionnelle en pentest;
- avoir complété un grand nombre de boxes sur des plateformes de style « black box », comme **HackTheBox** et **Proving Grounds**;
- un bon classement dans des CTF reconnues, comme le **NorthSec** ou **RingZer0** (par exemple, être dans le top 100 ou avoir plus de 500 points sur RingZer0).

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Ceux qui ont préalablement obtenu eJPT et/ou CRTP ont généralement beaucoup plus de facilité à aborder l'OSCP. Si tu n'as ni l'une ni l'autre, tu vas devoir travailler d'arrache-pied pour te bâtir une base solide avant de te lancer.
{.prompt-tip }
<!-- markdownlint-restore -->

Il faut commencer quelque part, et il est très rare de débuter avec l'une des certifications reconnues pour être parmi les plus difficiles. Prends le temps de bâtir tes fondations : tu t'éviteras bien des frustrations une fois l'aventure commencée.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Si tu accèdes au cours via un abonnement **LearnOne** (un an d'accès à la plateforme d'OffSec), tu obtiens aussi deux cours plus « légers » : **PEN-100** (KLCP) et **PEN-210** (OSWP). Je te suggère de commencer par PEN-210 : le contenu est du même niveau que PEN-200, mais nettement plus court, et c'est une belle introduction avant de t'attaquer à l'OSCP. J'en parle en détail dans mon billet sur l'[OSWP](/fr/post/2025-05-26-oswp/).
{.prompt-info }
<!-- markdownlint-restore -->

## Le cours PEN-200 : par où commencer 📚

Félicitations, tu as accès à l'OSCP! S'attaquer à un cours aussi imposant que le PEN-200 peut être accablant, alors voyons comment l'aborder.

Le PEN-200 comporte environ 25 modules qui varient grandement en durée et en complexité. Chaque module est divisé en trois parties :

- **le texte;**
- **les vidéos;**
- **les labos.**

Le texte et les vidéos sont pratiquement identiques : il devient donc redondant de lire le texte *et* de regarder les vidéos d'un même module l'un à la suite de l'autre. Les vidéos deviennent toutefois utiles au moment de faire les labos, car ceux-ci sont dans la grande majorité des cas fondés sur les vidéos (et sur le texte, jusqu'à un certain point). Comme les instructions des labos ne sont pas toujours claires, il est plus simple de les suivre en même temps que les vidéos.

Chaque module contient aussi des labos plus difficiles, les **Capstone**, qui supposent d'avoir complété le cours au complet. Ce n'est pas impossible de les faire avant, mais il y a de bonnes chances que tu te casses la tête sur une solution qui sera expliquée en détail plus loin dans le cours. Si tu veux quand même les tenter, tu peux trouver des indices sur le Discord d'OffSec.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> La communauté du **Discord d'OffSec** est très active, et des employés à temps plein répondent aux questions avec un SLA de seulement 60 minutes. Utilise le canal `pen-200-module-labs` pour poser tes questions et chercher des réponses. Tu vas souvent te faire répondre « *Try Harder* » ou « *Git Gud* », mais certaines personnes vont te guider avec de bonnes questions pour que tu trouves la solution par toi-même. Dans la quasi-totalité des cas, quelqu'un a déjà posé la même question : cherche le numéro de l'exercice pour trouver des pistes. Ne te laisse pas intimider : on a tous déjà été un « noob », et c'est à force de pratiquer qu'on s'améliore.
{.prompt-tip }
<!-- markdownlint-restore -->

## Les labos du PEN-200 🏋️

Compléter les labos est probablement la meilleure façon d'absorber la matière efficacement. C'est comme le gym : c'est à force de répéter des exercices similaires qu'on s'améliore et qu'on comprend mieux à quoi ils servent. Les labos d'OffSec, ce sont un peu comme les machines spécialisées : ils travaillent une section très précise correctement, et grâce à l'assistance disponible, tu peux pousser cette section un peu plus intensément. En travaillant plusieurs sections spécifiques, tu finis par progresser rapidement, même sans assistance, parce que tu auras développé les bonnes habitudes.

Un point d'histoire important : avant la refonte du curriculum de novembre 2024, il était possible d'obtenir **10 points bonus** à l'examen simplement en complétant 80 % du cours et des laboratoires. Ces points ont depuis été retirés, en échange de points accordés pour une compromission *partielle* de l'environnement Active Directory à l'examen (un changement lié à la reconnaissance de la certification par le Département de la Défense américain).

Il y a donc aujourd'hui moins d'incitatif à tout compléter, mais il reste primordial d'en faire le plus possible : **tout ce qui se trouve dans le PEN-200, laboratoires inclus, peut se retrouver à l'examen.** Une fois les labos complétés, prépare-toi à l'examen en appliquant ce que tu as appris sur les boxes de Proving Grounds.

## Se préparer avec Proving Grounds 🥊

Avant l'examen, il est fortement recommandé de compléter un bon nombre de boxes sur **Proving Grounds** (ou simplement PG), qui vient avec l'accès LearnOne. OffSec publie même des statistiques sur le taux de réussite à l'examen en fonction du nombre de boxes complétées (des boxes issues d'anciens examens OSCP). Je trouve que les chiffres semblent un peu exagérés et qu'ils ne reflètent pas un taux de réussite absolu, mais le message reste assez clair : plus tu en complètes, mieux tu te portes.

Attention au temps requis, par contre. Certaines boxes se complètent en moins de 20 minutes, mais d'autres peuvent en prendre 3 ou 4. Ne sous-estime pas l'effort : tu peux facilement y mettre 200, 300, voire 500 heures juste pour te préparer et te conditionner à l'examen.

En bon français : **c'est en forgeant qu'on devient forgeron.**

*(Astuce : c'est un bon endroit pour insérer la capture des statistiques d'OffSec illustrant la corrélation entre le nombre de boxes complétées et le taux de réussite.)*

## Les boxes Proving Grounds 📦

Pour savoir quelles boxes faire, il est fortement recommandé de compléter l'entièreté de la **liste de TJ Null**, un document Google Sheets fréquemment mis à jour et reconnu pour être formateur en vue de l'OSCP.

La plateforme **PG Play** est considérée comme légèrement plus facile : commence par celle-là. Pour les autres boxes de **PG Practice**, il n'y a pas d'ordre imposé; tu peux te fier à la difficulté attribuée par la communauté pour évaluer chacune d'elles.

Ma recommandation sur la méthodologie :

- Essaie de compléter une boxe **sans aide externe**.
- N'utilise un walkthrough qu'**après un effort honnête**, ou après être resté coincé une période prolongée. L'objectif est d'adopter la mentalité « *Try Harder* », sans pour autant abandonner après seulement 30 minutes.
- Il est raisonnable de recourir à une aide externe après plus de **2 heures** sur une même boxe.

Le but d'un walkthrough n'est pas seulement de compléter la boxe, mais de **comprendre pourquoi** tu n'as pas repéré le vecteur d'attaque prévu, ou pourquoi ton exploitation n'a pas fonctionné. Tu renforces ainsi ta méthodologie, tu élargis ton inventaire d'outils et tu apprends à mieux reconnaître les vecteurs d'attaque les plus probables. À force de compléter des boxes, tu repéreras de plus en plus facilement les « patterns » à suivre pour compromettre une machine au complet. Bref, tu apprends surtout en mettant les mains à la pâte.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Si tu veux prendre de l'avance, un abonnement annuel à PG est relativement abordable comparé au reste : environ **200 $ US** pour un accès complet d'un an. L'abonnement annuel VIP+ de HackTheBox revient à peu près au même niveau d'accès, soit environ **203 $ US**.
{.prompt-info }
<!-- markdownlint-restore -->

## Les Challenges Labs 🕸️

Il y en a trois que je recommande fortement de compléter en vue de l'examen :

- **0. Secura** (le plus facile)
- **1. Medtech**
- **2. Relia**
- **3. Skylark** (hors de portée pour l'OSCP, mais un beau défi à relever)

Ce sont des environnements **Active Directory** complets, et l'objectif est de pivoter à l'intérieur d'un vaste réseau. Certaines machines ne seront pas exploitables (ou tout simplement pas joignables) au départ, et c'est normal : tu vas devoir établir un plan de match pour déterminer quoi attaquer et comment compromettre une première machine « web facing » faisant partie du réseau AD. Ensuite, c'est une question de pivot, d'élévation de privilèges, de persistance et de reconnaissance pour atteindre les machines suivantes. Une fois **Domain Admin**, tu as pratiquement terminé le labo et tu peux compromettre l'ensemble du réseau.

Ces labos sont très satisfaisants à compléter, mais les ressources pour obtenir de l'aide y sont plus limitées. Ils te demanderont donc un effort supplémentaire et plusieurs heures (voire quelques jours), mais ce sont des exercices extrêmement formateurs. Note qu'OffSec a ajouté des labos supplémentaires depuis; je ne les couvre pas ici, faute de les avoir testés.

## Les pratiques d'examen : OSCP A, B et C 🧪

Trois autres laboratoires portent une nomenclature qui t'a peut-être accroché l'œil :

- **4. OSCP A**
- **5. OSCP B**
- **6. OSCP C**

Ce sont aussi des laboratoires, mais leur objectif est de reproduire le **format d'un examen OSCP**. Chacun contient deux machines Linux, une machine Windows autonome, ainsi qu'un environnement AD de trois machines : un point d'accès initial, une machine intermédiaire dans un sous-réseau différent, et un contrôleur de domaine à compromettre pour devenir Domain Admin. Selon OffSec, ce sont d'anciennes machines d'examen.

Ce que je te conseille : planifie **24 h** pour tenter de compléter toutes les machines d'un labo, **sans aide externe** (Discord, ChatGPT, ami). Le but est de simuler l'examen le plus fidèlement possible et de tester tes performances réelles. Une fois les 24 h écoulées, fais une rétrospective : comment ça s'est déroulé? Comment t'es-tu senti? Quels ont été les bloquants, les enjeux techniques, ton moral, tes bons coups? Il est important de bien comprendre à quel point tu es prêt. Si tu n'as pas réussi à compromettre certaines machines, termine-les à tête reposée et n'hésite pas à aller chercher de l'aide sur les sections plus difficiles.

Une fois les trois complétés, tu auras de bons indicateurs pour évaluer tes performances sur différents aspects de l'examen. Continue ensuite à compléter des boxes PG pour rester « dans le flow » et bien préparé.

## Quelques jours avant l'examen ⏳

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Réserve ton **premier** examen au moins **6 à 8 semaines** avant l'expiration de ton abonnement LearnOne. Si tu échoues ta première tentative, tu auras un « cooldown » de 4 semaines avant de pouvoir replanifier. Et si ton abonnement se termine durant une période achalandée (le temps des fêtes, par exemple), bonne chance pour trouver une place. OffSec n'a aucune pitié : si la prochaine date disponible tombe après l'expiration de ton abonnement, tu perds une tentative. Et depuis la refonte de 2024, les tentatives d'examen sont devenues très dispendieuses.
{.prompt-warning }
<!-- markdownlint-restore -->

La semaine avant l'examen, la recette est simple : continue de compléter des boxes sur Proving Grounds (ou refais-en certaines que tu as déjà complétées), **sans assistance externe**, et termine les Challenges Labs s'il t'en reste. Prépare ensuite :

- **tes notes** et ton gabarit de prise de notes pour l'examen;
- **tes outils** (élévation de privilèges, webshell, reconnaissance automatique, persistance, AD, pivot, `mimikatz`, `ncat`, `linpeas`, `printspoofer`, les wordlists de Daniel Miessler/SecLists, etc.);
- **tes VM** et ton environnement de travail.

La **journée avant l'examen**, ne fais rien en lien avec la sécurité offensive. Repose-toi et dors bien : une journée de pause mentale fait une différence considérable sur la performance. Profites-en tout de même pour tester que ta VM et tes outils de base fonctionnent, afin d'éviter les mauvaises surprises le jour J.

Pour reprendre l'analogie sportive : l'examen OSCP, c'est un marathon. Tu ne veux pas t'épuiser la veille de l'épreuve, et il est très difficile de courir un marathon sans avoir d'abord complété quelques demi-marathons sans trop de difficulté.

## Le jour de l'examen 🚩

Ça y est, le moment tant attendu est arrivé. La routine est la même que pendant ta préparation : tu fais les boxes, tu prends tes notes et tes captures d'écran, et toutes les une ou deux heures, tu prends une pause avant de revenir sur un exercice. Une pause ne te donnera pas la réponse par magie, mais elle te permettra de prendre du recul et de te remettre en question sur ce que tu as fait — et sur ce qu'il te reste à essayer.

Le **momentum** est un élément critique : une fois ton premier 10 points obtenu, tu auras un gain de confiance considérable. Profites-en pour continuer sur ta lancée.

Sans trop en dévoiler, et contrairement à la croyance populaire : **tout le contenu de l'examen est couvert dans le PEN-200.** Si tu dois faire une élévation de privilèges sur une machine Windows, la technique appropriée fait partie de ce que tu as vu dans le cours. Garde aussi en tête le principe **KISS** (*Keep It Stupid Simple*) : on ne s'attend pas à ce que tu développes un « zero-day » pour compromettre une machine.

Quelques repères concrets :

- Si tu dois te connecter à un service, assure-toi d'avoir des noms d'utilisateur et/ou des mots de passe en main.
- Il peut y avoir du *bruteforce*, mais ça ne devrait pas prendre plus de **10 minutes** pour trouver une combinaison valide. Si ton estimation dépasse largement ça, tu n'es probablement pas sur la bonne piste : passe à autre chose.
- Il y a de fortes chances que certaines machines contiennent de **fausses pistes** (*rabbit holes*). C'est à toi de les repérer pour ne pas y perdre trop de temps.
- Ne te décourage pas si l'accès initial est plus difficile que l'élévation de privilèges. Il est tout à fait possible de réussir toutes les étapes de privesc sans avoir obtenu l'accès initial.
- À ce stade, tu ne devrais plus dépendre à 100 % des outils de reconnaissance automatique. Ils sont fiables, mais tu perds énormément de temps à chercher la bonne information dans l'océan de données non pertinentes qu'ils génèrent.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Avant la fin de l'examen, prends **toutes** les captures d'écran nécessaires pour reproduire les étapes de compromission, pendant que l'environnement est encore disponible. Tu dois pouvoir expliquer chaque exploitation de A à Z uniquement à l'aide de tes captures. Mieux vaut en avoir trop que pas assez. Surtout, tu dois avoir une capture pour **tous** les flags, incluant l'adresse IP de la machine et le nom d'utilisateur avec lequel tu es connecté. **Sans ces captures, tu n'obtiens aucun point, même si tu as soumis le bon flag sur le portail.**
{.prompt-danger }
<!-- markdownlint-restore -->

## Une fois l'examen terminé : le rapport 📄

Après une longue journée d'efforts, tu es soit euphorique, soit déçu. Peu importe le score, ton sprint commence : la **rédaction du rapport de pentest**, à remettre dans les **24 heures** suivant la fin de l'examen. Sa longueur varie énormément — de 15 à 50 pages — et crois-moi, 24 heures passent bien plus vite qu'on ne l'imagine.

Quelques points essentiels :

- **Soigne la qualité de ton anglais** et minimise les fautes. L'évaluation du rapport est pointilleuse, et tu peux perdre des points pour des erreurs de présentation, un manque de preuves ou de nombreuses fautes d'orthographe.
- Tes **captures de flags avec le nom d'utilisateur** (et l'adresse IP) sont essentielles. Sans elles, tes points ne comptent tout simplement pas.
- S'il te manque une capture démontrant une étape de ton exploitation, tu peux, **en cas d'urgence seulement**, utiliser le texte du résultat de la commande pour dépanner.
- Une fois le rapport terminé, **vérifie le hash de ton document**, envoie-le à OffSec et confirme la soumission. Le processus te demandera une vérification du hash : tant que ce n'est pas fait, ton rapport n'est pas officiellement envoyé. Vérifie tout à plusieurs reprises, car une fois soumis, tu ne pourras plus rien modifier.

Il ne te restera plus qu'à attendre le résultat, qui arrivera par courriel dans la semaine suivante. Ne compte pas sur OffSec pour une rétroaction détaillée en cas d'échec : tu n'auras presque rien. C'est aussi pour ça qu'il est important de **compléter le rapport même si tu penses avoir échoué** — c'est une excellente pratique, et ça te permet de repasser à travers ton examen pour identifier ce que tu aurais pu faire différemment.

## Est-ce que ça en valait la peine? 🤔

L'OSCP demande un investissement sérieux : de l'argent, des centaines d'heures, et une bonne dose de persévérance. Mais c'est aussi l'une des rares certifications qui te force réellement à *faire* plutôt qu'à *mémoriser*. Une fois le courriel de réussite reçu, tu auras franchi un jalon important dans ta progression en sécurité offensive, et tu pourras être fier de ton exploit (littéralement). Il y aura d'autres défis encore plus grands par la suite, mais pour l'instant, profite d'un repos bien mérité.

## TL;DR 🎯

- Bâtis tes fondations **avant** de te lancer : idéalement eJPT et/ou CRTP, beaucoup de boxes HTB/PG et, si possible, des CTF.
- Prévois **300 heures et plus** (souvent 500-700) sur un maximum de 365 jours, et un coût d'environ **4 000 $ CAD**.
- Complète le plus de contenu PEN-200 possible : tout peut se retrouver à l'examen.
- Enchaîne les boxes **Proving Grounds** (liste de TJ Null), les **Challenges Labs**, puis les pratiques d'examen **OSCP A/B/C** en conditions réelles (24 h, sans aide).
- Réserve ton examen **6 à 8 semaines** avant l'expiration de LearnOne, repose-toi la veille, et **capture tout** (flags + IP + nom d'utilisateur).
- Rédige un rapport soigné dans les 24 h, même en cas d'échec.

Merci d'avoir pris le temps de lire tout ça. J'espère que ce guide t'aidera à mieux planifier ton parcours et à mettre toutes les chances de ton côté pour l'examen OSCP. Bonne chance, et *Try Harder*!
