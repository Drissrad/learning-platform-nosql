// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Cela permet une meilleure organisation et maintenabilité du code
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: En regroupant les routes par fonctionnalité (exemple : cours, étudiants) et en suivant un schéma RESTful.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.get('/courses/stats', courseController.getCourseStats);

module.exports = router;