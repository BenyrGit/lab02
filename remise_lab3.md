# Remise - Laboratoire 3 : Git, GitHub et travail d'equipe

## Membres de l'equipe

- Yannnick Robert
- Matthew Charrier
- Benjamin Paquette

## Depot GitHub

- Depot : https://github.com/BenyrGit/lab02
- Branche principale : `main`
- Application de depart : convertisseur de temperature Node.js/Express avec frontend React et Material UI
- Tag de depart du laboratoire 2 : `lab2-final`
- Tag final du laboratoire 3 : `lab3-final`

## Contributions

| Membre            | Branche                      | Pull request                             | Commit principal                                                       | Contribution                                                                                                                                                                                                    |
| ----------------- | ---------------------------- | ---------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yannnick Robert   | `feature/yannick`            | https://github.com/BenyrGit/lab02/pull/1 | `Ajouter la persistance et la gestion de l'historique des conversions` | Ajout d'un historique des conversions dans l'interface. Les dernieres conversions sont conservees dans le navigateur avec `localStorage`, affichees dans une section dediee et peuvent etre effacees.           |
| Matthew Charrier  | `feature/exemple-conversion` | https://github.com/BenyrGit/lab02/pull/4 | `feat: add conversion example button`                                  | Ajout d'un bouton d'exemple dans l'interface pour remplir rapidement une conversion de demonstration. Cette amelioration facilite le test rapide de l'application et rend l'experience utilisateur plus claire. |
| Benjamin Paquette | `feature/ajout-rankine`      | https://github.com/BenyrGit/lab02/pull/2 | `Ajouter la conversion vers l'unite Rankine`                           | Ajout de l'unite Rankine dans le backend et le frontend. La conversion prend en charge Rankine, la validation du zero absolu a ete ajustee et l'unite est disponible dans les menus de l'interface.             |

## Tests effectues

### Contribution de Yannnick Robert

- Demarrage de l'application en local.
- Verification que les conversions reussies s'ajoutent a l'historique.
- Verification que l'historique conserve les conversions apres un rechargement de la page.
- Verification du bouton permettant d'effacer l'historique.
- Verification que seules des conversions valides sont affichees dans l'historique.

### Contribution de Matthew Charrier

- Demarrage de l'application en local.
- Verification du bouton d'exemple.
- Verification que le bouton remplit une valeur et des unites utilisables pour une conversion.
- Verification que la conversion d'exemple peut etre envoyee au backend et affiche un resultat.
- Verification que le bouton de reinitialisation et le changement d'unites continuent de fonctionner.

### Contribution de Benjamin Paquette

- Demarrage du backend en local.
- Verification d'une conversion vers Rankine.
- Verification que Rankine est accepte par l'API et par les choix de l'interface.
- Verification de la validation du zero absolu pour eviter les temperatures impossibles.
- Verification que les conversions existantes en Celsius, Fahrenheit et Kelvin continuent de fonctionner.

### Tests apres fusion dans `main`

- Recuperation de la version finale de `main`.
- Verification de la route `GET /api/health`, qui retourne `status: ok`.
- Verification de la route `POST /api/convert` avec la conversion `25 celsius` vers `rankine`, qui retourne `536.67 rankine`.
- Verification d'une erreur de validation avec une temperature sous le zero absolu, qui retourne le statut HTTP `400`.
- Verification que les trois fonctionnalites ajoutees sont presentes ensemble : historique, bouton d'exemple et unite Rankine.

## Revue de code et fusion

Chaque contribution a ete faite dans une branche de fonctionnalite separee, puis fusionnee dans `main` par pull request. Les pull requests ont permis de relire les modifications avant leur integration dans la branche principale.

## Conflits

Aucun conflit majeur n'a ete rencontre pendant les fusions. Les branches ont ete integrees dans `main` par pull request.

## Resume de la version finale

La version finale de l'application permet de convertir des temperatures entre Celsius, Fahrenheit, Kelvin et Rankine. L'interface permet aussi de charger rapidement un exemple de conversion et de conserver un historique local des dernieres conversions effectuees.
