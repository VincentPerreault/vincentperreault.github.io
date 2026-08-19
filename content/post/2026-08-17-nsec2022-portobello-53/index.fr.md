---
title: NorthSec 2022 - Portobello 53
date: 2026-08-17 21:35:07 -0500
draft: false
categories:
  - Write-up
  - Cybersecurity
tags:
  - Wireshark
  - Tshark
  - Forensics
  - Malware
  - Steganography
  - C2
  - IPv6
  - Cybersecurity
  - Write-up
author: 
- VincentPerreault
description: Mon write-up pour la track Portobello 53 du CTF NorthSec 2022.
toc: true
comments: false
image:
  path: nsec-portobello-53.png
  alt: Le logo du NSEC accompagné d'une mascotte familière durant l'évènement
---

Le fichier `portobello53.pcapng` est un artefact de la track **Portobello** de NorthSec 2022; une série de défis dont les noms font référence aux cinq étapes du deuil (Déni, Colère, Marchandage, Dépression). Le « 53 » correspond au numéro de port, ce qui nous donne déjà la plupart des informations nécessaires avant d'ouvrir le fichier: tout se passe via DNS.

Il s'agit d'une révision du défi que j'avais complétée en 2022 au sein de l'équipe [CyBeer & Gineer](https://ctftime.org/team/189135), notamment grâce à l'aide de @Res260. Ce write-up a été entièrement refait et documenté à partir de mes anciennes notes issues d'un document CryptPad privé pour notre équipe ainsi que du serveur Discord originial que nous utilisions pendant la compétition (qui, étonnamment, est toujours actif). Tout ce qui suit est une reproduction de la capture effectuée avec `tshark` et quelques petits scripts Python, ainsi que de les méthodes originales que j'avais utilisée lors de la compétition.

Pourquoi ai-je écris cet article? Pour faire le ménage des artifacts liés à ce défi et qui trainait dans mon Google Drive depuis 2022. Et comme je me concentre sur Wireshark ces temps-ci, pourquoi pas? Mieux vaut tard que jamais, comme on dit...

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
> Ce blog a été écrit entièrement à la main et n'a pas été généré par l'IA.
{.prompt-info }
<!-- markdownlint-restore -->

todo