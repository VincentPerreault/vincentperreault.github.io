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

## Pourquoi viser OSCP? 🔍

La certification OSCP n'est pas une fin en soi : c'est un excellent moyen d'approfondir ses connaissances techniques en sécurité offensive. Si tu veux mieux comprendre l'aspect technique des vulnérabilités, la certification te permettra notamment de :

- mieux comprendre comment une vulnérabilité fonctionne réellement;
- mieux comprendre les impacts et les post-exploitations possibles une fois qu'une vulnérabilité est exploitée;
- mieux comprendre les conséquences dans un environnement technologique à la suite d'une exploitation;
- mieux reconnaître les mauvaises configurations dans le code et l'infrastructure;
- être plus confiant lorsque tu te retrouves face à l'inconnu;

Il faut toutefois prendre note que la certification OSCP t'apportera davantage de plus-value que si son contenu est aligné avec tes fonctions actuelles ou celles que tu vises. Ce n'est pas tant une certification que tu devrais obtenir « juste pour le faire » : c'est un investissement important en temps et en argent, alors assure-toi d'abord qu'elle sert un objectif concret dans ton parcours. 

Ceci étant dit, comme on dit, l'exception fait la règle : OSCP peut t'apporter une certaine valeur profesionnelle, particulièrement sur ton approche face à un problème, ta prise de notes et tes aptitudes de _troubleshooting_, et qui n'est pas forcément en lien avec un rôle en sécurité offensive. C'est notamment le cas pour ces deux personnes qui l'ont réussi ayant comme profession [dentiste](https://www.reddit.com/r/oscp/comments/rs38pm/a_different_kind_of_root_how_a_dentist_passed_the/) et [chirurgien bucale](https://www.reddit.com/r/oscp/comments/1f15xo1/oscp_on_the_first_attempt_by_an_oral_surgeon_my/). 

Ultimement, tu es le seul à savoir si ce cours correspond à ce que tu souhaite faire plus tard dans ta carrière. Si c'est simplement pour dire à tes chums de brosse que tu es un "∼≈⋒1337 h4x0r⋒≈∼", OSCP sera probablement _overkill_ pour tes besoins.

## Avant de te lancer : les prérequis 🧗

Parlant d'être _overkill_, OSCP est reconnue à l'international pour son « haut niveau » de difficulté, notamment parce qu'elle est l'une des seules certifications pratiques liées aux tests d'intrusion à être sur le marché depuis près de 20 ans (2006). Ce n'est pas la certification la plus difficile qui existe en pentest, bien au contraire, mais elle n'est pas facile pour autant. Il faut donc s'assurer d'avoir un bagage de compétences suffisant avant de s'y lancer.

### Autoévaluation sur les fondamentaux

Ce n'est pas évident de faire une autoévaluation de ses propres compétences, et encore moins via le biais d'un simple blog. La checklist suivante n'est pas un indicateur absolu pour déterminer si tu as les fondamentaux pour bien comprendre le contenue du cours PEN-200, sans pour autant valider pour la mille et unième fois c'est quoi le CIA en cybersécurité... Plutôt, il devrait être vue comme un guide à prendre avec un grain de sel, et de fournir des pistes de recherche potentielles si jamais il y a des lacunes.

La _checklist_ ci-dessous n'a pas pour but de tester tes connaissances sur des outils ni des techniques d'attaque : elle vient tester les réflexes de base sur lesquels tout le reste du cours PEN-200 va s'appuyer, et c'est pour ça que la formulation de certaines questions permet des réponses plus flexibles. Si plusieurs cases restent vides, ce n'est pas un échec : ce n'est qu'un signe que ton temps et ton argent seront mieux investis ailleurs pour l'instant et d'y revenir plus tard.

{{< checklist title="Autoévaluation sur les fondamentaux" >}}

