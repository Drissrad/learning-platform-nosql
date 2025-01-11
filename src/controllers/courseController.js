// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:Les routes définissent les points d'accès de l'API, tandis que les contrôleurs contiennent la logique métier.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :Pour éviter les duplications et rendre le code plus facile à tester et maintenir

const { ObjectId } = require('mongodb');
const db = require('../config/db').getDb();
const redisService = require('../services/redisService');
const mongoService = require('../services/mongoService');

async function createCourse(req, res) {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Titre et description requis.' });
    }

    const result = await mongoService.insertOne('courses', { title, description });
    res.status(201).json({ message: 'Cours créé avec succès.', courseId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
}

async function getCourse(req, res) {
  try {
    const { id } = req.params;
    const course = await mongoService.findOneById('courses', id);
    if (!course) {
      return res.status(404).json({ error: 'Cours non trouvé.' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
}
async function getCourseStats(req, res) {
  const cacheKey = 'course_stats'; 

  try {
  
    const cachedStats = await redisService.getCachedData(cacheKey);
    if (cachedStats) {
      return res.status(200).json({
        source: 'cache',
        stats: cachedStats,
      });
    }
    const totalCourses = await mongoService.findAll('courses');
    const count = totalCourses.length;

    const stats = { totalCourses: count };

    await redisService.cacheData(cacheKey, stats, 3600); 
    res.status(200).json({
      source: 'database',
      stats,
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des statistiques des cours :', err);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
}

module.exports = { createCourse, getCourse ,getCourseStats};