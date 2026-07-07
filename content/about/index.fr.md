---
title: "À propos"
date: 2023-04-20
draft: false
layout: page
math: true
menu:
  main:
    name: À propos
    weight: 5
    pre: fa-info-circle
---

[Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) est un thème de blog initialement basé sur [Jekyll](https://jekyllrb.com/). En raison des limitations de conception de Jekyll, l'internationalisation (i18n) n'est pas prise en charge nativement et nécessite des plugins tiers pour bénéficier de cette fonctionnalité.. Pour activer la prise en charge de l'internationalisation (i18n) pour Chirpy sans avoir à dépendre de plugins tiers, le projet [hugo-theme-chirpy](https://github.com/geekifan/hugo-theme-chirpy) a migré le thème Chirpy vers [Hugo](https://gohugo.io/) avec des adaptations minimales. Toutes les fonctionnalités de Chirpy sont disponibles dans hugo-theme-chirpy (bien que certaines fonctionnalités puissent fonctionner différemment au sein du framework Hugo).

Suivez les instructions du site de démonstration pour créer rapidement un blog personnel gratuit !
## Fonctionnalités

- **Mode sombre**: Lisibilité améliorée en conditions de faible luminosité.
- **Interface utilisateur multilingue**: Passez facilement d'une langue à l'autre.
- **Organisation efficace des publications**: Utilisez des catégories hiérarchiques, des tags tendance, des suggestions de lecture et des fonctionnalités de recherche..
- **Mise en page optimisée**: Inclut une table des matières, la coloration syntaxique, des invites et plus encore.
- **Extensions d'écriture enrichie**: Prise en charge des formules mathématiques, des graphiques, des organigrammes et des médias intégrés
- **Systèmes de commentaires multiples**: Choisissez parmi différentes options de commentaires
- **Outils d'analyse Web**: Intégré à de multiples outils d'analyse.
- **Technologies Web modernes**: Conçu pour le référencement naturel et les performances web.
- **Prise en charge des flux RSS**: Tenez vos lecteurs informés grâce aux flux RSS.

## Groove Radar 🕺

Chaque billet de ce blog se termine par un *groove radar* inspiré de DDR qui résume sa forme en un coup d'œil. Jouez avec les curseurs ci-dessous pour voir comment chaque statistique se traduit dans un vrai billet de blog.

{{< groove-radar-playground >}}

### De l'arcade au blog 🕹️

Le [Groove Radar](https://remywiki.com/GROOVE_RADAR) est apparu dans *DanceDanceRevolution 4thMIX* pour décrire le caractère d'une chanson au-delà de sa cote de difficulté. Chaque axe porte un libellé japonais d'origine, et ce blog réutilise la même logique — appliquée à la lecture plutôt qu'à la danse.

Deux quantités reviennent dans toutes les formules ci-dessous : \(w\), le nombre de mots du billet (le même nombre que l'indicateur de temps de lecture), et le facteur de taille \(s\), qui empêche un billet court de maximiser un axe avec une poignée d'éléments :

$$ s = \min\left( \sqrt{\frac{w}{1500}},\ 1 \right) $$

Chaque axe atteint 100 % à l'anneau extérieur et plafonne à 150 %; la *valeur du blog radar* est simplement la somme des cinq pourcentages affichés.

#### READING TIME

Dans le jeu, **STREAM** (全体密度, « densité globale ») mesure la densité globale des pas. Ici, l'axe mesure la taille globale du billet : le temps de lecture à 180 mots par minute, où une lecture de 20 minutes atteint 100 % et tout ce qui dépasse 30 minutes sature l'axe :

$$ \text{TIME} = \frac{w / 180}{20} $$

#### HEAVINESS

Dans le jeu, **VOLTAGE** (最大密度, « densité maximale ») mesure la densité au sommet — le moment le plus chargé de la chanson. Ici, l'axe mesure le passage le plus lourd du texte, en mélangeant le paragraphe le plus long \(p_{\max}\), la moyenne de mots par paragraphe \(\bar{p}\) et le nombre de paragraphes \(n\) :

$$ \text{DENSITY} = 0.5\,\frac{p_{\max}}{160} + 0.3\,\frac{\bar{p}}{60} + 0.2\,\frac{n}{80} $$

#### BREATHER

Dans le jeu, **AIR** (ジャンプ度, « degré de sauts ») compte les sauts. Ici, l'axe compte la fréquence à laquelle le texte saute aux yeux et laisse respirer. Les éléments visuels sont pondérés — les images en premier, et les styles de texte sont plafonnés pour qu'un billet entièrement en gras ne gagne rien :

$$ E = 5\,\text{img} + 2\,\text{encadrés} + 2\,\text{spoilers} + \text{sections} + \tfrac{1}{4}\min(\text{gras},30) + \tfrac{1}{4}\min(\text{italique},30) $$

L'axe mélange ensuite leur densité, leur quantité absolue et la variété \(v\) de ce qui est utilisé (jusqu'à 7 sortes) :

$$ \text{VISUAL} = 0.5\,\frac{E / (w/1000)}{30}\,s + 0.3\,\frac{E}{40} + 0.2\,\frac{v}{7} $$

#### TECHNICAL

Dans le jeu, **FREEZE** (踏みっぱ度, « degré de maintien », de 踏みっぱなし — *rester appuyé*) mesure la durée des flèches à maintenir. Ici, l'axe mesure le temps passé figé à l'écran à lire du code et des équations : \(c\) est le nombre de caractères de code, \(C\) le nombre total de caractères, et chacune des \(m\) équations mathématiques pèse 200 caractères de masse technique :

$$ \text{CODE} = 0.6\,\frac{c/C}{0.35}\,s + 0.4\,\frac{c + 200\,m}{5000} $$

#### COMPLEXITY

Dans le jeu, **CHAOS** (変則度, « degré d'irrégularité ») mesure les pas irréguliers et à contretemps. Ici, l'axe mesure l'irrégularité de la lecture, sur la prose seulement (code exclu) : \(L\) est la proportion de mots longs (9 caractères et plus), \(A\) la proportion d'acronymes et de jargon, et \(S\) la longueur moyenne des phrases :

$$ \text{DEPTH} = \left( 0.55\,\frac{L}{0.25} + 0.25\,\frac{A}{0.05} + 0.2\,\min\left(\frac{S}{30},\ 1.5\right) \right) s $$