- [ ] Je suis à l'aise à me déplacer dans un système de fichiers Linux ou Windows en ligne de commande, sans rechercher la syntaxe à chaque fois
- [ ] Je comprends ce qu'est une adresse IP privée, un port et un pare-feu, et comment les trois interagissent
- [ ] Je peux lire un script Python, Bash, Batch et Powershell écrit par quelqu'un d'autre et expliquer sommairement ce qu'il fait
- [ ] Je sais interpréter le résultat d'un balayage de ports et décider quoi examiner en premier
- [ ] Je fais la différence entre une session ordinaire et une session privilégiée (root, NT Authority/SYSTEM, domain admin)
- [ ] J'ai déjà monté, configuré et "cassé" une machine virtuelle sans paniquer
- [ ] Je cherche une réponse dans la documentation ou dans le code avant de chercher de l'aide
- [ ] Je cherche à comprendre comment une vulnérabilité fonctionne
- [ ] Je sais reconnaitre les limites lorsque je fais face à un sujet que je ne maîtrise pas
- [ ] J'ai une bonne éthique professionnelle
- [ ] Je prends des notes qu'une autre personne pourrait suivre sans moi
- [ ] Je suis capable de rester bloqué quelques heures sur un problème sans abandonner

{{< /checklist >}}

Si tu fais déjà des CTF, tu devrais avoir plusieurs, voir toutes ces cases cochés, ce qui signifie que tu as déjà les connaissances et réflexes requis pour poursuivre une formation intensive en sécurité offensive. Si tu as quelques cases qui ne sont pas cochées, ne t'inquiète pas : ce sont tous des choses que tu vas apprendre en cours de route durant la formation PEN-200, mais prends notes que chaque point non maitrisé te demandera un certain rattrapage et un effort supplémentaire à compenser durant ton apprentisage.

### Mini-quiz

Maintenant, laisson place à quelque chose d'un peu plus ardu : voici douze questions pour tester ton expertise technique en lien avec de la matière que tu vas voir au courant de ton parcours PEN-200. Quoiqu'elles couvrent d'une certaine manière la matière du PEN-200, les questions couvrent ce que le cours tient pour acquis dès les premiers modules. Les questions sont volontairement plus difficile que nécessaire pour tester l'expertise technique de base requis pour le cours, mais ce sont tous des choses que tu vas retrouver dans la formation PEN-200. Essaie quand même de répondre sans rien chercher sur Internet, afin de rester intègre (ça va tester ton éthique en même temps, _clin d'oeil clin d'oeil_).

{{< quiz title="Mini-quiz : douze questions" >}}

Tu trouves `-rwsr-xr-x 1 root root /usr/local/bin/backup`. Que t'indique le `s`?

- [ ] le fichier est un lien symbolique
- [x] le fichier s'exécute avec les privilèges de son propriétaire
- [ ] le fichier est écrit sur le disque à chaque modification
- [ ] seul root peut lire le fichier
- [ ] le fichier ne peut pas être supprimé par un autre utilisateur

> Le bit SUID est le vecteur d'élévation de privilèges le plus courant sous Linux.

Sur une distribution Linux moderne, quelle commande liste les ports TCP en écoute **avec** le processus qui les détient?

- [ ] `ifconfig -a`
- [ ] `route -n`
- [x] `ss -tlnp`
- [ ] `top -p tcp`
- [ ] `ls -la /proc/net`

> `netstat` a disparu des distributions modernes, et de l'énumération locale, tu vas en faire sur chaque machine.

`sudo -l` te répond `(ALL) NOPASSWD: /usr/bin/find`. Pourquoi est-ce que la partie est terminée?

- [ ] parce que `find` peut lire `/etc/shadow` directement
- [x] parce que `find` peut lancer une commande avec `-exec`, ce qui donne un shell root
- [ ] parce que ça prouve que le fichier sudoers est modifiable par tout le monde
- [ ] parce que ça permet de remplacer `/usr/bin/find` par son propre binaire
- [ ] elle ne l'est pas : `find` ne fait que lire des fichiers

> Les réflexes GTFOBins sont tenus pour acquis dès le départ.

Un *reverse shell* fonctionne parce que :

- [ ] tu te connectes à un port que la cible a ouvert pour toi
- [x] la cible se connecte vers un écouteur que tu contrôles
- [ ] la cible et ta machine négocient une session partagée en UDP
- [ ] le shell transite par la passerelle par défaut de la cible
- [ ] le pare-feu de la cible est désactivé

