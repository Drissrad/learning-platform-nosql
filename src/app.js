// Question: Comment organiser le point d'entrée de l'application ?
//Reponse : En initialisant les connexions, les middlewares et les routes avant de démarrer le serveur.
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
/*Reponse:La meilleure façon de gérer le démarrage de l'application est de centraliser la configuration, d'initialiser 
les services et bases de données, puis de charger les routes avant de démarrer le serveur */
const express = require('express');
const config = require('./config/env');
const { connectMongo, connectRedis, closeConnections } = require('./config/db');
//const courseRoutes = require('./routes/courseRoutes');

const app = express();


//app.use('/api', courseRoutes);

async function startServer() {
  try {
    await connectMongo();
    await connectRedis();
    app.use(express.json());
    const courseRoutes = require('./routes/courseRoutes'); // Import après la connexion
    app.use('/api', courseRoutes);
    //app.use('/api/students', studentRoutes);
    app.listen(config.port, () => {
      console.log(`Serveur démarré sur le port ${config.port}`);
    });
    
  } catch (err) {
    console.error('Erreur au démarrage du serveur :', err);
    process.exit(1);
  }
}

process.on('SIGTERM', closeConnections);
process.on('SIGINT', closeConnections);

startServer();