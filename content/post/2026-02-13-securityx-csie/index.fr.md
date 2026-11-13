---
title: J'ai passé SecurityX pour obtenir CSIE. Maintenant quoi?
date: 2026-02-13 01:31:22 -0500
date_updated: 2026-11-12 23:30:15 -0400
draft: false
categories:
  - Blogging
  - Certification
tags:
  - Writing
  - Advice
  - CompTIA
  - Certification
  - Opinion
  - Cybersecurity
  - Blogging
author: 
- VincentPerreault
description: Un aperçu de l'examen CAS-005 et du parcours de cybersécurité de CompTIA.
toc: true
comments: false
image:
  path: secx.png
  alt: Le badge SecurityX
---



J'ai passé l'examen SecurityX la semaine dernière après environ trois mois de préparation, et je veux partager quelques réflexions sur l'examen CAS-005, sur mes certifications CompTIA précédentes (Security+, PenTest+, ainsi que CySA+) et faire un bilan général pour savoir si tout ça en valait vraiment la peine ou non.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Ce blog a été écrit entièrement à la main et n'a pas été généré par l'IA.
{.prompt-info }
<!-- markdownlint-restore -->

## Mon expérience avant de réussir SecurityX 💼

Ça fait bientôt huit ans que je travaille dans le domaine des TI, dont cinq en cybersécurité; environ un an et demi comme _blue teamer_ et trois ans et demi en gestion des vulnérabilités. J'ai décroché quelques certifications entre-temps, comme Security+, PenTest+, CySA+, ainsi que l'OSCP et le Security Specialty d'AWS plus récemment. Depuis, je suis retourné aux études pour faire ma maîtrise. Bref, surtout dans mon poste actuel, j'ai eu la chance de travailler dans plusieurs domaines liés à la cybersécurité, mais aussi dans les TI en général. Tout ça m'a grandement aidé à me préparer pour cet examen.

## Ce que j'ai utilisé comme préparation pour réussir tous les examens CompTIA 📖

J'étais un grand fan d'Udemy pour trouver tout ce qu'il me fallait pour passer les certifications de CompTIA, que ce soit les cours de [Mike Meyers](https://www.udemy.com/user/total_seminars/) ou ceux de [Jason Dion](https://www.udemy.com/user/jason-dion/), ainsi que leurs [examens pratiques](https://www.udemy.com/courses/search/?q=compTIA+practice+exams). C'était abordable, le contenu vidéo des cours était directement applicable à la préparation de Security+, et les examens pratiques étaient étroitement reliés à ce qu'il y avait dans le vrai examen. Je recommande fortement le contenu Udemy pour se préparer à l'examen de Security+.

Toutefois, pour PenTest+ et CySA+, les cours Udemy ressemblaient plus à une révision de ce qu'on est déjà censé savoir, ce qui n'est pas nécessairement une mauvaise chose. Dès le départ, les cours présumaient que les connaissances de base en cybersécurité étaient acquises et assez bien maîtrisées. Même s'il y avait du déjà-vu ou du contenu un peu plus « de base », ce n'était souvent que sommaire. Bien que les examens pratiques aient été pertinents pour réussir les examens, les questions étaient un peu plus du côté facile que celles retrouvées dans les vrais examens. Autrement dit, les examens pratiques manquaient un peu de profondeur pour certaines questions plus poussées, surtout en préparation pour les PBQ (_Performance-Based Questions_) des vrais examens. Notamment pour l'examen de CySA+, certaines des PBQ étaient particulièrement complexes, et l'expérience de travail _hands-on_ (et même les CTF) m'a grandement aidé à répondre à ces questions. Certaines questions sont assez faciles, mais d'autres vont te demander un vrai effort, et c'est là que ton expérience va te sauver.