> Mal comprendre ça rend insoluble chaque problème de pare-feu que tu vas rencontrer.

Tu balayes un hôte Windows et le port `5985/tcp` est ouvert. Qu'est-ce que ça t'offre?

- [ ] un partage SMB à énumérer
- [ ] un annuaire LDAP interrogeable anonymement
- [x] un point d'accès WinRM, donc un shell distant si tu as des identifiants valides
- [ ] une session RDP
- [ ] une instance MSSQL

> L'accès Windows après la récupération d'identifiants est au coeur de la portion Active Directory.

À partir de `https://target/view?file=FinancialReportQ2.pdf`, tu essaies `file=../../../../etc/passwd` et le fichier s'affiche. De quoi s'agit-il?

- [ ] d'un SQLi
- [ ] d'un XSS
- [x] d'un _path traversal_, ou LFI
- [ ] d'un SSRF
- [ ] d'un CSRF

> C'est le point d'entrée web le plus fréquent sur les boxes de Proving Grounds.

Qu'est-ce que le *Kerberoasting*, en une phrase?

- [ ] forcer par dictionnaire le contrôleur de domaine à travers le réseau
- [x] demander un ticket de service pour un compte doté d'un SPN, puis le casser hors ligne
- [ ] extraire des identifiants de la mémoire du processus LSASS
- [ ] relayer une authentification NTLM vers LDAP
- [ ] forger un TGT à partir du secret du compte krbtgt

> Active Directory est maintenant obligatoire à l'examen, ce n'est plus une portion que tu peux éviter.

Tu as l'empreinte NTLM d'un utilisateur, mais pas son mot de passe. Qu'est-ce qui est réaliste?

- [ ] rien : l'empreinte est inutile tant qu'elle n'est pas cassée
- [x] t'authentifier directement sur SMB avec l'empreinte (*pass-the-hash*)
- [ ] déchiffrer l'empreinte avec la clé publique du domaine
- [ ] la saisir telle quelle dans une fenêtre de connexion RDP standard
- [ ] l'envoyer au KDC comme horodatage de pré-authentification Kerberos

> Une empreinte est un identifiant à part entière; l'ignorer, c'est perdre des heures à vouloir la casser.

Tu compromets un hôte qui possède une seconde carte réseau sur `172.16.50.0/24`, injoignable depuis ta machine. Quelle est la suite?

- [ ] relancer le balayage depuis ta machine avec `--source-port 445`
- [x] monter un proxy SOCKS ou une redirection de port à travers l'hôte compromis
- [ ] ajouter `172.16.50.0/24` à ta table de routage locale
- [ ] usurper l'adresse MAC de la seconde interface
- [ ] demander un accès VPN vers ce segment

> Le pivot est l'endroit où la majorité des premières tentatives calent.

Un balayage `nmap` par défaut ne donne rien d'intéressant. Que fais-tu?

- [ ] tu conclus que l'hôte est hors périmètre
- [ ] tu relances exactement le même balayage pour en être certain
- [x] tu balayes les 65535 ports, tu ajoutes la détection de version et tu vérifies l'UDP
- [ ] tu passes à la machine suivante et tu y reviendras plus tard
- [ ] tu lances un scanneur de vulnérabilités et tu attends le rapport

> « Je n'ai rien trouvé » veut presque toujours dire « je n'ai pas assez énuméré ».

Un exploit public échoue avec `SyntaxError` sur la ligne `print "shell"`. La correction minimale, c'est :

- [ ] recompiler l'exploit avec `gcc`
- [x] l'exécuter avec Python 2, ou convertir les `print` en appels de fonction
- [ ] changer la version de Python installée sur la cible
- [ ] ajouter un en-tête `#!/usr/bin/env python3` et relancer
- [ ] chercher un autre exploit, celui-là est brisé

> Les exploits publics fonctionnent rarement sans retouche, et c'est exactement ce que le cours va te demander de faire.

