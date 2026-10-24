# Daret — simulateur de cercle d'épargne

> Projet pédagogique YouCode. **Simulation** : aucun argent réel, aucun paiement, aucun compte, des prénoms fictifs uniquement.

_À compléter par toi : remplace cette introduction par la description de **ton** projet._

## Liens

- Site (GitHub Pages) : https://karimaa-ab.github.io/Daret/
- Repository GitHub : https://github.com/karimaa-ab/Daret
- Tableau GitHub Projects : https://github.com/users/karimaa-ab/projects/5/views/1

## Installation

```bash
npm install
npm run build     # construit assets/style.css
npm run dev       # reconstruit le CSS à chaque modification
```

Ouvre ensuite `index.html` dans le navigateur (ou avec une extension « Live Server »).

## Ce qui est fourni, ce que tu fais

| Fourni | À faire |
| --- | --- |
| `index.html` (intégré avec Tailwind), `src/input.css` (design tokens, classes d'état) | `src/app.js` : tout le JavaScript |

## Repères du HTML

| Besoin | Où |
| --- | --- |
| Formulaire | `#daret-form` (`novalidate`) |
| Champs et messages d'erreur | `#nom-cercle` / `#nom-cercle-erreur`, `#cotisation` / `#cotisation-erreur`, `#periodicite` / `#periodicite-erreur`, `#date-debut` / `#date-debut-erreur` |
| Participants | `#participants-liste` (`data-min`, `data-max`), `#participants-compteur`, `#participants-erreur`, `#ajouter-participant` |
| Boutons | `#generer` (envoi), `#reinitialiser`, `#tirage-au-sort`, `#ordre-saisie` |
| État vide / résultat | `#etat-vide`, `#contenu-resultat` (caché par défaut avec la classe `hidden`), titre `#titre-resultat` |
| Résumé | `#resume-cagnotte`, `#resume-total-cycle`, `#resume-nb-tours`, `#resume-dates` |
| Calendrier | `#calendrier-corps` (les `<tr>` sont à créer), `#compteur-tours` (`aria-live`) |
| Fenêtre de détail | `#detail-tour` (`<dialog>`), `#detail-titre`, `#detail-date`, `#detail-beneficiaire`, `#detail-montant`, `#detail-contributeurs`, `#detail-fermer` |

Conventions conseillées pour les lignes que tu crées : `data-tour` sur chaque `<tr>`, `data-action="ouvrir-detail"` et `data-action="basculer-statut"` sur les boutons.

Classes d'état prêtes dans `src/input.css` : `champ-invalide`, `ligne-terminee`, `prochain-tour` (à ajouter / retirer avec `classList`).

## Fonctionnalités réalisées

## Fonctionnalités réalisées

Le projet Daret propose les fonctionnalités suivantes :

* **US-01 — Création du cercle et validation du formulaire :** saisie des informations du cercle d’épargne et validation des champs obligatoires.
* **US-02 — Gestion des participants :** ajout et validation des participants, avec respect des limites autorisées.
* **US-03 — Génération du calendrier :** création du calendrier des tours à partir des informations saisies.
* **US-04 — Tirage au sort :** attribution aléatoire de l’ordre des bénéficiaires.
* **US-05 — Ordre de saisie :** possibilité de conserver l’ordre de saisie des participants.
* **US-06 — Suivi d’avancement :** suivi des tours terminés et de leur état.
* **US-07 — Détail d’un tour :** consultation des informations détaillées d’un tour.
* **US-08 — Réinitialisation :** remise à zéro du formulaire et des résultats pour commencer une nouvelle simulation.

**Important :** Daret est un projet pédagogique de simulation. Il ne gère aucun argent réel, aucun paiement et aucun compte financier.


## Jeu d'essai

## Jeu d'essai

Les tests suivants permettent de vérifier la validation du formulaire, la gestion des participants, la génération du calendrier et les principales fonctionnalités de Daret.

| # | Donnée saisie | Résultat attendu | Résultat obtenu | Validé |
|---|---|---|---|---|
| 1 | Nom : `Amis`; cotisation : `500`; périodicité : mensuelle; date future; 3 participants valides | Le formulaire est accepté et le calendrier est généré. | À tester | À vérifier |
| 2 | Nom du cercle vide | Un message d'erreur s'affiche et la génération est bloquée. | À tester | À vérifier |
| 3 | Nom du cercle avec moins de 3 caractères | Une erreur indique que le nom ne respecte pas la longueur minimale. | À tester | À vérifier |
| 4 | Cotisation : `99 MAD` | Une erreur indique que la cotisation est inférieure au minimum autorisé. | À tester | À vérifier |
| 5 | Cotisation : `50000 MAD` | La cotisation est acceptée si les autres champs sont valides. | À tester | À vérifier |
| 6 | Cotisation : `50001 MAD` | Une erreur indique que la cotisation dépasse le maximum autorisé. | À tester | À vérifier |
| 7 | Date de début antérieure à aujourd'hui | Une erreur indique que la date n'est pas valide. | À tester | À vérifier |
| 8 | Deux participants ayant le même prénom, sans tenir compte des majuscules et minuscules | Un message d'erreur signale le doublon. | À tester | À vérifier |
| 9 | Nombre de participants égal au minimum autorisé : 2 | Le nombre de participants est accepté si leurs prénoms sont valides. | À tester | À vérifier |
| 10 | Cliquer sur « Réinitialiser » après avoir généré un calendrier | Le formulaire est remis à zéro, les résultats disparaissent et l'état vide réapparaît. | À tester | À vérifier |

## Difficultés rencontrées

La principale difficulté rencontrée pendant le développement de Daret était la découverte du DOM JavaScript. C'était la première fois que je travaillais avec le DOM, et je ne maîtrisais pas encore toutes ses propriétés et méthodes.

Certaines user stories nécessitaient également l'utilisation de fonctionnalités JavaScript que je ne connaissais pas encore. J'ai donc dû effectuer des recherches avant de commencer certaines tâches afin de comprendre les notions nécessaires et de pouvoir avancer.

Malgré ces recherches, j'ai rencontré plusieurs blocages au cours du développement. Ces difficultés m'ont permis de découvrir de nouvelles fonctionnalités JavaScript, de mieux comprendre le fonctionnement du DOM et de progresser dans la résolution de problèmes.

## Captures d'écran

_À compléter : mobile et desktop._