Concernant SecurityX, les cours sur Udemy n'étaient eux aussi qu'un simple rappel des acronymes qu'on est déjà censé savoir. Au moins, avec les cours de Dion, il y a généralement des rabais intéressants à la fin pour l'achat d'une tentative d'examen (ou deux tentatives avec l'assurance de reprise qui, à ce prix-là, mérite d'être considérée). Quant aux examens pratiques, j'ai pris ceux de Jason Dion encore une fois et le niveau de difficulté des questions était semblable à celui de [l'examen AWS CSS](https://aws.amazon.com/certification/certified-security-specialty/): elles sont presque toutes basées sur des situations ou des scénarios, et seulement quelques questions portent sur le fonctionnement d'une technologie spécifique. Ceci étant dit, les 6 séries de 90 questions étaient suffisamment solides pour me former et pour justifier le temps consacré à maîtriser chaque question. Par contre, même s'il y avait certaines questions qui étaient assez difficiles pour m'avoir été utiles à l'examen SecurityX, j'ai été pas mal déçu de constater que les questions de mon examen SecurityX étaient une bonne coche plus difficile que celles de mes examens pratiques. J'y reviendrai plus tard…

Pour élaborer sur [les examens pratiques SecurityX de Jason Dion](https://www.udemy.com/course/comptia-securityx-cas-005-6-practice-exams), bien que le score de passage suggéré de 90% soit excessivement élevé, on ne peut pas savoir avec certitude quelle est la note de passage actuelle pour SecurityX. On peut se fier aux notes de passage de PenTest+ et CySA+ comme référence, soit 750 sur 900, ou environ 83% à 85% pour être prudent. Bien que le score soit pondéré en fonction de la difficulté de l'examen (score dynamique), on peut raisonnablement supposer que la note de passage de SecurityX se situe près de ces chiffres-là. Quand on y pense, la différence entre 83% et 90% représente environ une erreur à chaque 6 questions, comparativement à une erreur à chaque 10 questions, ce qui rend chaque erreur presque deux fois plus pénalisante. Pour ma part, j'ai simplement présumé que la note de passage était de 90% et je m'en suis servi comme _cue_ pour savoir où j'en étais dans ma progression.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Avant de payer pour un examen CompTIA, fais une autoévaluation en essayant un examen pratique à l'aveugle (ou en bon français, essaie de _striker_ un examen pratique). Si tu obtiens environ 65-70% uniquement avec tes connaissances actuelles et sans connaître les questions d'avance, tu as une base assez solide pour commencer à t'entraîner sérieusement en vue de passer le vrai examen. Si tu es en dessous de ça, continue de bâtir tes fondations en regardant les vidéos en premier.
{.prompt-tip }
<!-- markdownlint-restore -->

## L'examen: c'était comment? 📝

Tout d'abord, un peu de contexte: puisque j'habite au Québec et que l'examen n'est pas offert en ligne dans la langue française, il m'était impossible de faire l'examen à distance ou de chez nous. Je devais donc le faire en personne, soit dans une autre province canadienne, soit aux États-Unis. J'ai donc réservé mon examen au centre de test le plus proche au Canada, choisi la dernière heure disponible (vers 12h30) et débuté ma journée avec un petit trois heures de route jusqu'au centre d'examen en Ontario. La fatigue commençait déjà à se faire sentir, et je n'avais même pas encore commencé l'examen... Dans tous les cas, c'est une petite chose à considérer avant de passer un examen. Idéalement, c'est une petite chose à considérer _**avant d'acheter**_ une tentative d'examen non remboursable ni échangeable... Bref, j'arrive sur place au centre de test en un morceau, complète la paperasse, on m'envoie dans une salle privée et une fois installé, l'examen commence.

Bien que le nombre maximal de questions que tu peux avoir à l'examen est de 90, j'en ai eu 78 lors de ma tentative. Avec une limite de temps de 165 minutes, je me suis dit que j'allais avoir amplement de temps pour répondre à tout, avoir quelques minutes supplémentaires pour réviser certaines de mes réponses et garder un peu de lousse avant de tout soumettre. En prenant un peu de recul, 78 questions, c'est 13% de *moins* que ce qui était initialement prévu. C'est également une petite indication que les questions à venir allaient fort probablement être plus du côté difficile que facile. Il faut aussi savoir qu'il y a des questions qui ne sont pas notées à des fins de contrôle de qualité (_QA_), mais on ne sait ni combien il y en a, ni lesquelles. Alors, lorsque tu doutes de certaines de tes réponses pendant ta tentative, tu ne peux pas vraiment te fier à ces questions pour faire de la gymnastique intellectuelle et te dire que « 🌈ça va bien aller🌈 ». Rendu là, il suffit de considérer toutes les questions comme si elles comptaient toutes pour la note finale et de ne pas tenir compte du fait qu'il pourrait s'agir d'une question non notée à des fins de QA.

Normalement, j'avais l'habitude de sauter les PBQ et d'y revenir plus tard, puisqu'on m'avait dit dans le passé qu'elles ne valaient pas tellement plus de points que les simples questions à choix multiples. Toutefois, à ma grande surprise, dans cet examen, tu es _**forcé**_ de les faire en premier, puisque tu ne peux pas « techniquement » y revenir plus tard. Autrement dit, certaines questions PBQ te permettent d'y revenir ultérieurement, mais tu perdras tout ton progrès sur cette question-là. En effet, j'ai eu une PBQ que je ne pouvais tout simplement pas _skipper_, sinon elle aurait été évaluée telle quelle. Je ne sais pas combien de points elles valaient, mais elles ont quand même bien mis à l'épreuve mon expérience passée pour les résoudre correctement, et mes certifications précédentes en dehors de CompTIA m'ont donné un grand coup de main pour les aspects plus pratiques (pas pour dire que Security+, PenTest+ et CySA+ étaient inutiles, mais ce n'est pas pour rien que l'ancien nom de SecurityX était CompTIA Advanced Security **Practitioner** / CASP+). En tout et pour tout, j'ai complété toutes les PBQ en environ 30 minutes, en m'assurant que tout était correct avant de passer aux questions suivantes et au reste de l'examen.

La première fois que j'ai regardé l'heure, il me restait environ 70 questions à faire en à peu près deux heures, ce qui semblait être amplement de temps. Cependant, si tu as déjà fait l'examen AWS Security Specialty, tu sais que certaines questions sont ridiculement longues à lire, et que les réponses le sont tout autant. Une chose qui a littéralement changé la donne pendant mon examen, c'est que je pouvais apporter une bouteille d'eau réutilisable transparente avec moi. Ce petit détail m'a permis de mieux passer à travers ma tentative d'examen, puisque la bouteille d'eau m'a permis de rester concentré sur l'examen au lieu d'être stressé pour mille et une raisons, comme être déshydraté. Puisque j'ai fait l'examen en personne, il était également possible de prendre une petite pause pour aller aux toilettes, ce qui était bien agréable à avoir. Au courant de l'examen, je suis tombé sur quelques acronymes dont je ne connaissais pas la signification. La seule chose que je pouvais faire, c'était de les résoudre par élimination, en me fiant à mon intuition et en choisissant la réponse qui me semblait la plus logique. À moins d'obtenir plus d'information sur cet acronyme plus tard pendant l'examen, présume que ça n'arrivera pas et fais simplement confiance à ton instinct. Le temps passe. Et toi?

Un peu plus tard, sur certaines questions, j'étais complètement perdu, car ce n'était pas mon domaine d'expertise le plus fort et toutes les réponses possibles se ressemblaient ou avaient très peu de différences entre elles. Dans ce cas, réponds simplement ce qui te semble juste et passe à la suite. La raison pour laquelle tu ne devrais pas prendre trop de temps sur les questions dont tu n'es pas certain, c'est que le temps passe pas mal plus vite qu'on pourrait l'imaginer. Au moment où j'ai répondu à toutes les questions, il me restait un peu moins de 10 minutes pour réviser environ... 13-14 questions. Bien que j'aie douté de moi et de mes chances de réussir l'examen, je suis resté concentré jusqu'à la fin, j'ai révisé toutes ces questions et, étonnamment, j'ai réussi à en clarifier quelques-unes, me laissant avec environ 8 questions dont je n'étais toujours pas certain de la réponse. À moins de 5 minutes de la fin, j'ai simplement décidé de mettre fin à mon examen.

Même pas 5 minutes plus tard, la réceptionniste avait déjà imprimé un document confirmant ma réussite de l'examen. J'ai été agréablement surpris par la rapidité du processus: pour tous mes précédents examens CompTIA, la validation prenait toujours un peu moins de 24 heures, mais là, c'était quasiment instantané. On va le prendre!

![CSIE Score Report](CSIE_score_report_censored.png)
{ width="490" height="478" caption="Le relevé de notes SecurityX"}

## Penses-tu pouvoir réussir SecurityX? 🧠

Assez d'anecdotes. Voici vingt questions à scénario dans l'esprit du vrai examen: de longs énoncés, des choix de réponses qui se ressemblent et un penchant pour le côté difficile. Le chapeau change d'une question à l'autre (CISO, soutien technique, ingénieur OT, auditeur), exactement comme l'examen le fait pour te garder sur le qui-vive. Une seule réponse par question, et aucune recherche sur Internet (ça va tester ton éthique en même temps, _clin d'oeil clin d'oeil_). Si tu obtiens 90% ou plus, tu es prêt.

{{< quiz title="Simulation SecurityX: vingt questions" >}}

<div class="quiz-code"><span class="quiz-code__text">Tu es ingénieur AppSec et tu révises ce gestionnaire en C. <code>recv</code> peut retourner jusqu'à <code>sizeof(input) - 1</code> octets contrôlés par l'attaquant. Quelle ligne cause le débordement de tampon?</span><div class="code-card"><pre class="code-card__nums" aria-hidden="true">1
2
3
4
5
6
7
8
9
10
11
12</pre><pre class="code-card__code"><code>void handle_request(int sock) {
    char banner[64];
    char input[128];
    int  len;
    strncpy(banner, "WELCOME", sizeof(banner));      // (A)
    len = recv(sock, input, sizeof(input) - 1, 0);   // (B)
    if (len &lt; 0) return;
    input[len] = '\0';                               // (C)
    syslog(LOG_INFO, "req len=%d", strlen(input));   // (D)
    strcpy(banner, input);                           // (E)
    send(sock, banner, strlen(banner), 0);           // (F)
}</code></pre></div></div>

- [ ] (A) `strncpy` de la bannière `"WELCOME"`
- [ ] (B) `recv` vers `input`
- [ ] (C) le terminateur NUL de `input`
- [ ] (D) `strlen(input)` passé à `syslog`
- [x] (E) `strcpy(banner, input)`
- [ ] (F) `send` de `banner`

> `input` peut contenir jusqu'à 127 octets, `banner` seulement 64. Le `strcpy` en (E) copie sans vérifier les bornes et déborde du plus petit tampon. (B) est limité par `sizeof(input) - 1` et (C) reste dans les bornes.

Un hôte Linux exécute une porte dérobée sans fichier (_fileless_) qui écoute sur un port TCP élevé. Comme analyste IR, tu dois l'identifier et la tuer sans détruire les preuves volatiles. Avec ces étapes, (A) `kill -9 <pid>`, (B) `ss -tnp` pour associer le port à son PID, (C) confirmer l'intention avec `/proc/<pid>/exe` et la ligne de commande, (D) revérifier le port avec `ss -tnp`, quel ordre est le bon?

- [ ] A, B, C, D
- [x] B, C, A, D
- [ ] B, A, D, C
- [ ] C, B, A, D
- [ ] B, A, C, D

> Associe le port à un PID (B), confirme que le processus est hostile avant de le tuer (C), tue-le pour contenir la menace (A), puis vérifie (D). Tuer en premier, c'est risquer de viser le mauvais PID, et un redémarrage effacerait l'implant en mémoire dont tu as encore besoin.

<div class="quiz-code"><span class="quiz-code__text">Tu es l'admin de garde et tu sors ce journal d'accès Apache après que le site WordPress s'est mis à servir du pourriel. Une seule adresse IP source, environ trois minutes. Que s'est-il fort probablement passé?</span><div class="code-card"><pre class="code-card__nums" aria-hidden="true">1
2
3</pre><pre class="code-card__code"><code>45.9.x.x "POST /wp-admin/admin-ajax.php?action=duplicator_download&amp;file=../../wp-config.php" 200 1870
45.9.x.x "POST /wp-content/uploads/2026/11/wp-conf.php" 200 24
45.9.x.x "GET /wp-content/uploads/2026/11/wp-conf.php?0=id" 200 41</code></pre></div></div>

- [ ] Du bourrage d'identifiants contre `wp-login.php`
- [ ] Un moniteur de disponibilité qui sonde l'API d'admin
- [ ] Un robot qui indexe le dossier `uploads`
- [x] Lecture de `wp-config.php`, puis RCE par _webshell_
- [ ] Un réchauffement de cache après une mise à jour

> La première requête abuse d'une action vulnérable d'une extension pour remonter l'arborescence et lire `wp-config.php`; les deux suivantes déposent un fichier PHP dans `uploads` et l'exécutent avec un paramètre de commande. C'est une divulgation de fichier suivie d'une RCE par _webshell_, pas un abus d'authentification ni du trafic légitime.

Comme auditeur de conformité, tu signales qu'un locataire IaaS a des OS invités sans correctifs sur ses VM d'ERP. Selon la responsabilité partagée, à qui revient la correction?

- [ ] Au CSP, qui opère l'hyperviseur
- [ ] À parts égales entre le CSP et le locataire
- [x] Au locataire, qui possède l'OS invité
- [ ] Au régulateur qui a fixé la norme
- [ ] Au fournisseur MDR qui surveille le locataire

> En IaaS, le CSP sécurise l'hyperviseur et tout ce qui est en dessous; le locataire possède l'OS invité, ses correctifs et l'application. Plus on monte dans la pile (PaaS, SaaS), plus le CSP en prend à sa charge.

Tu es CIO de deux entreprises fusionnées, chacune avec son propre IdP et des plages IP qui se chevauchent, et la direction veut du SSO rapidement. Avant d'intégrer les IdP, que fais-tu en premier?

- [x] Inventorier identités, droits et relations de confiance
- [ ] Fédérer les deux IdP immédiatement
- [ ] Migrer tous les comptes vers le plus gros IdP
- [ ] Monter un nouvel IdP et recréer les comptes
- [ ] Forcer une réinitialisation des mots de passe partout

> On ne peut pas fusionner de façon sécuritaire ce qu'on n'a pas cartographié. La découverte des identités, des droits et des relations de confiance précède toute fédération ou migration, qui autrement propagerait des comptes en double et surprivilégiés.

Des PHI se trouvent sur des volumes infonuagiques gérés. À la fin de la période de rétention, elles doivent être irrécupérables, et le CSP ne donne aucun accès physique aux disques. Comme architecte infonuagique, quelle est la meilleure approche?

- [ ] Écraser le volume avec sept passes aléatoires
- [ ] Démagnétiser les disques physiques sous-jacents
- [ ] Supprimer le volume et vider la corbeille
- [ ] Se fier au SLA de suppression du CSP
- [x] Détruire la CMK, puis supprimer le volume

> Sans accès physique, l'écrasement et la démagnétisation sont exclus. Chiffre avec une CMK et détruis la clé: le texte chiffré devient instantanément irrécupérable, même pour le CSP.

Une vieille application stocke des mots de passe en SHA-256 salé, et les GPU testent des milliards de tentatives par seconde. Sans remplacer le cadre d'authentification, qu'est-ce qui ralentit le mieux le cassage hors ligne?

- [ ] Passer de SHA-256 à SHA-3
- [x] Utiliser une KDF lente à facteur de travail ajustable
- [ ] Ajouter un second sel unique par mot de passe
- [ ] Chiffrer la table d'empreintes en AES-256
- [ ] Hacher chaque mot de passe deux fois

> Une KDF ajustable (bcrypt, scrypt, Argon2) rend chaque tentative coûteuse, et les milliards par seconde s'effondrent. Un hachage plus rapide, des sels supplémentaires ou le chiffrement au repos n'augmentent pas le coût par tentative.

Des adversaires archivent ton trafic VPN chiffré, qu'ils ne peuvent pas lire aujourd'hui. Comme CISO, qu'est-ce qui justifie le mieux de prioriser un échange de clés PQC?

- [ ] Le quantique cassera AES-256 en quelques secondes
- [ ] La PQC est plus rapide et réduira la latence du VPN
- [ ] TLS 1.3 sera retiré au profit d'un protocole quantique
- [x] Le _harvest-now, decrypt-later_ sur le trafic capturé
- [ ] L'intégrité SHA-256 est déjà cassée par le quantique

> L'algorithme de Shor menace l'échange de clés asymétrique (RSA/ECC), pas les chiffrements symétriques ni les fonctions de hachage (Grover ne fait que les affaiblir). Pour les secrets à longue durée de vie, le trafic capturé pourra être lu dès qu'un CRQC existera.

Un intrus s'est déplacé latéralement pendant des semaines avec des identifiants récupérés sur un partage de fichiers, sans être détecté. Tu veux une alerte fiable la prochaine fois que quelqu'un fouille les partages à la recherche d'identifiants. Comme _threat hunter_, quel est le meilleur contrôle?

- [ ] Un NGAV sur chaque poste de travail
- [ ] Une rotation des mots de passe aux 30 jours
- [x] Des _honeytokens_ et des fichiers leurres sur le partage
- [ ] Le chiffrement intégral du disque du serveur
- [ ] Une rétention d'un an des journaux du partage

> Les fichiers canaris et les _honeytokens_ ne se déclenchent que lorsqu'on y touche, ce qui donne un signal fiable et peu bruyant de vol d'identifiants et de mouvement latéral; les vrais utilisateurs ne touchent jamais à l'appât.

Les analystes perdent des heures sur un triage d'hameçonnage toujours identique (en-têtes, détonation d'URL, réputation, quarantaine) et le MTTR grimpe avec le volume. Comme gestionnaire du SOC, quel est le meilleur investissement?

- [ ] Embaucher plus d'analystes de niveau 1
- [ ] Ajouter un second SIEM pour la corrélation
- [ ] Prolonger le délai de signalement d'hameçonnage
- [ ] Passer à un outil de billets avec moins de clics
- [x] Automatiser le triage avec des _playbooks_ SOAR

> Les _playbooks_ SOAR automatisent l'enrichissement et le confinement répétitifs et n'escaladent que les exceptions, ce qui réduit le MTTR sans devoir embaucher au rythme du volume.

Un parc reconstruit à partir d'une _golden image_ dérive constamment parce que les admins appliquent des correctifs à chaud sur les hôtes en production, ce qui cause des déploiements ratés et des configurations inégales. Comme ingénieur de plateforme, quelle est la meilleure solution?

- [x] Passer à l'immuable: nouvelle image, redéploiement par IaC
- [ ] Partager une procédure manuelle de correctifs pour tous
- [ ] Sauvegarder la configuration des serveurs chaque nuit
- [ ] Balayer le parc pour des vulnérabilités plus souvent
- [ ] Faire passer tout le SSH d'admin par un seul bastion

> Les correctifs à chaud sont la dérive. Une infrastructure immuable (construire une nouvelle image versionnée, redéployer par IaC, ne jamais toucher à un hôte en marche) garde le parc identique et auditable.

En migrant un monolithe vers des conteneurs, tu trouves des mots de passe de BD et des clés d'API codés en dur dans des Dockerfiles et intégrés aux couches d'image. Comme architecte, quelle est la meilleure correction pour la suite?

- [ ] Chiffrer les Dockerfiles avec GPG avant le commit
- [ ] Rendre le registre d'images privé
- [ ] Déplacer les secrets dans des directives `ENV`
- [x] Externaliser les secrets dans un coffre, injectés à l'exécution
- [ ] Ajouter les Dockerfiles au `.gitignore`

> Les secrets dans les couches d'image persistent dans l'historique et fuient à chaque _pull_, et `ENV` les y inscrit tout autant. Un gestionnaire de secrets avec injection à l'exécution les garde hors de l'artéfact et hors du VCS.

Un chercheur a signalé un plantage dans un analyseur (_parser_) binaire maison. Tu veux faire ressortir les autres bogues de sécurité mémoire encore cachés dans ses chemins d'entrée avant que des attaquants les trouvent. Comme ingénieur en sécurité, quelle est la meilleure technique?

- [ ] Un test d'intrusion manuel ponctuel du point d'accès
- [x] Du _fuzzing_ guidé par la couverture sur l'analyseur
- [ ] Un balayage antivirus par signatures du binaire
- [ ] Une journalisation verbeuse en production
- [ ] Une simulation d'hameçonnage visant les développeurs

> Le _fuzzing_ mute des entrées malformées pour exercer un maximum de chemins de code et provoquer des plantages; c'est conçu exactement pour trouver les défauts de sécurité mémoire dans les analyseurs.

Un utilisateur peut envoyer des courriels chiffrés en S/MIME à tous ses partenaires externes sauf un, pour qui le chiffrement lève une erreur de certificat; les courriels non chiffrés passent, et ce partenaire peut envoyer des courriels chiffrés à l'utilisateur. Au soutien technique, quelle est la cause la plus probable?

- [ ] Le client de courriel de l'utilisateur doit être mis à jour
- [ ] La passerelle de courriel bloque ce domaine
- [ ] La boîte du partenaire a dépassé son quota
- [ ] Le TLS opportuniste est désactivé entre les serveurs
- [x] L'adresse du certificat du partenaire ne concorde pas

> Un seul partenaire, seulement le chiffrement, dans un seul sens: tout pointe vers le certificat de ce partenaire. L'adresse liée à sa clé publique ne concorde pas avec l'adresse utilisée. La version du client, les quotas ou le TLS de transport ne cibleraient pas les courriels chiffrés d'un seul destinataire.

Comme ingénieur OT, tu constates qu'un attaquant a envoyé des commandes forgées qui ont forcé les contrôleurs du SIS de l'usine en état de faute, neutralisant la logique d'arrêt sécuritaire. Quelle tactique de MITRE ATT&CK pour ICS correspond?

- [ ] Impair Process Control
- [ ] Persistence
- [ ] Initial Access
- [x] Inhibit Response Function
- [ ] Discovery
- [ ] Collection

> S'attaquer au SIS, la couche qui devrait réagir à une condition dangereuse, relève d'Inhibit Response Function (voir TRITON). Impair Process Control est le piège: cette tactique couvre la manipulation du procédé lui-même, pas la neutralisation de son système de sécurité.

Tu arrives sur un hôte en marche qui exécute un maliciel en mémoire avec une session C2 ouverte, et la politique dit de débrancher la machine pour la contenir. Comme analyste DFIR, qu'est-ce qui préserve en premier les preuves les plus critiques?

- [ ] Éteindre tout de suite pour couper le canal C2
- [ ] Imager le disque, puis redémarrer sur un OS forensique
- [x] Capturer la RAM et l'état réseau, puis éteindre
- [ ] Lancer l'antivirus pour isoler le maliciel avant qu'il se propage
- [ ] Tuer le processus, noter l'empreinte, puis éteindre

> Un maliciel sans fichier disparaît à l'extinction. L'ordre de volatilité dit de capturer d'abord la RAM et l'état réseau actif; l'image du disque vient après.

Après une brèche, les attaquants ont circulé d'est en ouest dans un LAN de centre de données à plat après avoir compromis un seul serveur Web. Comme architecte, tu dois limiter le rayon d'impact sans refaire l'adressage du réseau. Quelle est la meilleure approche?

- [ ] Un plus gros pare-feu périmétrique avec DPI
- [x] Microsegmenter avec refus par défaut est-ouest
- [ ] Regrouper les serveurs sur un seul VLAN
- [ ] Exiger un VPN pour le trafic entrant d'Internet
- [ ] Chiffrer intégralement les disques des serveurs

> Le mouvement latéral dans un segment à plat est un problème de segmentation. La microsegmentation basée sur l'identité, avec refus par défaut entre les charges de travail, est la réponse _zero trust_; les contrôles périmétriques ne protègent que le trafic nord-sud.

Comme gestionnaire de risques, tu évalues un contrôle. La SLE est de 500 k\$. Sans lui, tu prévois deux brèches par année; un contrôle à 250 k\$ par année ramène ça à une brèche aux deux ans. Quel est le bénéfice ou le coût annuel net?

- [ ] Coût net de 250 k\$; il coûte plus qu'il ne rapporte
- [ ] Bénéfice net de 750 k\$, soit toute la réduction
- [ ] Bénéfice net de 250 k\$
- [ ] Seuil de rentabilité, sans gain ni perte
- [x] Bénéfice net d'environ 500 k\$
- [ ] Indéterminé sans l'EF

> ALE = SLE x ARO. Avant: 500 k x 2 = 1 M par année. Après: 500 k x 0,5 = 250 k. Le risque baisse de 750 k; moins les 250 k du contrôle, le bénéfice net est d'environ 500 k.

Les portables de l'entreprise doivent démarrer automatiquement un VPN _always-on_ à l'allumage, et seuls les appareils conformes appartenant à l'entreprise peuvent se connecter, même si un utilisateur entre des identifiants valides sur un portable personnel. Comme ingénieur réseau, quelle est la meilleure façon d'imposer la vérification de l'appareil?

- [x] Émettre des certificats d'appareil depuis la PKI d'entreprise
- [ ] Exiger un mot de passe VPN plus long
- [ ] Publier le client VPN uniquement sur l'intranet
- [ ] Ajouter une MFA par SMS à la connexion VPN
- [ ] Autoriser seulement les adresses IP résidentielles

> Un certificat machine émis par la PKI lie le tunnel à du matériel approuvé. Les mots de passe et la MFA authentifient la personne, pas l'appareil.

Un auditeur demande à ton fournisseur de prouver que, lorsqu'une nouvelle CVE critique touche une bibliothèque tierce, il peut lister chaque produit et chaque version qui l'embarque. Quel artéfact le permet?

- [ ] Le rapport de pentest du dernier trimestre
- [ ] Les journaux de compilation du CI/CD
- [ ] Un code de conduite signé par les développeurs
- [x] Un SBOM par version
- [ ] L'EULA du produit

> Un SBOM énumère chaque composant et sa version pour chaque _release_, ce qui permet de répondre à « où suis-je exposé? » en quelques minutes quand la prochaine CVE du calibre de Log4Shell arrive.

{{< /quiz >}}

### Ton résultat

| Score | Ce que ça veut dire |
|:---|:---|
| **90% ou plus** | L'étendue des connaissances et les réflexes sont là. Réserve ton examen, et apporte une bouteille d'eau. |
| **75 à 89%** | Tu serais dans la course, mais la vraie barre ne pardonne pas: une erreur à toutes les quelques questions suffit pour échouer. Renforce d'abord les domaines que tu as manqués. |
| **60 à 74%** | Pas encore. Fais plus d'examens pratiques à scénarios et accumule de l'expérience pratique; la formulation des questions piège plus de gens que les concepts eux-mêmes. |
| **Moins de 60%** | Les bases d'abord. Repasse à travers les acronymes et les certifications de niveau inférieur, puis réessaie. |

## De retour au travail: quelle est la plus-value? 📊

La première chose que mon patron m'a dite à propos de cette certification après ma réussite a été: « En quoi cela affecterait-il positivement ton rôle actuel? » et pour être honnête, la réussir m'a rendu plus humble que je ne l'imaginais. J'avais l'impression de me pratiquer à devenir un chef d'équipe, où tu dois répondre à toutes les questions qui te sont posées par n'importe qui et où tu dois avoir *presque* toutes les réponses sur-le-champ. Bien que tu aies plusieurs choix de réponses pendant l'examen, tu n'as pas ça dans la vraie vie: tu dois les trouver par toi-même et j'ai réalisé que je n'étais peut-être pas encore prêt à passer à un poste de leadership. Cependant, ça m'a fait réaliser que presque toutes les entreprises tentent de résoudre les mêmes problèmes compliqués que toi, ce qui est assez révélateur quand on prend du recul. Maintenant, avec l'examen derrière moi, j'ai l'impression de savoir où en est notre industrie, où se situe mon employeur et ce que je dois faire pour prendre de bonnes décisions afin d'ultimement progresser et d'apporter des changements positifs.

## Quelles certifications ont été les plus gratifiantes? 🏅

C'est une bonne question et la réponse est... (_roulement de tambour_ 🥁🥁🥁): ||ça dépend de ta situation||. Je sais que c'est un peu cliché, mais la réponse va grandement varier dépendamment de ton parcours, de ton expertise actuelle et de ce que tu vises à court terme. _N'importe quelle™_ certification peut propulser ta carrière si elle répond parfaitement à tes besoins, tout comme elle peut t'être absolument inutile (et _spoiler alert_: ||c'est probablement la seconde option||). Voici quelques explications et quelques anecdotes personnelles pour appuyer mes propos.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Les réponses fournies ici reflètent mon expérience et mes opinions personnelles. Je t'encourage, cher lecteur, à consulter d'autres points de vue avant de décider si l'une des certifications CompTIA suivantes mérite ton temps ou non.
{.prompt-warning }
<!-- markdownlint-restore -->

### Security+
Si tu veux décrocher ta première job en TI, Security+ ajoutera sans aucun doute un petit *plus* (désolé pour le jeu de mots) à ton portfolio. Est-ce que ça te garantit une job en cyber? Pas du tout. Est-ce que ça te garantit une job _entry-level_ en TI? Non plus, mais ça va assurément t'aider à te démarquer du lot parmi les autres juniors ou les étudiants récemment diplômés. Comme toute chose dans la vie, il est toujours bon de mettre les chances de son bord quand l'occasion se présente, et avec un peu plus de chance, tu auras peut-être une occasion que d'autres n'auront pas, simplement grâce au fait que tu as démontré que tu as volontairement investi en toi-même (autant en argent qu'en temps). Un autre avantage de la certification Security+ est qu'elle est fréquemment mentionnée dans les offres d'emploi, aux côtés des certifications CEH, CISA et CISSP, entre autres. Autrement dit, le fait que Security+ se retrouve aux côtés de ces certifications plus exigeantes contribue indirectement à gonfler la valeur de la certification, ou du moins à améliorer sa valeur perçue aux yeux des recruteurs.

![Un extrait d'une offre d'emploi retrouvée sur LinkedIn mentionnant Security+](job_posting_Sec+_fr.png)
{ width="490" height="478" caption="Un extrait d'une offre d'emploi retrouvée sur LinkedIn mentionnant Security+"}

Pour ma part, je l'ai obtenu juste après avoir terminé mes études collégiales et juste avant d'entamer ma première année d'études universitaires au Bacc. Security+ était également ma toute première certification professionnelle hors du cadre scolaire, et son niveau de difficulté était parfaitement adapté à mes besoins 👌. J'avais acquis suffisamment de connaissances au Cégep avant de commencer cette certification pour pouvoir retenir rapidement les informations de la formation, ce qui a grandement facilité ma première année d'université. Les nouvelles notions apprises grâce à la certification ont ensuite été approfondies dans mes cours d'université, faisant de cette certification un excellent projet d'été avant de retourner aux études.

Cependant, bien qu'elle soit toujours reconnue sur le marché, la plus-value s'arrête essentiellement là pour Security+: c'est une certification qui est surtout considérée pour des rôles _entry-level_, ça peut te permettre de contourner les RH dans certains cas et c'est à peu près tout. Un de mes amis qui voulait obtenir sa première job en cybersécurité est allé passer une entrevue dans une entreprise de défense et la première question qu'il s'est fait poser par son intervieweur était: « As-tu Security+? Sinon, reviens plus tard quand tu l'auras ». Bien qu'il ait tout de même obtenu une job en cybersécurité ailleurs _sans Security+_, le fait de ne pas avoir la certification ne l'a pas empêché de réussir le processus d'embauche pour un poste de premier échelon. En fait, c'est son projet de *homelab* et ses connexions/contacts qui lui ont permis de se démarquer et de décrocher une job dans le domaine. Bref, si tu es un jeune étudiant qui essaie de percer dans le domaine TI, ça peut valoir la peine de le considérer et les bénéfices existent. La certification m'a été utile dans mes débuts de carrière en TI, donc elle peut certainement t'aider aussi à court terme. Autre que ça, la certification n'apportera pas tant plus de valeur que ça à ta carrière, surtout sur le long terme. La certification vient répondre à la question: « Connais-tu assez bien les principes de base de la cybersécurité? », et elle vient mettre en évidence que les détenteurs de cette certification connaissent le domaine à haut niveau et quelques mots clés, donc ils ne seront pas complètement perdus lors de leur première job en cyber (ou en TI).

### CySA+
CySA+ est clairement une coche au-dessus de Security+ en termes de difficulté et personnellement, je l'ai bien appréciée. Je l'ai obtenue après deux ans d'expérience en cybersécurité au sein d'un SOC et c'était une excellente façon de tester mes connaissances générales dans le domaine. Je faisais mon baccalauréat en même temps, et c'était juste le bon niveau de difficulté pour réviser efficacement tout ce que j'avais vu à l'université, tout en abordant de nouveaux concepts applicables à mon travail de l'époque. Bien qu'elle ne soit pas aussi reconnue que d'autres certifications plus techniques, elle vaut largement la peine d'être obtenue, et on la retrouve d'ailleurs dans certaines offres d'emploi sur LinkedIn (ce qui prouve son utilité). En tout, cette certification répond à la question: « Sais-tu comment fonctionne un SOC? Démontre-le », et c'était une bonne révision afin d'évaluer sa compréhension globale du domaine de la cybersécurité.

### PenTest+
Toutefois, je ne peux pas en dire autant de PenTest+. Bien que le contenu du cours ait été intéressant pour découvrir de nouveaux outils, l'examen est principalement basé sur les connaissances avec des questions à choix multiples, ce qui n'a rien à voir avec la philosophie de la sécurité offensive (qui est d'être très _hands-on_). Ce n'est pas pour rien que CEH a une mauvaise réputation, même si elle est reconnue sur le marché. Bien que les cours pour cette certification sur Udemy puissent aider quelqu'un à débuter en sécurité offensive, il m'est difficile de recommander cette certification à qui que ce soit, d'autant plus que d'autres alternatives plus pratiques destinées à un public plus junior existent, comme eJPT ou CRTP. Ultimement, l'OSCP est le standard pour être pentesteur et après l'avoir réussi, je comprends pourquoi les employeurs le demandent. Même si j'ai eu de la difficulté à le réussir, ce n'est qu'une difficulté « de base » pour le pentest. De nos jours, la plupart des employeurs s'attendent à ce que tu testes des applications Web, alors si tu veux quelque chose d'abordable et de pertinent, la certification BSCP pourrait être une bonne option à considérer.

### SecurityX
J'ai fait SecurityX principalement pour renouveler toutes mes certifications CompTIA précédentes d'un seul coup, ainsi que pour tester mes compétences face aux _8 à 10 ans d'expérience recommandés_ pour l'examen, juste pour voir si c'était vrai (spoiler: ||c'était pas mal le cas||). Un autre fait à considérer est que SecurityX est bien classée dans le [_roadmap_ des certifications en sécurité de Paul Jerimy](https://pauljerimy.com/security-certification-roadmap/) (même si le _roadmap_ commence à devenir désuet) et que l'examen est davantage orienté vers le côté pratique de la sécurité plutôt que le côté gestion. La plus grande critique que j'ai envers cet examen est: pourquoi faire SecurityX quand on peut faire CISSP? Après avoir discuté avec mon collègue qui l'a réussie récemment, les questions sont à peu près du même niveau de difficulté et, mis à part le nombre plus élevé de questions, il suffit de répondre aux questions du point de vue d'une personne « externe » ou un peu plus loin de l'action, comme un auditeur ou un directeur. Si tu peux réussir SecurityX, tu pourrais techniquement réussir CISSP seulement avec un peu plus d'étude et d'effort. Cependant, comme tu le sais probablement déjà, CISSP est l'une des certifications les plus reconnues (pour ne pas dire la plus reconnue) que tu peux avoir en cybersécurité. Bien qu'elle ne teste pas vraiment tes compétences pratiques, elle a tellement de reconnaissance qu'on ne peut tout simplement pas la négliger. Si CISSP n'existait pas, alors oui: SecurityX aurait un certain poids dans l'industrie. Actuellement, ce n'est pas le cas, et je trouve ça honnêtement dommage. La certification met certainement tes connaissances et tes expériences à l'épreuve, particulièrement les PBQ (que j'ai appréciées). Si tu doutes de ta capacité à réussir l'examen pour CISSP, cette certification est un excellent point de référence et si tu dois satisfaire une exigence de certification de base du DoD, alors SecurityX serait une option à considérer. Sinon, son utilité est plutôt limitée.

## Est-ce que ça en valait la peine? 🤔

Personnellement, quand j'ai commencé à faire les certifications CompTIA, je pensais que si je les avais toutes, je gagnerais un beau gros salaire à six chiffres, et l'article que j'avais vu à l'époque m'en avait vraiment convaincu. Cependant, avec le temps, j'ai réalisé que ces gens qui avaient toutes ces certifications n'avaient pas un excellent salaire grâce à leur soupe à l'alphabet d'acronymes de certifications, mais parce qu'ils avaient plus de 10 ou 15 ans d'expérience derrière eux. Autrement dit, **ils sont payés pour leur expérience**, et la certification ne sert qu'à appuyer leur expérience de travail. Pour moi, ce fut un beau parcours d'apprentissage, qui m'a mené à obtenir quelques promotions ici et là, et éventuellement un nouveau rôle vers le côté plus offensif de la sécurité.

Pourtant, au fur et à mesure que j'acquérais de l'expérience, les certifications ont commencé à avoir des rendements décroissants, et je devais démontrer mes compétences ailleurs, que ce soit avec des projets, des _homelabs_, des blogs (comme celui-ci), de la recherche ou des contributions à la communauté. Courir après les certifications, c'est certainement bien, mais tu dois déterminer où tu veux être dans un avenir rapproché. Bien sûr, SecurityX ne m'aidera pas à obtenir un rôle en _Red Team_, mais elle pourrait renforcer mon rôle actuel pour ensuite pivoter vers quelque chose de connexe, peut-être en architecture ou en ingénierie de la sécurité. On réalise aussi que le temps est une ressource limitée et qu'en vieillissant, on n'a plus autant de temps qu'avant pour faire toutes les certifications qu'on voulait faire. Il faut se concentrer sur celles qui sont les plus pertinentes et généralement faire des certifications de plus en plus difficiles pour approfondir ses connaissances.

De plus, il n'est pas sage de passer des certifications simplement pour le principe de faire des certifications: si l'emploi de tes rêves ne mentionne pas la certification que tu vises ou si tu n'en vois pas la valeur ajoutée pour ce poste, alors ce n'est peut-être pas la certification qu'il te faut. Ton temps et ton argent sont précieux: fais-en bon usage. Le parcours et les préférences de chacun sont différents; adapte ta formation à ce que tu juges important. Pour ma part, les quatre certifications CompTIA mentionnées précédemment ont eu un impact mitigé: certaines m'ont vraiment donné le _boost_ nécessaire pour propulser ma carrière, tandis que d'autres ressemblaient plutôt à une corvée, que j'ai obtenues uniquement parce que je voulais la certification « ultime », peu importe ce que ça veut dire. Au final, il est préférable de passer des certifications recherchées par les recruteurs, car leur retour sur investissement est _plus ou moins_ garanti (les résultats peuvent varier, mais ils existent). Pour voir le bon côté des choses, les certifications peuvent être une belle décoration dans ton bureau.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Regarde les jobs que tu aimerais décrocher, prends en note les certifications que les employeurs demandent dans les exigences, puis investis dans celles-là. Ça prend pas la tête à Papineau, mais il faut quand même y penser 🧠.
{.prompt-tip }
<!-- markdownlint-restore -->

## TL;DR 🎯

SecurityX a été un défi, personnellement gratifiant puisque j'ai finalement obtenu la certification cumulative CSIE, mais aucun chasseur de têtes ne m'a écrit sur LinkedIn depuis que je l'ai obtenu. Si tu dois renouveler des certifications CompTIA, c'est un beau défi et c'est un bon cran au-dessus des certifications plus intermédiaires comme CySA+ ou PenTest+, et elle est considérablement plus difficile que Security+. Les PBQ étaient vraiment amusantes et dans l'ensemble, j'ai du respect pour les gens qui ont réussi l'examen. Ultimement, savoir que j'ai aidé quelqu'un à prendre une décision plus éclairée à savoir si ces certifications en valent la peine, et où investir au mieux son temps, c'était tout ce qu'il me fallait pour que le parcours en vaille la peine.

Merci d'avoir pris le temps de lire tout ça. J'espère que tu as appris une chose ou deux sur la certification et le parcours en cybersécurité de CompTIA à travers mon cheminement personnel. J'espère aussi que ce blog t'a aidé à avoir une vision plus claire de ce que la certification offre et si tu devrais l'obtenir ou non.

![CSIE Certificate](CSIE_censored.png)
{ width="647" height="500" caption="Le certificat CSIE"}