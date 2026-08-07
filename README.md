# 1. Nom du projet

**Nom du projet :** LogiTrack — Application de gestion logistique

---

# 2. Présentation du projet

Ce projet est une application web de gestion logistique qui permet de gérer les clients, les produits et les commandes d'une entreprise.

Il s'adresse principalement aux responsables logistiques et aux équipes commerciales qui doivent organiser et suivre leurs commandes au quotidien.

Son objectif principal est de centraliser la gestion des clients, des produits et des commandes dans un seul outil, avec un contrôle d'accès selon le rôle de chaque utilisateur.

---

# 3. Problématique

Le problème identifié est que les entreprises gèrent leurs clients, leurs produits et leurs commandes avec des outils épars (tableurs, cahiers, mails), ce qui entraîne des erreurs, des pertes de temps et un manque de visibilité sur l'état des commandes.

La solution proposée permet de regrouper toute la gestion dans une application sécurisée : chaque utilisateur se connecte avec son compte, accède aux fonctionnalités autorisées par son rôle et suit les commandes en temps réel depuis un tableau de bord.

---

# 4. Fonctionnalités principales

- Créer un compte utilisateur et se connecter de manière sécurisée
- Consulter un tableau de bord adapté à son rôle (statistiques, produits en stock faible, commandes récentes)
- Gérer les clients (consulter, ajouter, modifier, supprimer)
- Gérer les produits (consulter, ajouter, modifier, supprimer, suivre le stock)
- Gérer les commandes (consulter, créer, modifier le statut, ajouter des produits)
- Rechercher, filtrer et trier les listes de données (pagination, tri, recherche)

---

# 5. Technologies utilisées

| Technologie | Utilisation dans le projet |
|-------------|----------------------------|
| React | Développement de l'interface utilisateur (pages, formulaires, tableau de bord) |
| Vite | Outil de développement rapide et de compilation du projet |
| React Router DOM | Gestion de la navigation entre les pages et protection des routes |
| Axios | Envoi des requêtes HTTP vers l'API et gestion automatique du token JWT |
| React Hook Form + Yup | Validation des formulaires (connexion, inscription, création de données) |
| JavaScript (ES6+) | Langage de programmation de l'application |
| CSS3 | Mise en forme et style des pages |
| Git / GitHub | Versionnement du code et partage du projet |

> Nous avons utilisé **React** pour développer l'interface utilisateur et **Axios** pour communiquer avec l'API sécurisée avec Spring Security et JWT.

---

# 6. Installation et lancement

## 6.1 Prérequis

Pour utiliser ce projet, vous devez disposer de :

- Node.js (version récente)
- npm (installé avec Node.js)
- Git
- VS Code (ou un autre éditeur)
- L'API LogiTrack lancée sur `http://localhost:8087`

---

## 6.2 Cloner le dépôt

```bash
git clone https://github.com/elfadiliaymen/Logitrack-frontend.git
```

Commande de votre projet :

```bash
git clone https://github.com/elfadiliaymen/Logitrack-frontend.git

---

## 6.3 Ouvrir le dossier

```bash
cd NOM_DU_PROJET
```

Commande de votre projet :

```bash
cd logitrack-frontend
```

---

## 6.4 Installer les dépendances

```bash
npm install
```

---

## 6.5 Variables d'environnement

Créer le fichier `.env`.

Variables de votre projet :

```env
VITE_API_URL=http://localhost:8087/api
```

---

## 6.6 Lancer le projet

```bash
npm run dev
```

---

## 6.7 Ouvrir le projet

Après le lancement :

```
http://localhost:5173
```

### Point de vigilance

- Tester toutes les commandes
- Vérifier les chemins
- Ne jamais publier :
  - mots de passe
  - clés API
  - tokens
  - identifiants

---

# 7. Captures d'écran

## Capture 1

### Titre

```
Page de connexion
```

### Image

```md
![Page de connexion](screenshots/connexion.png)
```

### Explication

Cette capture montre la page de connexion où l'utilisateur entre son nom d'utilisateur et son mot de passe pour accéder à l'application.

---

## Capture 2

### Titre

```
Tableau de bord
```

### Image

```md
![Tableau de bord](screenshots/tableau-de-bord.png)
```

### Explication

Cette capture montre le tableau de bord avec les statistiques principales : nombre de clients, de produits et de commandes, ainsi que les produits en stock faible et les commandes récentes.

---

# 8. Contribution personnelle

Cette rubrique est obligatoire pour les projets de groupe.

Ma contribution principale a porté sur le développement du frontend React de l'application.

J'ai également travaillé sur l'intégration des pages (connexion, inscription, tableau de bord, gestion des clients, produits et commandes).

J'ai été responsable de l'authentification (JWT), de la protection des routes et du contrôle d'accès par rôle.

---

# 9. Difficultés rencontrées

## Difficulté 1

### Problème rencontré

L'utilisateur était déconnecté de manière inattendue et redirigé vers une mauvaise page lorsque l'API répondait avec une erreur 401.

### Recherches / Tests

J'ai testé l'application avec un token expiré et vérifié le comportement de l'intercepteur de réponse d'Axios.

### Solution

J'ai corrigé le gestionnaire d'erreur 401 dans `src/api/api.jsx` pour supprimer la session et rediriger correctement l'utilisateur vers la page d'authentification.

### Ce que j'ai appris

J'ai appris à utiliser les intercepteurs Axios et à gérer les erreurs d'authentification de manière centralisée.

### Texte final

J'ai rencontré le problème suivant : l'utilisateur était mal redirigé quand son token expirait.

Pour comprendre l'origine du problème, j'ai testé l'application avec un token expiré et observé la réponse de l'API.

J'ai résolu le problème en corrigeant la gestion de l'erreur 401 dans l'intercepteur de réponse d'Axios.

Cette difficulté m'a permis d'apprendre comment fonctionnent les intercepteurs Axios et la gestion des erreurs HTTP.

---

## Difficulté 2

### Problème rencontré

Les listes de clients, de produits et de commandes devenaient très longues et lentes à afficher.

### Recherches / Tests

J'ai vérifié les paramètres de pagination renvoyés par l'API et testé le changement de page.

### Solution

J'ai ajouté la pagination côté backend (avec `size: 10` et `totalPages`) ainsi que le tri et la recherche dans les listes.

### Ce que j'ai appris

J'ai appris à utiliser la pagination, le tri et la recherche pour afficher de grandes quantités de données de manière efficace.

---

# 10. Améliorations possibles

Dans une prochaine version, je pourrais :

- améliorer la sécurité (validation plus stricte des entrées) ;
- ajouter des tests automatisés ;
- rendre l'interface responsive pour mobile et tablette ;
- dockeriser l'application (Dockerfile) ;
- améliorer le style CSS de l'interface.

### Conclusion

Ces améliorations permettraient de renforcer la fiabilité et la sécurité de l'application, tout en la rendant plus moderne et plus facile à déployer.


---