Tu obtiens `root` sur une machine d'examen à 3 h du matin, tu récupères le drapeau et tu vas te coucher. Tes notes contiennent le drapeau, mais pas la commande qui t'y a mené. Qu'est-ce qui arrive?

- [ ] rien, le drapeau est la preuve
- [x] tu perds les points : une trouvaille doit être reproductible à partir du rapport
- [ ] tu obtiens des points partiels pour le drapeau
- [ ] tu peux envoyer les étapes à OffSec après coup
- [ ] les journaux du laboratoire servent à reconstituer tes étapes

> Le rapport est le livrable, pas le shell : sans étapes reproductibles, la compromission n'existe pas.

{{< /quiz >}}

#### Ton résultat

| Score | Ce que ça veut dire |
|:---|:---|
| **11 à 12** | Tes fondations sont là. Ce qui te manque, c'est du volume : va accumuler des boxes sur Proving Grounds et compléter la liste de TJ Null. |
| **8 à 10** | Tu survivrais au PEN-200, mais tu apprendrais les bases sur la plateforme la plus chère du marché. Deux ou trois mois sur HackTheBox avant de commencer vont te faire économiser bien du temps et de l'argent. |
| **5 à 7** | Pas encore. eJPT ou CPTS vont combler cet écart beaucoup plus efficacement, et pour une fraction du prix. |
| **0 à 4** | Beaucoup trop tôt. Monte-toi un laboratoire, apprends Linux et les réseaux comme il faut, et reviens dans un an. Il n'y a aucune honte là-dedans : tout le monde a commencé là. |

### L'expérience technique : la vraie barrière

Une fois les compétences de base acquises, on arrive au prérequis le plus exigeant et à la plus grande barrière à l'entrée : l'expérience technique.

Personne ne devrait se lancer dans l'OSCP sans plusieurs préalables techniques, et c'est l'une des étapes les plus difficiles à franchir. Il faut être honnête avec toi-même : as-tu assez d'expertise pratique pour consacrer le temps nécessaire et avoir une chance raisonnable de réussir l'examen? Deux gros bloquants pour tout le monde :

- **Le coût.** Le cours coûte désormais près de 4'000 $ CAD.
- **Le temps.** C'est un engagement d'au minimum **300 heures** de ton temps pour passer à travers le contenu, compléter les laboratoires, les *Challenge Labs*, les « boxes » suggérées dans la *TJ Null List*, ainsi que plusieurs dizaines de boxes supplémentaires sur *Proving Grounds*. Dans bien des cas, ça peut prendre 500 heures, voire au-delà de 700 heures, pour tout compléter et être suffisamment à l'aise pour l'examen. Le tout, dans un délai de moins de 365 jours.

### Comment démontrer (et bâtir) ta préparation

Il y a plusieurs manières de développer et de prouver ton expertise technique avant de te lancer. En voici quelques-unes qui sont largement reconnues :

- **Fortement recommandé :** obtenir des certifications abordables et pratiques en sécurité offensive, comme [eJPT](https://ine.com/security/certifications/ejpt-certification), [CPTS](https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist) ou [CRTP](https://www.alteredsecurity.com/post/certified-red-team-professional-crtp);
- plusieurs années d'expérience professionnelle en pentest;
- avoir complété un grand nombre de boxes sur des plateformes de style « black box », comme **HackTheBox** et **Proving Grounds**;
- un bon classement dans des CTF reconnues, comme le **NorthSec** ou **RingZer0**;

 La liste ci-dessus n'est pas absolue; il y a plein d'autres certifications et d'autres manières qui te permetteront de démontrer ton expertise technique aux yeux des employeurs (et plein d'autres qui ne le démontreront pas...) Assure-toi d'investir ton temps dans les bonnes choses  et de faire un peu de recherche avant de lancer dans un projet d'envergure!

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> D'après mes observations, ceux qui ont préalablement obtenu eJPT et/ou CRTP ont généralement beaucoup plus de facilité à décrocher la formation OSCP auprès de leur employeur. Si tu n'as ni l'une ni l'autre, tu vas devoir travailler d'arrache-pied pour te bâtir une base solide avant de te lancer.
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