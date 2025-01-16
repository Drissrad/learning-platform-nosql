# Learning Platform Template
Ce projet est une plateforme d'apprentissage conçue pour gérer des cours, mettant en œuvre une architecture modulaire et utilisant des technologies modernes telles que **Node.js**, **MongoDB**, et **Redis**
## 📦 Structure du projet

src/<br>
├── app.js                   # Point d'entrée principal<br>
├── config/                                             <br>
│   ├── db.js                # Configuration des connexions à MongoDB et Redis <br>
│   ├── env.js               # Gestion des variables d'environnement      <br>
├── controllers/            <br>
│   ├── courseController.js  # Logique métier pour les cours <br>
├── routes/ <br>
│   ├── courseRoutes.js      # Définition des routes pour les cours <br>
├── services/        <br>
│   ├── mongoService.js      # Services pour interagir avec MongoDB <br>
│   ├── redisService.js      # Services pour interagir avec Redis <br>
├── models/                  # (À créer si besoin, pour gérer les modèles de données)<br>
 ## Installation
  `git clone https://github.com/Drissrad/learning-platform-nosql` <br>
  `cd learning-platform-template`                           <br>
 ` npm install`                                              <br>
  Démarrer MongoDB et Redis  <br>
   `mongod` <br>
  `redis-server` <br>
 ##  Lancer le projet
 `npm start` <br>
Une fois démarré, le serveur est accessible sur le port spécifié (par défaut : 3000). <br>
Exemple d'API disponible  <br>
POST /api/courses : Créer un cours <br>
GET /api/courses/:id : Obtenir un cours par son ID <br>
GET /api/courses/stats : Obtenir les statistiques des cours<br>
## Choix techniques
Node.js & Express : Utilisé pour sa simplicité et sa popularité dans la création d'API RESTful. <br>
MongoDB : Base de données NoSQL choisie pour sa flexibilité dans le stockage des documents JSON.-<br>
Redis : Implémenté pour le cache, améliorant les performances lors des requêtes répétitives.<br>
## Réponses aux questions 
1. Pourquoi créer un module séparé pour les connexions aux bases de données ?<br>
Réponse :<br>
Créer un module séparé permet de centraliser la logique de connexion pour MongoDB et Redis. Cela facilite la réutilisation, la maintenance, et garantit une séparation des préoccupations dans le code. <br>
2. Comment gérer proprement la fermeture des connexions ?<br>
Réponse :<br>
Les connexions doivent être fermées proprement pour éviter les fuites de ressources. Dans notre projet, nous utilisons des hooks système comme SIGTERM et SIGINT pour appeler des fonctions de fermeture spécifiques aux bases de données (closeConnections).<br>
3. Pourquoi est-il important de valider les variables d'environnement au démarrage ?<br>
Réponse :<br>
La validation garantit que toutes les configurations nécessaires (comme les URI des bases de données) sont disponibles. Cela évite les erreurs imprévues en production.<br>
4. Que se passe-t-il si une variable requise est manquante ?<br>
Réponse :<br>
Si une variable est manquante, le projet est incapable de fonctionner correctement (ex : absence de connexion aux bases de données). Dans notre projet, une erreur explicite est levée pour alerter immédiatement le développeur.<br>
5. Quelle est la différence entre un contrôleur et une route ?<br>
Réponse :<br>
Une route définit les points d'accès de l'API (endpoints).<br>
Un contrôleur contient la logique métier associée à ces endpoints.<br>
Cela permet de séparer les responsabilités et d'améliorer la maintenabilité.<br>
6. Pourquoi séparer la logique métier des routes ?<br>
Réponse :<br>
Pour éviter les duplications, rendre le code plus lisible et permettre des tests unitaires indépendants sur la logique métier.<br>
7. Pourquoi séparer les routes dans différents fichiers ?<br>
Réponse :<br>
Cela améliore l'organisation du projet en regroupant les routes par fonctionnalités. Par exemple, les routes pour les cours sont dans courseRoutes, et celles pour les étudiants dans studentRoutes.<br>
8. Comment organiser les routes de manière cohérente ?<br>
Réponse :<br>
En suivant une structure RESTful, par exemple :<br>
POST /api/courses pour créer un cours.<br>
GET /api/courses/:id pour récupérer un cours spécifique.<br>
9. Pourquoi créer des services séparés ?<br>
Réponse :<br>
Les services encapsulent la logique d'accès aux bases de données (MongoDB et Redis). Cela permet de réutiliser les mêmes fonctions (findOneById, cacheData, etc.) dans plusieurs contrôleurs.<br>
10. Comment gérer efficacement le cache avec Redis ?<br>
Réponse :<br>
Mettre en cache les données fréquemment utilisées (par ex. les cours récemment consultés).<br>
Utiliser un TTL (Time-To-Live) pour éviter un cache obsolète.<br>
Valider les données avant mise en cache pour éviter les incohérences.<br>
11. Quelles sont les bonnes pratiques pour les clés Redis ?<br>
Réponse :<br>
Utiliser des clés descriptives (ex. course:<courseId>). <br>
Éviter les conflits en utilisant un préfixe spécifique à l'application. <br>
Expirer les clés si elles ne sont plus valides. <br>
12. Comment organiser le point d'entrée de l'application ?<br>
Réponse :<br>
Initialiser les connexions aux bases de données.<br>
Configurer les middlewares.<br>
Charger les routes.<br>
Lancer le serveur en dernier.<br>
13. Quelle est la meilleure façon de gérer le démarrage de l'application ? <br>
Réponse :<br>
En encapsulant la logique de démarrage dans une fonction startServer pour centraliser les étapes et gérer les erreurs.<br>
14. Quelles sont les informations sensibles à ne jamais commiter ?<br>
Réponse :<br>
Les clés API.<br>
Les informations de connexion aux bases de données.<br>
Les variables d'environnement comme MONGODB_URI et REDIS_URI.<br>
15. Pourquoi utiliser des variables d'environnement ? <br>
Réponse :<br>
Pour gérer les configurations spécifiques à chaque environnement (développement, production).<br>
Pour sécuriser les informations sensibles sans les inclure dans le code source.<br>
## Documentation visuelle
Voici un exemple de requête envoyée via Postman pour créer un cours :
![Requête POST /api/courses](images/img1.png)
Voici un exemple de requête Obtenir un cours par son ID :
![Requête GET /api/courses/:id](images/img2.png)
Voici un exemple de requête Obtenir les statistiques des cours :
![Requête GET /api/courses/stats](images/img3.png)
