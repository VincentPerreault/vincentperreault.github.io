---
title: "À propos"
date: 2023-04-20
draft: false
layout: page
math: true
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

Chaque billet de ce blog se termine par un *groove radar*, le graphique à cinq côtés de Dance Dance Revolution. Il vous dit à quel genre de lecture vous attendre. Déplacez les curseurs ci-dessous pour voir ce que chaque valeur représente dans un vrai billet.

{{< groove-radar-playground >}}

### De l'arcade au blog 🕹️

Le [Groove Radar](https://dancedancerevolution.fandom.com/wiki/Groove_Radar) (グルーヴレーダー) a été introduit dans *DDRMAX -Dance Dance Revolution 6thMIX-*. C'est un pentagone qui montre la difficulté d'une chanson à travers cinq valeurs : Stream, Voltage, Air, Freeze et Chaos. J'ai gardé les cinq axes et ce que chacun représente, et je les ai appliqués à la lecture plutôt qu'à la danse.

Deux nombres reviennent dans les formules ci-dessous. Le premier est \(w\), le nombre de mots du billet, soit le même compte que celui de l'indicateur de temps de lecture. Le deuxième est le facteur de taille \(s\). Dans le jeu, la plupart des valeurs sont mesurées par rapport à la durée de la chanson. Ici, tous les axes sauf READING TIME sont multipliés par \(s\), ce qui fait grandir le radar avec le billet : une lecture de cinq minutes ne peut pas le remplir avec deux images et un long paragraphe. Un billet obtient son plein poids à partir de 3 000 mots, soit environ 17 minutes de lecture :

$$ s = \min\left( \sqrt{\frac{w}{3000}},\ 1 \right) $$

Chaque axe atteint 100 % à l'anneau extérieur et s'arrête à 150 %. La *valeur du blog radar* est la somme des cinq pourcentages.

#### READING TIME

**STREAM** (全体密度, « densité globale ») est la densité globale des pas d'une chanson. Sur le blog, c'est la taille globale du billet, notée \(T\) : le temps de lecture à 180 mots par minute. Une lecture de 40 minutes atteint 100 %, et tout ce qui dépasse 60 minutes sature l'axe.

$$ T = \frac{w / 180}{40} $$

#### HEAVINESS

**VOLTAGE** (最大密度, « densité maximale ») est la [densité au sommet](https://dancedancerevolution.fandom.com/wiki/Voltage_%28Groove_Radar%29) d'une chanson : le plus grand nombre de flèches entassées à l'écran dans une mesure, multiplié par le BPM moyen de la chanson. Une chanson obtient une valeur élevée quand elle a un passage chargé et un rythme rapide dans l'ensemble.

Sur le blog, c'est le poids du texte, noté \(\rho\). C'est la lettre que les physiciens utilisent pour la densité, et DDR aime bien ses lettres grecques. Le passage chargé est le paragraphe le plus long \(p_{\max}\). Le rythme d'ensemble est le nombre moyen de mots par paragraphe \(\bar{p}\) et la quantité de prose \(W\), en mots : un long texte est un texte dense. Le code, les quiz et les listes à cocher sont exclus, ce qui fait qu'un long billet composé surtout de code reste léger.

$$ \rho = \left( 0.3\,\frac{p_{\max}}{300} + 0.25\,\frac{\bar{p}}{120} + 0.45\,\frac{W}{4000} \right) s $$

#### BREATHER

**AIR** (ジャンプ度, « degré de sauts ») compte les sauts d'une chanson. Sur le blog, l'axe compte ce qui fait ressortir le texte et vous laisse respirer, noté \(B\). Chaque type d'élément visuel vaut un certain nombre de points : \(i\) images, \(p\) encadrés, \(z\) spoilers, \(h\) séparations de sections, et \(b\) et \(e\) pour les passages en gras et en italique. Ces deux derniers sont plafonnés, pour qu'un billet écrit entièrement en gras n'y gagne rien. Un bloc de code n'est pas une pause. Il compte pour TECHNICAL.

$$ E = 5\,i + 2\,p + 2\,z + h + \tfrac{1}{4}\min(b,\,30) + \tfrac{1}{4}\min(e,\,30) $$

L'axe combine ensuite la densité de ces points, leur nombre total et la variété \(v\) de ce qui est utilisé (jusqu'à 7 sortes) :

$$ B = \left( 0.6\,\frac{E / (w/1000)}{30} + 0.3\,\frac{E}{80} + 0.1\,\frac{v}{7} \right) s $$

#### TECHNICAL

**FREEZE** (踏みっぱ度, « degré de maintien », de 踏みっぱなし, *rester appuyé*) est le temps passé à maintenir les flèches. Sur le blog, c'est le temps que vous passez figé devant du code et des équations, noté \(C\). \(k\) est le nombre de caractères de code, \(N\) le nombre total de caractères, et chacune des \(m\) équations mathématiques compte pour 200 caractères de code.

$$ C = \left( 0.6\,\frac{k/N}{0.35} + 0.4\,\frac{k + 200\,m}{5000} \right) s $$

#### COMPLEXITY

**CHAOS** (変則度, « degré d'irrégularité ») compte les pas qui tombent à côté du temps, et le jeu [les multiplie par les changements de BPM et les arrêts](https://dancedancerevolution.fandom.com/wiki/Chaos_%28Groove_Radar%29) de la chanson. C'est pour ça que même une chanson de niveau Beginner peut avoir un peu de chaos. Tout texte en a une touche lui aussi.

Sur le blog, l'axe est noté \(X\). Les pas à contretemps sont les irrégularités du vocabulaire : \(L\) est la proportion de mots longs (9 caractères et plus), \(A\) la proportion d'acronymes et de jargon, et \(S\) la longueur moyenne des phrases. Ils sont mesurés sur la prose seulement.

Les arrêts sont les endroits où il faut arrêter de lire pour faire quelque chose. Les \(q\) questions de quiz, les \(c\) choix de réponse de l'ensemble des questions et les \(t\) éléments de listes à cocher s'additionnent en points d'interactivité :

$$ I = q + \frac{c}{5} + \frac{t}{4} $$

Comme dans le jeu, les arrêts multiplient le reste. Un quiz de 12 questions à cinq choix chacune double la valeur :

$$ X = \left( 0.55\,\frac{L}{0.5} + 0.25\,\frac{A}{0.1} + 0.2\,\min\left(\frac{S}{50},\ 1.5\right) \right) \left( 1 + \frac{I}{24} \right) s $$

Les seuils du vocabulaire sont placés loin exprès. Atteindre 100 % sans quiz demanderait un texte où la moitié des mots sont longs, où un mot sur dix est un acronyme et où les phrases font 50 mots en moyenne. Une prose ordinaire n'a qu'une touche de chaos, et l'axe reste donc généralement sous HEAVINESS. Il faut un quiz ou un mur de jargon pour le faire passer devant.
